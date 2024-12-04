import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { HiloService } from './hilo.service';
import { Hilo } from './hilo.entity';

@Controller('hilos')
export class HiloController {
  constructor(private readonly hiloService: HiloService) {}

  @Post()
  async create(@Body() hiloData: Partial<Hilo>): Promise<Hilo> {
    return this.hiloService.create(hiloData);
  }

  @Get()
  async findAll(@Query('categoriaId') categoriaId?: number): Promise<Hilo[]> {
    if (categoriaId) {
      return this.hiloService.findByCategoria(categoriaId);
    }
    return this.hiloService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Hilo> {
    return this.hiloService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Hilo>,
  ): Promise<Hilo> {
    return this.hiloService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.hiloService.remove(id);
  }
}
