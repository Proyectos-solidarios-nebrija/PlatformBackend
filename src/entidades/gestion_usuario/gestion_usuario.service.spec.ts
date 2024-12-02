import { Test, TestingModule } from '@nestjs/testing';
import { GestionUsuarioService } from './gestion_usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GestionUsuario } from './gestion_usuario.entity';
import { Repository } from 'typeorm';

describe('GestionUsuarioService', () => {
    let service: GestionUsuarioService;
    let repository: Repository<GestionUsuario>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GestionUsuarioService,
                {
                    provide: getRepositoryToken(GestionUsuario),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<GestionUsuarioService>(GestionUsuarioService);
        repository = module.get<Repository<GestionUsuario>>(
            getRepositoryToken(GestionUsuario),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a gestion_usuario', async () => {
            const gestionUsuario: GestionUsuario = {
                id_admin: 1,
                id_usuario: 2,
                permiso_modificacion: true,
                admin: undefined,
                usuario: undefined,
            };

            jest.spyOn(repository, 'save').mockResolvedValue(gestionUsuario);
            const result = await service.create(gestionUsuario);
            expect(result).toEqual(gestionUsuario);
        });
    });

    describe('findAll', () => {
        it('should return an array of gestion_usuario', async () => {
            const gestionUsuarios: GestionUsuario[] = [
                {
                    id_admin: 1,
                    id_usuario: 2,
                    permiso_modificacion: true,
                    admin: undefined,
                    usuario: undefined,
                },
            ];

            jest.spyOn(repository, 'find').mockResolvedValue(gestionUsuarios);
            const result = await service.findAll();
            expect(result).toEqual(gestionUsuarios);
        });
    });

    describe('findOne', () => {
        it('should return a single gestion_usuario', async () => {
            const gestionUsuario: GestionUsuario = {
                id_admin: 1,
                id_usuario: 2,
                permiso_modificacion: true,
                admin: undefined,
                usuario: undefined,
            };

            jest
                .spyOn(repository, 'findOne')
                .mockResolvedValue(gestionUsuario as any);
            const result = await service.findOne(1, 2);
            expect(result).toEqual(gestionUsuario);
        });
    });

    describe('remove', () => {
        it('should delete a gestion_usuario', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);
            const result = await service.remove(1, 2); // Llamada directa
            expect(result).toBeUndefined(); // Validar que no hay retorno explícito
        });
    });

});
