import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Respuesta } from '@respuesta/respuesta.entity';

@Injectable()
export class RespuestaService {
    constructor(
        @InjectRepository(Respuesta)
        private readonly respuestaRepository: Repository<Respuesta>,
    ) {}

    create(respuesta: Respuesta): Promise<Respuesta> {
        return this.respuestaRepository.save(respuesta);
    }

    findAll(): Promise<Respuesta[]> {
        return this.respuestaRepository.find({ relations: ['usuario', 'pregunta'] });
    }

    findOne(id: number): Promise<Respuesta> {
        return this.respuestaRepository.findOne({
            where: { id },
            relations: ['usuario', 'pregunta'],
        });
    }

    async remove(id: number): Promise<void> {
        await this.respuestaRepository.delete(id);
    }
}
