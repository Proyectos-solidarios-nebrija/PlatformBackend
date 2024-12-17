import { Module } from '@nestjs/common';
import { HiloService } from '@hilo/hilo.service';
import { HiloController } from '@hilo/hilo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hilo } from '@hilo/hilo.entity';
import { CategoriaModule } from '@categoria/categoria.module'; // Importa CategoriaModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Hilo]),
    CategoriaModule, // Asegúrate de importar CategoriaModule
  ],
  controllers: [HiloController],
  providers: [HiloService],
})
export class HiloModule {}
