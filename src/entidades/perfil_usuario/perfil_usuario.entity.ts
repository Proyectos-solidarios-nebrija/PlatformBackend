import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('perfil_usuario')
export class PerfilUsuario {
  @PrimaryColumn()
  id_usuario: number;

  @OneToOne(() => Usuario, (usuario) => usuario.perfil)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ type: 'json', nullable: true })
  historial_actividades: object;

  @Column({ type: 'json', nullable: true })
  disponibilidad_horaria: object;
}
