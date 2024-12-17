import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Videollamada } from '@videollamada/videollamada.entity';
import { VideollamadaService } from '@videollamada/videollamada.service';
import { VideollamadaController } from '@videollamada/videollamada.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Videollamada])],
    providers: [VideollamadaService],
    controllers: [VideollamadaController],
})
export class VideollamadaModule {}
