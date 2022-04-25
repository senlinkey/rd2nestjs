import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ApiKeyGuard } from "@/common/guards/api-key.guard";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports:[ConfigModule],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard } // 全局使用时, 不能使用依赖注入, 改为这种
  ]
})
export class CommonModule {
}
