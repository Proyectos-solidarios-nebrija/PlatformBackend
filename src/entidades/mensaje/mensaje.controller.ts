import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { Mensaje } from './mensaje.entity';

@Controller('mensajes')
export class MensajeController {
    constructor(private readonly mensajeService: MensajeService) {}

    @Post()
    create(@Body() mensaje: Mensaje): Promise<Mensaje> {
        return this.mensajeService.create(mensaje);
    }

    @Get()
    findAll(): Promise<Mensaje[]> {
        return this.mensajeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Mensaje> {
        return this.mensajeService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.mensajeService.remove(id);
    }
}
