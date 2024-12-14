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
        this.enviarNotification(notificacion);
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

    enviarNotification(notificacion: Notificacion): void {
        if (notificacion.usuario.notificacionPreferencias.email) console.log(`Implement email notification: ${notificacion.usuario.nombre} "${notificacion.contenido}"`);
        if (notificacion.usuario.notificacionPreferencias.push) console.log(`Implement push notification: ${notificacion.usuario.nombre} "${notificacion.contenido}"`);
        if (notificacion.usuario.notificacionPreferencias.sms) console.log(`Implement sms notification: ${notificacion.usuario.nombre} "${notificacion.contenido}"`);
    }
}
