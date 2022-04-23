import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeesModule } from "./coffees/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { CoffeeRatingModule } from "@/coffee-rating/coffee-rating.module";
import AppConfig from "@/config/app.config";
import { APP_PIPE } from "@nestjs/core";

@Module({
  imports: [
    // TypeOrmModule.forRoot({ // throw error, 不应该有加载顺序的困扰
    TypeOrmModule.forRootAsync({// 添加的异步配置将在应用程序中注册的每个模块被解析后 加载
      useFactory: () => ({
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true, // 自动加载 entity
        synchronize: true // 生产请关闭, 确保我们的 TypeORM 实体在每次运行应用程序时都会与数据库同步
      })
    }),
    ConfigModule.forRoot({
      // envFilePath: ".environment" //string | string[], 可以提供多个.env文件,有重复变量以第一个为准,
      // ignoreEnvFile: true// 线上可能不需要.env, 可以使用 Heroku
      // validationSchema: Joi.object({
      //   DATABASE_HOST: Joi.required(),
      //   DATABASE_PORT: Joi.number().default(5432)
      // })
      load: [AppConfig]
    }),
    CoffeesModule,

    CoffeeRatingModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ValidationPipe
  }]
})

export class AppModule {
}
