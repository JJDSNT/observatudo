//https://stackoverflow.com/questions/60140903/cannot-read-property-tablepath-of-undefined-type-orm

import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Unique, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import type { Relation } from "typeorm";
import { Indicador } from "./Indicador";
import { EixoPadrao } from './EixoPadrao';
import { EixoUsuario } from './EixoUsuario';


export enum Eixos {
  Saude = 1,
  Educacao = 2,
  AssistenciaSocial = 3,
  Seguranca = 4,
  MeioAmbiente = 5,
  Economia = 6,
  Governanca = 7,
  Personalizado = 8,
}

const nomedosEixos = ['Saude', 'Educacao', 'AssistenciaSocial', 'Seguranca', 'MeioAmbiente', 'Economia', 'Governanca', 'Personalizado']

export enum labeldosEixos {
  Saude = 'Saúde',
  Educacao = 'Educação',
  AssistenciaSocial = 'Assistência social',
  Seguranca = 'Segurança',
  MeioAmbiente = 'Meio ambiente, urbanização e mobilidade',
  Economia = 'Economia & Finanças',
  Governança = 'Governança & Administração',
  Personalizado = 'Personalizado',
}



export const eixosData = [
  { id: Eixos.Saude, nome: nomedosEixos[0], nomeLegivel: labeldosEixos.Saude, icon: 'FaHeartbeat', cor: 'bg-red-500' },
  { id: Eixos.Educacao, nome: nomedosEixos[1], nomeLegivel: labeldosEixos.Educacao, icon: 'FaUserGraduate', cor: 'bg-blue-500' },
  { id: Eixos.AssistenciaSocial, nome: nomedosEixos[2], nomeLegivel: labeldosEixos.AssistenciaSocial, icon: 'FaHome', cor: 'bg-pink-500' },
  { id: Eixos.Seguranca, nome: nomedosEixos[3], nomeLegivel: labeldosEixos.Seguranca, icon: 'FaShieldAlt', cor: 'bg-yellow-500' },
  { id: Eixos.MeioAmbiente, nome: nomedosEixos[4], nomeLegivel: labeldosEixos.MeioAmbiente, icon: 'FaGlobeAmericas', cor: 'bg-green-500' },
  { id: Eixos.Economia, nome: nomedosEixos[5], nomeLegivel: labeldosEixos.Economia, icon: 'FaMoneyBillWave', cor: 'bg-purple-500' },
  { id: Eixos.Governanca, nome: nomedosEixos[6], nomeLegivel: labeldosEixos.Governança, icon: 'FaLandmark', cor: 'bg-indigo-500' },
  { id: Eixos.Personalizado, nome: nomedosEixos[7], nomeLegivel: labeldosEixos.Personalizado, icon: 'FaQuestion', cor: 'bg-gray-500' }
]

@Entity({ name: 'eixo' })

export class Eixo {
  @PrimaryColumn({ type: 'int', enum: Eixos })
  id!: number;

  @Column({ type: 'varchar' })
  nome!: String;

  @Column({ type: 'varchar' })
  nomeLegivel!: string;

  @Column()
  icon!: string;

  @Column()
  cor!: string;

//depois comentar
  @ManyToMany('Indicador', 'eixos')
  @JoinTable({ name: "indicador_eixo" })
  indicadores!: Relation<Indicador[] | undefined>;

  
  @OneToMany(() => EixoPadrao, eixoPadrao => eixoPadrao.eixo)
  eixosPadrao!: Relation<EixoPadrao[]>;

  @OneToMany(() => EixoUsuario, eixoUsuario => eixoUsuario.eixo)
  eixosUsuario!: Relation<EixoUsuario[]>;

  @ManyToMany('Indicador', 'eixosPadrao')
  @JoinTable({ name: "indicador_eixopadrao" })
  indicadoresPadrao!: Relation<Indicador[]>;

  @ManyToMany(() => Indicador, indicador => indicador.eixosUsuario)
  @JoinTable({ name: "indicador_eixousuario" })
  indicadoresUsuario!: Indicador[];

  getIndicadores(): Indicador[] {
    // Lógica para retornar todos os indicadores do eixo
    return [...this.indicadoresPadrao];
    //return [...this.indicadoresPadrao, ...this.indicadoresUsuario];
  }

/*
  getIndicadoresOld(): Indicador[] {
    const indicadoresEixoPadrao = this.getIndicadoresEixoPadraoOld();
    const indicadoresEixoUsuario = this.getIndicadoresEixoUsuarioOld();
    return [...indicadoresEixoPadrao, ...indicadoresEixoUsuario];
  }

  getIndicadoresEixoPadraoOld(): Indicador[] {
    // Lógica para acessar os indicadores do EixoPadrao e classificá-los
    // Substitua o exemplo abaixo com a lógica específica do seu sistema
    if (this.eixosPadrao) {
      return this.eixosPadrao.reduce((indicadores: Indicador[], eixoPadrao: EixoPadrao) => {
        if (eixoPadrao.indicadores) {
          indicadores.push(...eixoPadrao.indicadores);
        }
        return indicadores;
      }, []).sort((a, b) => a.nome.localeCompare(b.nome));
    }
    return [];
  }

  // Método para retornar os indicadores do EixoUsuario classificados
  getIndicadoresEixoUsuarioOld(): Indicador[] {
    // Lógica para acessar os indicadores do EixoUsuario e classificá-los
    // Substitua o exemplo abaixo com a lógica específica do seu sistema
    if (this.eixosUsuario) {
      return this.eixosUsuario.reduce((indicadores: Indicador[], eixoUsuario: EixoUsuario) => {
        if (eixoUsuario.indicadores) {
          indicadores.push(...eixoUsuario.indicadores);
        }
        return indicadores;
      }, []).sort((a, b) => a.nome.localeCompare(b.nome));
    }
    return [];
  }
*/

}

