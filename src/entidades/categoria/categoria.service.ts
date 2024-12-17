import {
  ConflictException,
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '@categoria/categoria.entity';

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
        throw new ConflictException(
          `La categoría con el nombre "${categoriaData.nombre}" ya existe.`,
        );
      }
      // Validación adicional al tener un Error
      throw new HttpException(
        'Error al crear la categoría',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // Verifica la existencia del recurso antes de actualizar
  async update(id: number, data: Partial<Categoria>): Promise<Categoria> {
    const categoria = await this.findOne(id); // Lanza NotFoundException si no existe
    Object.assign(categoria, data);
    try {
      return await this.categoriaRepository.save(categoria);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `No se puede actualizar. La categoría con el nombre "${data.nombre}" ya existe.`,
        );
      }
      throw new HttpException(
        'Error al actualizar la categoría',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // Elimina la categoría únicamente si existe
  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id); // Lanza NotFoundException si no existe
    try {
      await this.categoriaRepository.remove(categoria);
    } catch (error) {
      // Error si no existe
      throw new HttpException(
        'Error al eliminar la categoría',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
