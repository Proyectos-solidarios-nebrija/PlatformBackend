import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajeService } from '@mensaje/mensaje.service';
import { MensajeController } from '@mensaje/mensaje.controller';
import { Mensaje } from '@mensaje/mensaje.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Mensaje])],
    controllers: [MensajeController],
    providers: [MensajeService],
})
export class MensajeModule {}
