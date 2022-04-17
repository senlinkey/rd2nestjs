import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number) // 自动将 string => number, 手动转换, 还可以在 ValidationPipe 中添加 transformOptions 对象, 自动转换
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number)
  offset: number;
}
