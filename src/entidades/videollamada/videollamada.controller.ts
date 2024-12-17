import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { VideollamadaService } from '@videollamada/videollamada.service';
import { Videollamada } from '@videollamada/videollamada.entity';

@Controller('videollamadas')
export class VideollamadaController {
    constructor(private readonly videollamadaService: VideollamadaService) {}

    @Post()
    create(@Body() videollamada: Videollamada): Promise<Videollamada> {
        return this.videollamadaService.create(videollamada);
    }

    @Get()
    findAll(): Promise<Videollamada[]> {
        return this.videollamadaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Videollamada> {
        return this.videollamadaService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.videollamadaService.remove(id);
    }
}
