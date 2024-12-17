import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionService } from '@notificacion/notificacion.service';
import { NotificacionController } from '@notificacion/notificacion.controller';
import { Notificacion } from '@notificacion/notificacion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Notificacion])],
    providers: [NotificacionService],
    controllers: [NotificacionController],
})
export class NotificacionModule {}
