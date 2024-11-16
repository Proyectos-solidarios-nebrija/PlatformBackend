import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestionUsuario } from './gestion_usuario.entity';
import { GestionUsuarioService } from './gestion_usuario.service';
import { GestionUsuarioController } from './gestion_usuario.controller';

@Module({
    imports: [TypeOrmModule.forFeature([GestionUsuario])],
    providers: [GestionUsuarioService],
    controllers: [GestionUsuarioController],
})
export class GestionUsuarioModule {}
