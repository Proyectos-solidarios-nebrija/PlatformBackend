import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerfilUsuario } from './perfil_usuario.entity';

@Injectable()
export class PerfilUsuarioService {
    constructor(
        @InjectRepository(PerfilUsuario)
        private perfilUsuarioRepository: Repository<PerfilUsuario>,
    ) {}

    create(perfilUsuario: PerfilUsuario): Promise<PerfilUsuario> {
        return this.perfilUsuarioRepository.save(perfilUsuario);
    }

    findAll(): Promise<PerfilUsuario[]> {
        return this.perfilUsuarioRepository.find();
    }

    findOne(id: number): Promise<PerfilUsuario> {
        return this.perfilUsuarioRepository.findOneBy({ id_usuario: id });
    }

    async remove(id: number): Promise<void> {
        await this.perfilUsuarioRepository.delete(id);
    }
}
