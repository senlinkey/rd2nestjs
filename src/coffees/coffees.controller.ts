import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { Request } from "express";
import { CoffeesService } from "@/coffees/coffees.service";
import { CreateCoffeeDto } from "@/coffees/dto/create-coffee.dto";
import { UpdateCoffeeDto } from "@/coffees/dto/update-coffee.dto";
import { PaginationQueryDto } from "@/common/dto/pagination-query.dto";
import { REQUEST } from "@nestjs/core";
import { Public } from "@/common/decorators/public.decorator";
import { ParseIntPipe } from "@/common/pipes/parse-int.pipe";
import { Protocol } from "@/common/decorators/protocol.decorator";
import { ApiForbiddenResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("coffee")
@Controller("coffees")
export class CoffeesController {
  constructor(
    private readonly coffeeService: CoffeesService,
    //  REQUEST 范围提供程序一项额外的功能, 请求范围的提供者可以注入 original Request 对象, 访问特定信息很有用, headers, cookie, ip ...
    @Inject(REQUEST) private readonly request: Request,
  ) {
    console.log("CoffeesController created");
  }

  // @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @Public()
  // @SetMetadata("isPublic", true)
  @Get()
  async findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @Protocol("https") protocol: string,
  ) {
    // const { limit, offset } = paginationQuery;
    // findAll(@Res() response: Response) {
    // return response.status(200).send(`This action returns all coffees`);
    // return `This action returns all coffees`;
    // return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
    console.log("protocol", protocol);
    // await new Promise(resolve => setTimeout(resolve, 5e3));

    return this.coffeeService.finAll(paginationQueryDto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    console.log(typeof id);
    // return `This action returns #${id} coffee`;
    return this.coffeeService.findOne("" + id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
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
