// import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
//
// @Index(["type", "name"]) // 传递列名数组
// @Entity()
// export class Event {
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   @Column()
//   type: string;
//
//   // @Index()// 索引, 可以为多个列添加
//   @Column()
//   name: string;
//
//   @Column("json")
//   payload: Record<string, any>;
// }
//
// // 索引是我们的数据库搜索引擎可以用来加速数据库检索的特殊查找表, 索引可以帮助我们的应用程序快速随查找和有效访问

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema()
export class Event extends mongoose.Document {
  @Prop()
  type: string;

  @Prop()
  name: string;

  @Prop(mongoose.SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
