import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { CoffeesService } from "@/coffees/coffees.service";
import { CreateCoffeeDto } from "@/coffees/dto/create-coffee.dto";
import { UpdateCoffeeDto } from "@/coffees/dto/update-coffee.dto";

@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {
  }

  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    // findAll(@Res() response: Response) {
    // return response.status(200).send(`This action returns all coffees`);
    // return `This action returns all coffees`;
    // return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
    return this.coffeeService.finAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    // return `This action returns #${id} coffee`;
    return this.coffeeService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // return body;

    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    // return `This action updates #${id} coffee`;
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    // return `This action removes #${id} coffee`;
    return this.coffeeService.remove(id);
  }

}
