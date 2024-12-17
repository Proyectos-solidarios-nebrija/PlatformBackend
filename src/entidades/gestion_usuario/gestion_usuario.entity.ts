import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Usuario } from '@usuario/usuario.entity';

@Entity('gestion_usuarios')
export class GestionUsuario {
  @PrimaryColumn()
  id_admin: number;

  @PrimaryColumn()
  id_usuario: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_admin' })
  admin: Usuario;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ type: 'boolean', default: false })
  permiso_modificacion: boolean;
}
