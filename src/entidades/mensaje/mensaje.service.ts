import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './mensaje.entity';

@Injectable()
export class MensajeService {
    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>,
    ) {}

    async create(mensaje: Mensaje): Promise<Mensaje> {
        return this.mensajeRepository.save(mensaje);
    }

    async findAll(): Promise<Mensaje[]> {
        return this.mensajeRepository.find();
    }

    async findOne(id: number): Promise<Mensaje> {
        return this.mensajeRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.mensajeRepository.delete(id);
    }
}
