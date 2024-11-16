import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { Respuesta } from './respuesta.entity';

@Controller('respuestas')
export class RespuestaController {
    constructor(private readonly respuestaService: RespuestaService) {}

    @Post()
    create(@Body() respuesta: Respuesta): Promise<Respuesta> {
        return this.respuestaService.create(respuesta);
    }

    @Get()
    findAll(): Promise<Respuesta[]> {
        return this.respuestaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Respuesta> {
        return this.respuestaService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.respuestaService.remove(id);
    }
}
