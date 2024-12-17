import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilUsuario } from '@perfil_usuario/perfil_usuario.entity';
import { PerfilUsuarioService } from '@perfil_usuario/perfil_usuario.service';
import { PerfilUsuarioController } from '@perfil_usuario/perfil_usuario.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PerfilUsuario])],
    providers: [PerfilUsuarioService],
    controllers: [PerfilUsuarioController],
})
export class PerfilUsuarioModule {}
