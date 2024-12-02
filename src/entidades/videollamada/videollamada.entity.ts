import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('videollamadas')
export class Videollamada {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.videollamadas)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ length: 20 })
  estado: string;
}
