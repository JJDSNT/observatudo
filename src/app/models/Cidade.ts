import { Entity, PrimaryColumn, ManyToOne, OneToOne, Column, JoinColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Localidade } from "@/app/models/Localidade";
import { Estado } from "@/app/models/Estado";

@Entity({ name: 'cidade' })
export class Cidade extends Localidade {


  constructor(codigo: number, nome: string, capital:boolean) {
    super(codigo, nome);
    this.capital=capital;
  }

  @ManyToOne(() => Estado, estado => estado.cidades , { nullable: false })
  @JoinColumn({ name: 'estadoCodigo' })
  estado!: Relation<Estado>;

  @PrimaryColumn()
  codigo!: number;

  @Column({ nullable: true, type: 'number'})
  capital!: boolean | null;

  
/*//para fazer o cascade no location?
  @OneToOne(() => Localidade, localidade => localidade.cidade)
  localidade!: Relation<Localidade>;
*/

}

