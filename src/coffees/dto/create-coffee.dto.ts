import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCoffeeDto {
  @ApiProperty({ description: "咖啡的名字" })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: "咖啡的牌子" })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: ["猫屎"] })
  @IsString({ each: true })
  readonly flavors: string[];
}
