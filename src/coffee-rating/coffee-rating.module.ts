import { CoffeesModule } from "@/coffees/coffees.module";
import { Module } from "@nestjs/common";
import { CoffeeRatingService } from "./coffee-rating.service";

@Module({
  providers: [CoffeeRatingService],
  imports: [CoffeesModule]
})
export class CoffeeRatingModule {
}
