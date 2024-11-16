import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from './respuesta.entity';
import { RespuestaService } from './respuesta.service';
import { RespuestaController } from './respuesta.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Respuesta])],
    providers: [RespuestaService],
    controllers: [RespuestaController],
})
export class RespuestaModule {}
