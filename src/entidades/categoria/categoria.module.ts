import { Module } from '@nestjs/common';
import { CategoriaService } from '@categoria/categoria.service';
import { CategoriaController } from '@categoria/categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '@categoria/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService], // Exporta CategoriaService
})
export class CategoriaModule {}
