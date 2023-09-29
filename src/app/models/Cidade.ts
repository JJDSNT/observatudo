import { Entity, PrimaryColumn, ManyToOne, OneToOne, Column } from "typeorm";
import type { Relation } from "typeorm";
import { Localidade } from "./Localidade";
import { Estado } from "./Estado";

@Entity()
export class Cidade extends Localidade {

  constructor(codigo: number, nome: string) {
    super(codigo, nome);
  }

  @ManyToOne(() => Estado, estado => estado.cidades)
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

