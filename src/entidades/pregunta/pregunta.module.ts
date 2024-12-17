import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from '@pregunta/pregunta.entity';
import { PreguntaService } from '@pregunta/pregunta.service';
import { PreguntaController } from '@pregunta/pregunta.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Pregunta])],
    providers: [PreguntaService],
    controllers: [PreguntaController],
})
export class PreguntaModule {}
