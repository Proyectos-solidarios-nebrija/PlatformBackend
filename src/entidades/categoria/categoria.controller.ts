import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  ConflictException,
  BadRequestException, // Utilizado en errores del cliente, como solicitudes malformadas (HTTP400).
  NotFoundException, // Utilizado en errores de recursos inexistentes.
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() categoriaData: Categoria): Promise<Categoria> {
    try {
      return await this.categoriaService.create(categoriaData);
    } catch (error) {
      // Error por duplicado en la base de datos, este error se produce cuando intentas añadir un valor a una columna ya existente (PostgreSQL).
      if (error.code === '23505') {
        throw new ConflictException(
          `La categoría con el nombre "${categoriaData.nombre}" ya existe.`,
        );
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException(
          'Datos inválidos: por favor revisa los campos enviados.',
        );
      }
      throw new HttpException(
        'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  // Modificacion para manejar errores al hacer un get de un recurso inexistente
  async findOne(@Param('id') id: number): Promise<Categoria> {
    try {
      return await this.categoriaService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `La categoría con ID ${id} no fue encontrada.`,
        );
      }
      throw new HttpException(
        'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<Categoria>,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, updateData);
  }
  // Modificacion para manejar errores al inttentar borrar categorías inexistentes
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.categoriaService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `La categoría con ID ${id} no existe y no puede ser eliminada.`,
        );
      }
      throw new HttpException(
        'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
