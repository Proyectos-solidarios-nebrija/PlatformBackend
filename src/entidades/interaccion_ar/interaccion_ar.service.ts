import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InteraccionAR } from '@interaccion_ar/interaccion_ar.entity';

@Injectable()
export class InteraccionARService {
    constructor(
        @InjectRepository(InteraccionAR)
        private interaccionARRepository: Repository<InteraccionAR>,
    ) {}

    create(interaccion: InteraccionAR): Promise<InteraccionAR> {
        return this.interaccionARRepository.save(interaccion);
    }

    findAll(): Promise<InteraccionAR[]> {
        return this.interaccionARRepository.find();
    }

    findOne(id: number): Promise<InteraccionAR> {
        return this.interaccionARRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.interaccionARRepository.delete(id);
    }
}
