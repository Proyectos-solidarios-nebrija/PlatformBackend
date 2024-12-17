import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PerfilUsuarioService } from '@perfil_usuario/perfil_usuario.service';
import { PerfilUsuario } from '@perfil_usuario/perfil_usuario.entity';

@Controller('perfil_usuario')
export class PerfilUsuarioController {
    constructor(private readonly perfilUsuarioService: PerfilUsuarioService) {}

    @Post()
    create(@Body() perfilUsuario: PerfilUsuario) {
        return this.perfilUsuarioService.create(perfilUsuario);
    }

    @Get()
    findAll() {
        return this.perfilUsuarioService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.perfilUsuarioService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.perfilUsuarioService.remove(id);
    }
}
