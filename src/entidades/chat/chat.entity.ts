import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Mensaje } from '../mensaje/mensaje.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.chatsEnviados)
  @JoinColumn({ name: 'id_usuario_emisor' })
  emisor: Usuario;

  @ManyToOne(() => Usuario, usuario => usuario.chatsRecibidos)
  @JoinColumn({ name: 'id_usuario_receptor' })
  receptor: Usuario;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_inicio: Date;

  @OneToMany(() => Mensaje, mensaje => mensaje.chat) // Relación bidireccional
  mensajes: Mensaje[];
}
