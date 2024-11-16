import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { Notificacion } from './notificacion.entity';

@Controller('notificaciones')
export class NotificacionController {
    constructor(private readonly notificacionService: NotificacionService) {}

    @Post()
    create(@Body() notificacion: Notificacion) {
        return this.notificacionService.create(notificacion);
    }

    @Get()
    findAll() {
        return this.notificacionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.notificacionService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.notificacionService.remove(id);
    }
}
