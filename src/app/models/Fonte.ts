import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import type { Relation } from "typeorm";
import { Indicador } from "./Indicador";

@Entity({ name: 'fonte' })
@Unique(['nome', 'url'])
export class Fonte {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  url!: string;

  @OneToMany('Indicador', 'fonte')
  indicadores!: Relation<Indicador[]>;
}
