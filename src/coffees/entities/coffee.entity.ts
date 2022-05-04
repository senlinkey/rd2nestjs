import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Flavor } from "@/coffees/entities/flavor.entity";

@Entity() // 代表一张表, 默认根据小写类命名 SQL 表, 可以传参指定
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany(
    (type) => Flavor,
    (flavor) => flavor.coffees,
    { cascade: true }, // 开启级联, 也可以设置为仅插入或更新,['insert', 'update']
  )
  flavors: Flavor[];
}
