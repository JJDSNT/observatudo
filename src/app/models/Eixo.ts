import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Unique, PrimaryColumn } from 'typeorm';
import type { Relation } from "typeorm";
import { Indicador } from "./Indicador";

export enum Eixos {
  Saude = 1,
  Educacao = 2,
  AssistenciaSocial = 3,
  Seguranca = 4,
  MeioAmbiente = 5,
  EconomiaFinancas = 6,
  GovernancaAdministracao = 7,
  Personalizado = 8,
}

const nomedosEixos =['Saude','Educacao','AssistenciaSocial','Seguranca','MeioAmbiente','EconomiaFinancas','GovernancaAdministracao','Personalizado']

export enum labeldosEixos {
  Saude = 'Saúde',
  Educacao = 'Educação',
  AssistenciaSocial = 'Assistência social',
  Seguranca = 'Segurança',
  MeioAmbiente = 'Meio ambiente, urbanização e mobilidade',
  EconomiaFinancas = 'Economia & Finanças',
  GovernançaAdministracao = 'Governança & Administração',
  Personalizado = 'Personalizado',
}



export const eixosData = [
  { id: Eixos.Saude, nome: nomedosEixos[0], nomeLegivel:labeldosEixos.Saude, icon: 'FaHeartbeat', cor: 'bg-red-500' },
  { id: Eixos.Educacao, nome: nomedosEixos[1], nomeLegivel:labeldosEixos.Educacao, icon: 'FaUserGraduate', cor: 'bg-blue-500' },
  { id: Eixos.AssistenciaSocial, nome: nomedosEixos[2], nomeLegivel:labeldosEixos.AssistenciaSocial, icon: 'FaHome', cor: 'bg-pink-500' },
  { id: Eixos.Seguranca, nome: nomedosEixos[3], nomeLegivel:labeldosEixos.Seguranca, icon: 'FaShieldAlt', cor: 'bg-yellow-500' },
  { id: Eixos.MeioAmbiente, nome: nomedosEixos[4], nomeLegivel:labeldosEixos.MeioAmbiente, icon: 'FaGlobeAmericas', cor: 'bg-green-500' },
  { id: Eixos.EconomiaFinancas, nome: nomedosEixos[5], nomeLegivel:labeldosEixos.EconomiaFinancas, icon: 'FaMoneyBillWave', cor: 'bg-purple-500' },
  { id: Eixos.GovernancaAdministracao, nome: nomedosEixos[6], nomeLegivel:labeldosEixos.GovernançaAdministracao, icon: 'FaLandmarkDome', cor: 'bg-indigo-500' },
  { id: Eixos.Personalizado, nome: nomedosEixos[7], nomeLegivel:labeldosEixos.Personalizado, icon: 'FaQuestion', cor: 'bg-gray-500' }
]

@Entity({ name: 'eixo' })

@Unique(['nome'])
export class Eixo {
  @PrimaryColumn({ type: 'int', enum: Eixos })
  id!: Eixos;

  @Column({ type: 'varchar', enum: Eixos })
  nome!: Eixos;

  @Column({ type: 'varchar' })
  nomeLegivel!: string;

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
