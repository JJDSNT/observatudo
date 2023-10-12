import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, Unique, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Localidade } from "./Localidade";
import { Indicador } from "./Indicador";

@Entity({ name: 'valor_indicador' })
@Unique(['localidade', 'indicador','data'])
export class ValorIndicador {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Indicador, indicador => indicador.valoresIndicador)
  @JoinColumn({ name: 'indicadorId' })
  indicador!: Relation<Indicador>;
  
  @ManyToOne(() => Localidade, localidade => localidade.valoresIndicador)
  @JoinColumn({ name: 'codigoLocalidade' })
  localidade!: Relation<Localidade>;
  
  @Column({ type: "date" })
  data!: Date;

  @Column({ type: "float" })
  valor!: number;

  getValor(): number {
    return this.valor;
  }

  getLocalidade(): Localidade {
    return this.localidade;
  }

  getIndicador(): Indicador {
    return this.indicador;
  }
  
}
