import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //开启全局校验的 pipe, 配合 class-validator class-transformer
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 将可接受的属性列入白名单, 任何未包含在白名单中的属性自动从生成的对象中剥离
    forbidNonWhitelisted: true, // 如果存在非白名单的属性, 立即抛错
    transform: true, // 将有效载荷转换为 dto 实例
  }));
  await app.listen(3000);
}

bootstrap();
