import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sesion } from './sesion.entity';

@Injectable()
export class SesionService {
    constructor(
        @InjectRepository(Sesion)
        private readonly sesionRepository: Repository<Sesion>,
    ) {}

    create(sesion: Sesion) {
        return this.sesionRepository.save(sesion);
    }

    findAll() {
        return this.sesionRepository.find();
    }

    findOne(id: number) {
        return this.sesionRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const result = await this.sesionRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`Sesion with ID ${id} not found`);
        }
    }
}
