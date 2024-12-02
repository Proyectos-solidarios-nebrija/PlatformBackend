import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './notificacion.entity';

@Injectable()
export class NotificacionService {
    constructor(
        @InjectRepository(Notificacion)
        private readonly notificacionRepository: Repository<Notificacion>,
    ) {}

    create(notificacion: Notificacion) {
        return this.notificacionRepository.save(notificacion);
    }

    findAll() {
        return this.notificacionRepository.find();
    }

    findOne(id: number) {
        return this.notificacionRepository.findOneBy({ id });
    }

    async remove(id: number) {
        await this.notificacionRepository.delete(id);
    }
}
