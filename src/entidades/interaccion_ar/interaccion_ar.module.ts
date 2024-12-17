import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteraccionAR } from '@interaccion_ar/interaccion_ar.entity';
import { InteraccionARService } from '@interaccion_ar/interaccion_ar.service';
import { InteraccionARController } from '@interaccion_ar/interaccion_ar.controller';

@Module({
    imports: [TypeOrmModule.forFeature([InteraccionAR])],
    providers: [InteraccionARService],
    controllers: [InteraccionARController],
})
export class InteraccionARModule {}
