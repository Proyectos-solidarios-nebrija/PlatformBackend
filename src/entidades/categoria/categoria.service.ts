import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return categoria;
  }

  async create(categoriaData: Partial<Categoria>): Promise<Categoria> {
    try {
      const nuevaCategoria = this.categoriaRepository.create(categoriaData);
      return await this.categoriaRepository.save(nuevaCategoria);
    } catch (error) {
      if (error.code === '23505') {
        // Código de error de duplicación en Postgres
        throw new ConflictException(
          `La categoría con el nombre "${categoriaData.nombre}" ya existe.`,
        );
      }
      throw error; // Lanza otros errores no relacionados con duplicados
    }
  }

  async update(id: number, data: Partial<Categoria>): Promise<Categoria> {
    const categoria = await this.findOne(id);
    Object.assign(categoria, data);
    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    await this.categoriaRepository.remove(categoria);
  }
}
