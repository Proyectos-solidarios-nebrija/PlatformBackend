import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Hilo } from '@hilo/hilo.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Hilo, (hilo) => hilo.categoria, { cascade: true })
  hilos: Hilo[];
}
