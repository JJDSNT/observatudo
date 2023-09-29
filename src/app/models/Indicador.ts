import { Entity, Column, ManyToOne, ManyToMany, OneToMany, JoinTable, PrimaryColumn, JoinColumn, OneToOne, Unique } from "typeorm";
import type { Relation } from "typeorm";
import { Localidade } from "./Localidade";
import { Eixo } from "./Eixo"
import { Fonte } from "./Fonte"
import { ValorIndicador } from "./ValorIndicador"


@Entity()
@Unique(['codigo_indicador', 'fonte'])
export class Indicador {
  @PrimaryColumn()
  codigo_indicador!: string;


  @ManyToOne('Fonte', 'indicadores')
  fonte!: Relation<Fonte>;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column({ nullable: true, type: 'varchar' })
  dono: string | null;

  @Column({ nullable: true, type: 'varchar' })
  email: string | null;

  @ManyToMany(() => Eixo, eixo => eixo.indicadores)
  @JoinTable({ name: "indicador_eixo" })
  eixos!: Relation<Eixo[]>;

  //@ManyToMany(() => Localidade, localidade => localidade.indicadores)
  //localidades!: Relation<Localidade[]>;

  @OneToMany(() => ValorIndicador, valorIndicador => valorIndicador.indicador)
  valoresIndicador!: Relation<ValorIndicador[]>;

  constructor(
    codigo_indicador: string,
    nome: string,
    descricao: string,
    fonte: Fonte,
    eixos: Eixo[],
    dono?: string,
    email?: string,
  ) {
    this.codigo_indicador = codigo_indicador;
    this.nome = nome;
    this.descricao = descricao;
    this.fonte = fonte;
    this.eixos = eixos;
    this.dono = dono ?? null;
    this.email = email ?? null;
  }

  getCodigoIndicador(): string {
    return this.codigo_indicador;
  }

  setCodigoIndicador(codigo_indicador: string): void {
    this.codigo_indicador = codigo_indicador;
  }

  getFonte(): Fonte {
    return this.fonte;
  }

  setFonte(fonte: Fonte): void {
    this.fonte = fonte;
  }

  getNome(): string {
    return this.nome;
  }

  getDescricao(): string {
    return this.descricao;
  }

  getDono(): string | null {
    return this.dono;
  }

  setDono(dono: string): void {
    this.dono = dono;
  }

  getEmail(): string | null {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }


  getValores(): ValorIndicador[] {
    return this.valoresIndicador;
  }

  getValor(date: Date): number | undefined {
    const valorIndicador = this.valoresIndicador.find(valor => valor.data === date);
    return valorIndicador?.valor;
  }

}



/*
  @Column("jsonb")
  valores!: Map<Date, number>;
 
  getValores2(): Map<Date, number> {
    return this.valores;
  }
 
  getValor2(date: Date): number | undefined {
    return this.valores.get(date);
  }
*/
