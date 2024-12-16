import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('notificaciones')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.notificaciones)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ length: 50 }) // tipo varchar
  tipo_notificacion: 'QUESTION_ANSWERED' | 'QUESTION_DELETED'; // annadir nuevas opciones de tipo notificacion aqui

  @Column({ type: 'text' }) // tipo text sin length
  contenido: string;

  @Column({ type: 'boolean', default: false })
  leida: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_envio: Date;
}
