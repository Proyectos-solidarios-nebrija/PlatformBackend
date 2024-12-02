import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Videollamada } from './videollamada.entity';
import { VideollamadaService } from './videollamada.service';
import { VideollamadaController } from './videollamada.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Videollamada])],
    providers: [VideollamadaService],
    controllers: [VideollamadaController],
})
export class VideollamadaModule {}
