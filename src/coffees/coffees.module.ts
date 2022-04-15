import { Module } from "@nestjs/common";
import { CoffeesController } from "@/coffees/coffees.controller";
import { CoffeesService } from "@/coffees/coffees.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coffee } from "@/coffees/entities/coffee.entity";

@Module({
  controllers: [CoffeesController], // 控制器
  imports: [TypeOrmModule.forFeature([Coffee])], // 这个模块需要的其他模块
  exports: [], // 应该列出在任何地方都可用的 提供者(imports)
  providers: [CoffeesService] // 此处任何提供程序都将仅在此模块本身可用, 除非添加到 exports 数组
})
export class CoffeesModule {
}
