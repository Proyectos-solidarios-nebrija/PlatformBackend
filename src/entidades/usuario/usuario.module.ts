import { Module } from '@nestjs/common';
import { UsuarioService } from '@usuario/usuario.service';
import { UsuarioController } from '@usuario/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '@usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService], // <- Asegúrate de que esto esté presente
})
export class UsuarioModule {}
