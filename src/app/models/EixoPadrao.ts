import { Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import type { Relation } from 'typeorm';
import { Eixo } from './Eixo';
import { Indicador } from './Indicador';

@Entity({ name: 'eixo_padrao' })
export class EixoPadrao {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Eixo, eixo => eixo.eixoPadrao)
  eixo!: Relation<Eixo>;

  @ManyToMany(() => Indicador, indicador => indicador.eixoPadrao)
  @JoinTable({
    name: 'eixo_padrao_indicador',
    joinColumn: { name: 'eixo_padrao_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'indicador_id', referencedColumnName: 'id' }
  })
  indicador!: Relation<Indicador[]>;

  getIndicadores(): Indicador[] | undefined {
    return this.indicador;
  }
}
