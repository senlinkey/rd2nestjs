import { Injectable, NotFoundException } from "@nestjs/common";
import { Coffee } from "@/coffees/entities/coffee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { CreateCoffeeDto } from "@/coffees/dto/create-coffee.dto";
import { UpdateCoffeeDto } from "@/coffees/dto/update-coffee.dto";
import { Flavor } from "@/coffees/entities/flavor.entity";
import { PaginationQueryDto } from "@/common/dto/pagination-query.dto";
import { Event } from "@/events/entities/event.entity";
import { ConfigService } from "@nestjs/config";

// @Injectable({ scope: Scope.TRANSIENT }) // Scope.DEFAULT 默认单例,
//transient: 瞬态提供者不会在消费者之间共享,注入瞬态提供者的每个消费者都将收到
// request-scoped: 为每个 incoming request 提供一个新的提供者实例, 请求处理完成后自动对实例进行垃圾回收
@Injectable() // Scope.DEFAULT 默认单例,
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor) private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    // @Inject(COFFEE_BRANDS) coffeeBrands: string[] // 令牌用于查找依赖
    private readonly configService: ConfigService
  ) {
    console.log(this.configService.get<string>("DATABASE_HOST","default_localhost"));
    // console.log(coffeeBrands);
    // console.log("CoffeesService instantiated");
  }


  finAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;

    return this.coffeeRepository.find({
      relations: ["flavors"],
      skip: offset,
      take: limit
    });
  }

  async findOne(id: string) {
    // throw "a random error";
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ["flavors"]
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)));
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = updateCoffeeDto.flavors && await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)));

    //preload: 会先在库中到ID 对应的数据, 再将传入的数据进行合并返回新的实体
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();

    try {
      coffee.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = "recommend_coffee";
      recommendEvent.type = "coffee";
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.commitTransaction();
    } catch (err) {
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ name });
    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
