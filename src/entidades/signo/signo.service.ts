import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signo } from './signo.entity';

@Injectable()
export class SignoService {
    constructor(
        @InjectRepository(Signo)
        private readonly signoRepository: Repository<Signo>,
    ) {}

    create(signo: Signo): Promise<Signo> {
        return this.signoRepository.save(signo);
    }

    findAll(): Promise<Signo[]> {
        return this.signoRepository.find();
    }

    findOne(id: number): Promise<Signo> {
        return this.signoRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.signoRepository.delete(id);
    }
}
