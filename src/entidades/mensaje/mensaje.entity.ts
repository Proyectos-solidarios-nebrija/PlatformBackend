import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Chat } from '@chat/chat.entity';
import { Usuario } from '@usuario/usuario.entity';

@Entity('mensajes')
export class Mensaje {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Chat, chat => chat.mensajes)
    @JoinColumn({ name: 'id_chat' })
    chat: Chat;

    @ManyToOne(() => Usuario, usuario => usuario.mensajes)
    @JoinColumn({ name: 'id_emisor' })
    emisor: Usuario;

    @Column({ type: 'text' })
    contenido: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_envio: Date;
}
