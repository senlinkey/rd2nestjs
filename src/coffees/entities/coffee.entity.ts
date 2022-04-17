import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "@/coffees/entities/flavor.entity";

@Entity() // 代表一张表, 默认根据小写类命名 SQL 表, 可以传参指定
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(
    type => Flavor,
    (flavor) => flavor.coffees
  )
  flavors: string[];
}
