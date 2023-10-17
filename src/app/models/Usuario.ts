import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
//import { Eixo, EixoUsuario } from './Eixo';
import { EixoUsuario } from '@/app/models/EixoUsuario';
//import { SelecaoIndicador } from './SelecaoIndicador';
//import { EixoUsuario } from './EixoUsuario';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  id_auth_table!: string;

  @Column()
  nome: string;

  @Column({ type: 'varchar', default: 'user' })
  role?: string | null | undefined;

  @Column()
  email: string;

  //problema esta aqui
  @OneToMany(() => EixoUsuario, eixoUsuario => eixoUsuario.usuario)
  @JoinColumn()
  eixos!: EixoUsuario[];

  constructor(nome: string, email: string, id_auth_table: string) {
    this.nome = nome;
    this.email = email;
    this.id_auth_table = id_auth_table;
  }

}
