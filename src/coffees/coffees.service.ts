import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Coffee } from "@/coffees/entities/coffee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCoffeeDto } from "@/coffees/dto/create-coffee.dto";
import { UpdateCoffeeDto } from "@/coffees/dto/update-coffee.dto";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>
  ) {
  }


  finAll() {
    return this.coffeeRepository.find({
      relations: ["flavors"]
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
    const coffee = await this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    //preload: 会先在库中到ID 对应的数据, 再将传入的数据进行合并返回新的实体
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto
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
}
