import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '@usuario/usuario.entity';

@Entity('sesiones')
export class Sesion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.sesiones)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ length: 20 }) // tipo varchar
  tipo_sesion: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ length: 20 }) // tipo varchar
  estado: string;

  @Column({ type: 'text', nullable: true }) // tipo text sin length
  notas: string;
}
