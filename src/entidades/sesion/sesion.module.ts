import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SesionService } from './sesion.service';
import { SesionController } from './sesion.controller';
import { Sesion } from './sesion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Sesion])],
    providers: [SesionService],
    controllers: [SesionController],
})
export class SesionModule {}
