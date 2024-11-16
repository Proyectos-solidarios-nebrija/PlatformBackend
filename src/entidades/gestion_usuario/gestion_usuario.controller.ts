import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { GestionUsuarioService } from './gestion_usuario.service';
import { GestionUsuario } from './gestion_usuario.entity';

@Controller('gestion_usuarios')
export class GestionUsuarioController {
    constructor(private readonly gestionUsuarioService: GestionUsuarioService) {}

    @Post()
    create(@Body() gestionUsuario: GestionUsuario) {
        return this.gestionUsuarioService.create(gestionUsuario);
    }

    @Get()
    findAll() {
        return this.gestionUsuarioService.findAll();
    }

    @Get(':id_admin/:id_usuario')
    findOne(
        @Param('id_admin') id_admin: number,
        @Param('id_usuario') id_usuario: number,
    ) {
        return this.gestionUsuarioService.findOne(id_admin, id_usuario);
    }

    @Delete(':id_admin/:id_usuario')
    remove(
        @Param('id_admin') id_admin: number,
        @Param('id_usuario') id_usuario: number,
    ) {
        return this.gestionUsuarioService.remove(id_admin, id_usuario);
    }
}
