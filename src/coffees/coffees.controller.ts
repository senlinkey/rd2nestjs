import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("coffees")
export class CoffeesController {

  @Get()
  findAll(@Res() response: Response) {
    // return response.status(200).send(`This action returns all coffees`);
    return `This action returns all coffees`;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body;
  }
}
