import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Localidade } from "./Localidade";
import { Cidade } from "./Cidade";
import { Estado } from "./Estado";

@Entity({ name: 'pais' })
export class Pais extends Localidade {
  @PrimaryColumn()
  codigo!: number;

  @Column()
  nome!: string;

  @Column()
  sigla!: string;

  @OneToMany('Estado', 'pais') // quick fix - https://github.com/typeorm/typeorm/issues/4190
  Estados!: Estado[];

  @OneToMany('Localidade','pais')
  //@JoinColumn({ name: "codigo", referencedColumnName: "codigo" })
  localidade!: Relation<Localidade>;


  @OneToOne('Cidade')
  @JoinColumn()
  capital!: Relation<Cidade>;




  constructor(codigo: number, nome: string, sigla: string) {
    super(codigo, nome);
    this.sigla = sigla;
  }



  getEstados(): Estado[] {
    return this.Estados;
  }

  getCapital(): Cidade {
    return this.capital;
  }

}
