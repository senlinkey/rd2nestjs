import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Coffee extends Document { // 默认映射到 coffees 集合复数
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  brand: string;

  @Prop([String])
  flavors: string[];
}



export  const CoffeeSchema = SchemaFactory.createForClass(Coffee)
