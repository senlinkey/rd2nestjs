import { Injectable, NotFoundException } from "@nestjs/common";
import { Coffee } from "@/coffees2/entities/coffee.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCoffeeDto } from "@/coffees2/dto/create-coffee.dto";
import { UpdateCoffeeDto } from "@/coffees2/dto/update-coffee.dto";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>
  ) {
  }

  findAll() {
    return this.coffeeModel.find().exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id }).exec();

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);

    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);

    return coffee.remove();
  }
}
