import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Indicador } from "./Indicador";

@Entity()
export class Fonte {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  url!: string;

  @OneToMany('Indicador', 'fonte')
  indicadores!: Indicador[];
}
