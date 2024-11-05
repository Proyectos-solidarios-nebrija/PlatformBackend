import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gestos')
export class Gesto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 }) // tipo varchar
  nombre_gesto: string;

  @Column({ type: 'text' }) // tipo text sin length
  descripcion: string;

  @Column({ nullable: true })
  ejemplo_imagen_url: string;

  @Column({ length: 100 }) // tipo varchar
  traduccion_texto: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
}
