import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CoffeeEntity } from "@/coffees/entities/coffee.entity";

@Injectable()
export class CoffeesService {
  private coffees: CoffeeEntity[] = [{
    id: 1,
    name: "Shipwreck Roast",
    brand: "Buddy Brew",
    flavors: ["chocolate", "vanilla"]
  }];


  finAll() {
    return this.coffees;
  }

  findOne(id: string) {
    // throw "a random error";
    const coffee = this.coffees.find(item => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
