import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { PreguntaService } from '@pregunta/pregunta.service';
import { Pregunta } from '@pregunta/pregunta.entity';

@Controller('preguntas')
export class PreguntaController {
    constructor(private readonly preguntaService: PreguntaService) {}

    @Post()
    create(@Body() pregunta: Pregunta): Promise<Pregunta> {
        return this.preguntaService.create(pregunta);
    }

    @Get()
    findAll(): Promise<Pregunta[]> {
        return this.preguntaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Pregunta> {
        return this.preguntaService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.preguntaService.remove(id);
    }
}
