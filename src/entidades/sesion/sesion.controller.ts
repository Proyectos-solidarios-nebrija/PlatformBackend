import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SesionService } from './sesion.service';
import { Sesion } from './sesion.entity';

@Controller('sesiones')
export class SesionController {
    constructor(private readonly sesionService: SesionService) {}

    @Post()
    create(@Body() sesion: Sesion) {
        return this.sesionService.create(sesion);
    }

    @Get()
    findAll() {
        return this.sesionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.sesionService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sesionService.remove(+id);
    }
}
