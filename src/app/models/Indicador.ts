import { Entity, Column, ManyToOne, ManyToMany, OneToMany, JoinTable, PrimaryColumn, JoinColumn, OneToOne, Unique } from "typeorm";
import type { Relation } from "typeorm";
import { Localidade } from "./Localidade";
import { Eixo } from "./Eixo"
import { EixoUsuario } from '@/app/models/EixoUsuario';
import { Fonte } from "./Fonte"
import { ValorIndicador } from "./ValorIndicador"
import { EixoPadrao } from "./EixoPadrao";



@Entity({ name: 'indicador' })
@Unique(['id', 'fonte'])
export class Indicador {
  @PrimaryColumn()
  id!: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ length: 700 })
  descricao: string;

  @ManyToOne('Fonte', 'indicadores')
  fonte!: Relation<Fonte>;

  @Column({ nullable: true, type: 'varchar' })
  dono: string | null;

  @Column({ nullable: true, type: 'varchar' })
  email: string | null;



  @ManyToMany(() => Eixo, eixo => eixo.indicadores)
  //@JoinTable({ name: "indicador_eixo" }) - colocar apenas em um lado do relacionamento
  eixos?: Relation<Eixo[]> | null;


  @ManyToMany(() => EixoPadrao, eixoPadrao => eixoPadrao.indicador)
  //@JoinTable({ name: "indicador_eixo" }) - colocar apenas em um lado do relacionamento
  eixoPadrao?: Relation<EixoPadrao[]> | null;


  @ManyToMany(() => EixoUsuario, eixoUsuario => eixoUsuario.indicadores)
//  @JoinColumn()
  eixosUsuario?: Relation<EixoUsuario[]> | null;


  //@ManyToMany(() => Localidade, localidade => localidade.indicadores)
  //localidades!: Relation<Localidade[]>;

  @OneToMany(() => ValorIndicador, valorIndicador => valorIndicador.indicador)
  valoresIndicador!: Relation<ValorIndicador[]>;

  constructor(
    id: number,
    nome: string,
    descricao: string,
    fonte: Fonte,
    dono?: string,
    email?: string,
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.fonte = fonte;
    this.dono = dono ?? null;
    this.email = email ?? null;
  }

  getCodigoIndicador(): number {
    return this.id;
  }

  setCodigoIndicador(id: number): void {
    this.id = id;
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



