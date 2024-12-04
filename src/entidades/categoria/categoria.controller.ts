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
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() categoriaData: Partial<Categoria>): Promise<Categoria> {
    try {
      return await this.categoriaService.create(categoriaData);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(
          {
            message: error.message,
            error: 'Conflict',
            statusCode: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw error; // Re-lanza otros errores no relacionados con duplicados
    }
  }

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriaService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<Categoria>,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.categoriaService.remove(id);
  }
}
