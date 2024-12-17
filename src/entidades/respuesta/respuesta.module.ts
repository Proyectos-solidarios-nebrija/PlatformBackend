import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from '@respuesta/respuesta.entity';
import { RespuestaService } from '@respuesta/respuesta.service';
import { RespuestaController } from '@respuesta/respuesta.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Respuesta])],
    providers: [RespuestaService],
    controllers: [RespuestaController],
})
export class RespuestaModule {}
