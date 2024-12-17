import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from '@categoria/categoria.entity';

@Entity()
export class Hilo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  contenido: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.hilos, {
    nullable: false,
  })
  categoria: Categoria;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;
}
