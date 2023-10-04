import "reflect-metadata"
import { Entity, Column, ManyToMany, JoinColumn, PrimaryColumn, OneToOne, OneToMany } from "typeorm";
import type { Relation } from "typeorm";
import { Indicador } from "@/app/models/Indicador"
import { ValorIndicador } from "@/app/models/ValorIndicador";


@Entity({ name: 'localidade' })
export class Localidade {
  @PrimaryColumn()
  codigo!: number; // Código IBGE como chave primária

  @Column()
  nome!: string;

  //@ManyToMany(() => Indicador, indicador => indicador.localidades)
  //indicadores!: Indicador[];
  
  
  @OneToMany(() => ValorIndicador, valorIndicador => valorIndicador.localidade)
  valoresIndicador!: ValorIndicador[];

  /*
    @OneToOne('Estado', { cascade: true })
    @JoinColumn({ name: "codigo", referencedColumnName: "codigo" })
    estado?: Relation<Estado>;
  
    @OneToOne('Cidade', { cascade: true })
    @JoinColumn({ name: "codigo", referencedColumnName: "codigo" })
    cidade?: Relation<Cidade>;
  */
  constructor(codigo: number, nome: string) {
    this.codigo = codigo;
    this.nome = nome;
  }
}
