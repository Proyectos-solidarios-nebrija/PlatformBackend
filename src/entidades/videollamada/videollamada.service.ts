import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Videollamada } from './videollamada.entity';

@Injectable()
export class VideollamadaService {
    constructor(
        @InjectRepository(Videollamada)
        private videollamadaRepository: Repository<Videollamada>,
    ) {}

    create(videollamada: Videollamada): Promise<Videollamada> {
        return this.videollamadaRepository.save(videollamada);
    }

    findAll(): Promise<Videollamada[]> {
        return this.videollamadaRepository.find({ relations: ['usuario'] });
    }

    findOne(id: number): Promise<Videollamada> {
        return this.videollamadaRepository.findOne({
            where: { id },
            relations: ['usuario'],
        });
    }

    async remove(id: number): Promise<void> {
        await this.videollamadaRepository.delete(id);
    }
}
