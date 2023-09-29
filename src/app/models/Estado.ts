import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Localidade } from "./Localidade";
import { Cidade } from "./Cidade";

@Entity()
export class Estado extends Localidade {
  @PrimaryColumn()
  codigo!: number;

  @Column()
  nome!: string;

  @Column()
  sigla!: string;

  @OneToMany(() => Cidade, cidade => cidade.estado) // quick fix - https://github.com/typeorm/typeorm/issues/4190
  cidades!: Relation<Cidade[]>;

  @OneToOne('Cidade')
  @JoinColumn()
  capital!: Relation<Cidade>;


  @OneToOne('Localidade','estado')
  //@JoinColumn({ name: "codigo", referencedColumnName: "codigo" })
  localidade!: Relation<Localidade>;


  constructor(codigo: number, nome: string, sigla: string) {
    super(codigo, nome);
    this.sigla = sigla;
  }

  adicionarCidade(cidade: Cidade): void {
    this.cidades.push(cidade);
  }

  adicionarCapital(cidade: Cidade): void {
    this.capital = cidade;
  }

  getCidades(): Cidade[] {
    return this.cidades;
  }

  getCapital(): Cidade {
    return this.capital;
  }

}
