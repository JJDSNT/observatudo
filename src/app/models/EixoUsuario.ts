import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import type { Relation } from 'typeorm';
import { Usuario } from './Usuario';
import { Eixo } from './Eixo';
import { Indicador } from './Indicador';

@Entity({ name: 'eixo_usuario' })
export class EixoUsuario {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, usuario => usuario.eixos)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Relation<Usuario>;

  @ManyToOne(() => Eixo, eixo => eixo.eixosUsuario)
  @JoinColumn({ name: 'eixo_id' })
  eixos!: Relation<Eixo>;

  @ManyToMany(() => Indicador, indicador => indicador.eixosUsuario)
  @JoinTable({ 
    name: 'eixo_usuario_indicador', 
    joinColumn: { name: 'eixo_usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'indicador_id', referencedColumnName: 'id' }
  })
  indicadores!: Relation<Indicador[]>;

  getIndicadores(): Indicador[] | undefined {
    return this.indicadores;
  }

}
