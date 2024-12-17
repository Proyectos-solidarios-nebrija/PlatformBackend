import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GestionUsuario } from '@gestion_usuario/gestion_usuario.entity';

@Injectable()
export class GestionUsuarioService {
    constructor(
        @InjectRepository(GestionUsuario)
        private readonly gestionUsuarioRepository: Repository<GestionUsuario>,
    ) {}

    async create(gestionUsuario: GestionUsuario) {
        return this.gestionUsuarioRepository.save(gestionUsuario);
    }

    async findAll() {
        return this.gestionUsuarioRepository.find();
    }

    async findOne(id_admin: number, id_usuario: number) {
        return this.gestionUsuarioRepository.findOne({
            where: { id_admin, id_usuario },
        });
    }

    async remove(id_admin: number, id_usuario: number): Promise<void> {
        await this.gestionUsuarioRepository.delete({ id_admin, id_usuario });
    }
}

