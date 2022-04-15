import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("coffees")
export class CoffeesController {

  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    // findAll(@Res() response: Response) {
    // return response.status(200).send(`This action returns all coffees`);
    // return `This action returns all coffees`;
    return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
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

  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return `This action removes #${id} coffee`;

  }
}
