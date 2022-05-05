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

  @Prop({ index: true })
  name: string;

  @Prop(mongoose.SchemaTypes.Mixed)
  payload: Record<string, any>;
}

//可在字段或 Schema 级别定义索引
export const EventSchema = SchemaFactory.createForClass(Event);

// 1, 按 name 升序, -1按 name降序排列
EventSchema.index({ name: 1, type: -1 });
