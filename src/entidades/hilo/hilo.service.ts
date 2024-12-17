import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hilo } from '@hilo/hilo.entity';
import { CategoriaService } from '@categoria/categoria.service';

@Injectable()
export class HiloService {
  constructor(
    @InjectRepository(Hilo)
    private hiloRepository: Repository<Hilo>,
    private categoriaService: CategoriaService, // Para verificar categorías
  ) {}

  async create(hiloData: Partial<Hilo>): Promise<Hilo> {
    const categoria = await this.categoriaService.findOne(
      hiloData.categoria.id,
    );
    const nuevoHilo = this.hiloRepository.create({ ...hiloData, categoria });
    return this.hiloRepository.save(nuevoHilo);
  }

  async findAll(): Promise<Hilo[]> {
    return this.hiloRepository.find({ relations: ['categoria'] });
  }

  async findByCategoria(categoriaId: number): Promise<Hilo[]> {
    return this.hiloRepository.find({
      where: { categoria: { id: categoriaId } },
      relations: ['categoria'],
    });
  }

  async findOne(id: number): Promise<Hilo> {
    const hilo = await this.hiloRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!hilo) {
      throw new NotFoundException(`Hilo con ID ${id} no encontrado.`);
    }
    return hilo;
  }

  async update(id: number, updateData: Partial<Hilo>): Promise<Hilo> {
    const hilo = await this.findOne(id); // Verifica que existe
    Object.assign(hilo, updateData);
    return this.hiloRepository.save(hilo);
  }

  async remove(id: number): Promise<void> {
    const hilo = await this.findOne(id); // Verifica que existe
    await this.hiloRepository.remove(hilo);
  }
}
