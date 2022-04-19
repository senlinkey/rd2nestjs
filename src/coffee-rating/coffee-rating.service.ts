import { CoffeesService } from "@/coffees/coffees.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeesService: CoffeesService) {
  }
}
