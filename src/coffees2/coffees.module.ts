import { Module } from "@nestjs/common";
import { CoffeesService } from "@/coffees2/coffees.service";
import { CoffeesController } from "@/coffees2/coffees.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Coffee, CoffeeSchema } from "@/coffees2/entities/coffee.entity";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Coffee.name, schema: CoffeeSchema }
  ])],
  controllers: [CoffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule {
}
