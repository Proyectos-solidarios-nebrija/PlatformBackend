import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InteraccionARService } from './interaccion_ar.service';
import { InteraccionAR } from './interaccion_ar.entity';

@Controller('interacciones_ar')
export class InteraccionARController {
    constructor(private readonly interaccionARService: InteraccionARService) {}

    @Post()
    create(@Body() interaccion: InteraccionAR): Promise<InteraccionAR> {
        return this.interaccionARService.create(interaccion);
    }

    @Get()
    findAll(): Promise<InteraccionAR[]> {
        return this.interaccionARService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<InteraccionAR> {
        return this.interaccionARService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.interaccionARService.remove(+id);
    }
}
