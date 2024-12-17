import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signo } from '@signo/signo.entity';
import { SignoService } from '@signo/signo.service';
import { SignoController } from '@signo/signo.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Signo])],
    providers: [SignoService],
    controllers: [SignoController],
    exports: [SignoService],
})
export class SignoModule {}
