import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from './pregunta.entity';

@Injectable()
export class PreguntaService {
    constructor(
        @InjectRepository(Pregunta)
        private preguntaRepository: Repository<Pregunta>,
    ) {}

    create(pregunta: Pregunta): Promise<Pregunta> {
        return this.preguntaRepository.save(pregunta);
    }

    findAll(): Promise<Pregunta[]> {
        return this.preguntaRepository.find({ relations: ['usuario', 'respuestas'] });
    }

    findOne(id: number): Promise<Pregunta> {
        return this.preguntaRepository.findOne({
            where: { id },
            relations: ['usuario', 'respuestas'],
        });
    }

    async remove(id: number): Promise<void> {
        await this.preguntaRepository.delete(id);
    }
}
