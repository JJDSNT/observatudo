import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Unique } from 'typeorm';
import type { Relation } from "typeorm";
import { Indicador } from "./Indicador";

export enum Eixos {
  Saude = 'Saúde',
  Educacao = 'Educação',
  AssistenciaSocial = 'Assistência social',
  Seguranca = 'Segurança',
  MeioAmbiente = 'Meio ambiente, urbanização e mobilidade',
  EconomiaFinancas = 'Economia & Finanças',
  Personalizado = 'Personalizado',
}

@Entity({ name: 'eixo' })
@Unique(['nome'])
export class Eixo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', enum: Eixos })
  nome!: Eixos;

  @Column()
  icon!: string;

  @Column()
  cor!: string;

  @ManyToMany('Indicador', 'eixos')
  @JoinTable({ name: "indicador_eixo" })
  indicadores!: Relation<Indicador[]>;
  
  getIndicadores(): Indicador[] {
    return this.indicadores;
  }

}
