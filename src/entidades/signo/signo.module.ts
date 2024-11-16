import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signo } from './signo.entity';
import { SignoService } from './signo.service';
import { SignoController } from './signo.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Signo])],
    providers: [SignoService],
    controllers: [SignoController],
    exports: [SignoService],
})
export class SignoModule {}
