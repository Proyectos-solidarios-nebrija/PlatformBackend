import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from 'src/entidades/usuario/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Crear un nuevo usuario
  @Post()
  async create(@Body() usuarioData: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.create(usuarioData);
  }

  // Obtener todos los usuarios
  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  // Obtener un usuario por ID
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  // Actualizar un usuario
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<Usuario>,
  ): Promise<Usuario> {
    return this.usuarioService.update(id, updateData);
  }

  // Eliminar un usuario
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usuarioService.remove(id);
  }
}
