import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { Put } from '@nestjs/common';
import { UpdateProfileDto } from './usuario.dto';

@ApiTags('usuarios') // Agrupa los endpoints bajo el grupo 'usuarios' en Swagger
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({
    description: 'Datos necesarios para crear un usuario',
    type: Usuario,
  })
  @Post()
  async create(@Body() usuarioData: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.create(usuarioData);
  }

  @ApiBearerAuth() // Indica que este endpoint requiere autenticación JWT
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req): Promise<Partial<Usuario>> {
    const userId = req.user.id;
    const { contrasena, ...user } = await this.usuarioService.findOne(userId);
    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar el perfil del usuario autenticado' })
  @ApiBody({
    description: 'Datos a actualizar en el perfil del usuario',
    type: UpdateProfileDto,
  })
  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto): Promise<Partial<Usuario>> {
    const userId = req.user.id; // Usuario autenticado
    console.log('Usuario autenticado para actualización:', req.user);
    const updatedUser = await this.usuarioService.update(userId, updateProfileDto);
    const { contrasena, ...result } = updatedUser; // Excluir contraseña
    return result;
  }

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario que deseas obtener',
    type: Number,
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario que deseas actualizar',
    type: Number,
  })
  @ApiBody({
    description: 'Datos necesarios para actualizar el usuario',
    type: Usuario,
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.update(id, updateData);
  }

  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario que deseas eliminar',
    type: Number,
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usuarioService.remove(id);
  }
}
