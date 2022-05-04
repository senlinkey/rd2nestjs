import { Controller, Get } from "@nestjs/common";

@Controller("coffee")
export class CoffeesController {
  @Get()
  async findAll() {
    return { message: "ok" };
  }
}
