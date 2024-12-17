import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '@usuario/usuario.entity';

@Entity('interacciones_ar')
export class InteraccionAR {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.interaccionesAR)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ length: 50 }) // tipo varchar
  tipo_gesto: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_interaccion: Date;

  @Column({ type: 'json', nullable: true })
  feedback_visual: object;
}
