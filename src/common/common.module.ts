import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ApiKeyGuard } from "@/common/guards/api-key.guard";
import { ConfigModule } from "@nestjs/config";
import { LoggingMiddleware } from "@/common/middleware/logging.middleware";

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard }, // 全局使用时, 不能使用依赖注入, 改为这种
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
