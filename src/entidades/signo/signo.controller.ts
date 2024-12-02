import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SignoService } from './signo.service';
import { Signo } from './signo.entity';

@Controller('signos')
export class SignoController {
    constructor(private readonly signoService: SignoService) {}

    @Post()
    create(@Body() signo: Signo): Promise<Signo> {
        return this.signoService.create(signo);
    }

    @Get()
    findAll(): Promise<Signo[]> {
        return this.signoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Signo> {
        return this.signoService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.signoService.remove(id);
    }
}
