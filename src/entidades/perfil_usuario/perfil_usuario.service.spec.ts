import { Test, TestingModule } from '@nestjs/testing';
import { PerfilUsuarioService } from './perfil_usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PerfilUsuario } from './perfil_usuario.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

describe('PerfilUsuarioService', () => {
    let service: PerfilUsuarioService;
    let repository: Repository<PerfilUsuario>;

    const mockUsuario: Usuario = {
        id: 1,
        nombre: 'John',
        apellidos: 'Doe',
        correo: 'john.doe@example.com',
        contrasena: 'password123',
        rol: 'usuario',
        biografia: 'Biografía de prueba',
        especializacion: 'Especialización de prueba',
        estado: 'activo',
        foto_perfil: 'https://example.com/profile.jpg',
        preferencias: {},
        perfil: null,
        sesiones: [],
        chatsEnviados: [],
        chatsRecibidos: [],
        mensajes: [],
        videollamadas: [],
        preguntas: [],
        respuestas: [],
        interaccionesAR: [],
        notificaciones: [],
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PerfilUsuarioService,
                {
                    provide: getRepositoryToken(PerfilUsuario),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<PerfilUsuarioService>(PerfilUsuarioService);
        repository = module.get<Repository<PerfilUsuario>>(getRepositoryToken(PerfilUsuario));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a perfil_usuario', async () => {
            const perfilUsuario: PerfilUsuario = {
                id_usuario: 1,
                usuario: mockUsuario,
                historial_actividades: { actividad: 'Ejemplo' },
                disponibilidad_horaria: { lunes: '9-17' },
            };

            jest.spyOn(repository, 'save').mockResolvedValue(perfilUsuario);
            const result = await service.create(perfilUsuario);
            expect(result).toEqual(perfilUsuario);
        });
    });

    describe('findAll', () => {
        it('should return an array of perfil_usuario', async () => {
            const perfiles: PerfilUsuario[] = [
                {
                    id_usuario: 1,
                    usuario: mockUsuario,
                    historial_actividades: { actividad: 'Ejemplo' },
                    disponibilidad_horaria: { lunes: '9-17' },
                },
            ];

            jest.spyOn(repository, 'find').mockResolvedValue(perfiles);
            const result = await service.findAll();
            expect(result).toEqual(perfiles);
        });
    });

    describe('findOne', () => {
        it('should return a single perfil_usuario', async () => {
            const perfilUsuario: PerfilUsuario = {
                id_usuario: 1,
                usuario: mockUsuario,
                historial_actividades: { actividad: 'Ejemplo' },
                disponibilidad_horaria: { lunes: '9-17' },
            };

            jest.spyOn(repository, 'findOneBy').mockResolvedValue(perfilUsuario);
            const result = await service.findOne(1);
            expect(result).toEqual(perfilUsuario);
        });
    });

    describe('remove', () => {
        it('should delete a perfil_usuario', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);
            await expect(service.remove(1)).resolves.toBeUndefined();
        });
    });
});
