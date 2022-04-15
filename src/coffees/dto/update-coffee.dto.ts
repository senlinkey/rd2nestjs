import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeDto } from "@/coffees/dto/create-coffee.dto";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {
}
