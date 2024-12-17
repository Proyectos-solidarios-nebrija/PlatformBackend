import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from '@usuario/usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '@usuario/usuario.entity';
import { Repository } from 'typeorm';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: {
            create: jest.fn(), // Mock de "create"
            save: jest.fn(), // Mock de "save"
            findOne: jest.fn(), // Mock de "findOne"
            find: jest.fn(), // Mock de "find"
            delete: jest.fn(), // Mock de "delete"
          },
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const usuarioData: Partial<Usuario> = {
        nombre: 'John',
        apellidos: 'Doe',
        correo: 'john.doe@example.com',
        contrasena: 'Password123!',
        rol: 'estudiante',
        biografia: 'Estudiante de programación',
        especializacion: 'Desarrollo web',
        estado: 'en línea',
        foto_perfil: 'https://example.com/perfil.jpg',
        preferencias: { notificaciones: true, tema: 'oscuro' },
      };

      const usuarioCreado = { ...usuarioData, id: 1 } as Usuario;

      jest.spyOn(repository, 'save').mockResolvedValue(usuarioCreado);
      jest.spyOn(repository, 'create').mockReturnValue(usuarioCreado);

      const result = await service.create(usuarioData as Usuario);
      expect(repository.create).toHaveBeenCalledWith(usuarioData);
      expect(repository.save).toHaveBeenCalledWith(usuarioCreado);
      expect(result).toEqual(usuarioCreado);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const usuario: Usuario = {
        id: 1,
        nombre: 'John',
        apellidos: 'Doe',
        correo: 'john.doe@example.com',
        contrasena: 'Password123!',
        rol: 'estudiante',
        biografia: 'Estudiante de programación',
        especializacion: 'Desarrollo web',
        estado: 'en línea',
        foto_perfil: 'https://example.com/perfil.jpg',
        preferencias: { notificaciones: true, tema: 'oscuro' },
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

      jest.spyOn(repository, 'findOne').mockResolvedValue(usuario);
      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(usuario);
    });
  });
});
