import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CoffeesService } from "@/coffees2/coffees.service";
import { CreateCoffeeDto } from "@/coffees2/dto/create-coffee.dto";
import { UpdateCoffeeDto } from "@/coffees2/dto/update-coffee.dto";
import { PaginationQueryDto } from "@/common/dto/pagination-query.dto";

@Controller("coffees")
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService
  ) {
  }

  @Get()
  async findAll(@Query() paginationQuery:PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.coffeesService.remove(id);
  }


}
