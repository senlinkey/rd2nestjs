import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeesModule } from "./coffees/coffees.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CoffeesModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123456",
      database: "postgres",
      autoLoadEntities: true, // 自动加载 entity
      synchronize: true // 生产请关闭, 确保我们的 TypeORM 实体在每次运行应用程序时都会与数据库同步
    }),
    DatabaseModule],

  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
