import { Injectable, Module } from "@nestjs/common";
import { CoffeesController } from "@/coffees/coffees.controller";
import { CoffeesService } from "@/coffees/coffees.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coffee } from "@/coffees/entities/coffee.entity";
import { Flavor } from "@/coffees/entities/flavor.entity";
import { Event } from "@/events/entities/event.entity";
import { COFFEE_BRANDS } from "@/entities/coffees.constants";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [CoffeesController], // 控制器
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule], // 这个模块需要的其他模块
  exports: [CoffeesService], // 应该列出在任何地方都可用的 提供者(imports), // 别的模块导入了本模块, 想要使用本模块的东西, 必须导出
  providers: [
    CoffeesService,
    // {
    //   provide: CoffeesService,
    //   useClass: CoffeesService, // CoffeesService 等价
    // },
    // {
    //   provide: CoffeesService,
    //   useValue: new CoffeesService(), // useValue,
    // },
    // {
    //   provide: COFFEE_BRANDS,
    //   useValue: ["buddy brew", "nescafe"] // useValue,
    // },
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // }, // useClass, 允许我们动态确定一个 token 应该解析到的 class

    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // },
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ["buddy brew", "nescafe"]
    } // useFactory, 允许我们动态创建提供者, 如果需要将提供者的值基于各种其他依赖性, 值等. 工厂函数的"值"*返回*将被使用 由提供者令牌.

    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: async (connection: Connection): Promise<string[]> => {
    //     //   const coffeeBrands = await connection.query(`SELECT * ...`)
    //
    //     const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
    //     return coffeeBrands;
    //   },
    // }, // 我们不再担心竞争条件和许多其他常见的应用程序启动
  ] // 此处任何提供程序都将仅在此模块本身可用, 除非添加到 exports 数组
})
export class CoffeesModule {
}

// 无法注入不直接属于当前模块的提供者
// 也无法注入不是从导入的模块导出的提供程序

// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    // do something

    return ["buddy brew", "nescafe"];
  }
}

