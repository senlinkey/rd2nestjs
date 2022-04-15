import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity() // 代表一张表, 默认根据小写类命名 SQL 表, 可以传参指定
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column("json", { nullable: true })
  flavors: string[];
}
