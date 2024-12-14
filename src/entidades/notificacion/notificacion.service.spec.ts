import { Test, TestingModule } from '@nestjs/testing';
import { NotificacionService } from './notificacion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notificacion } from './notificacion.entity';
import { Repository } from 'typeorm';

describe('NotificacionService', () => {
  let service: NotificacionService;
  let repository: Repository<Notificacion>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificacionService,
        {
          provide: getRepositoryToken(Notificacion),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<NotificacionService>(NotificacionService);
    repository = module.get<Repository<Notificacion>>(
      getRepositoryToken(Notificacion),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a notification', async () => {
      const notificacion: Notificacion = {
        id: 1,
        usuario: null,
        tipo_notificacion: 'QUESTION_ANSWERED',
        contenido: 'Nueva notificación',
        leida: false,
        fecha_envio: new Date(),
      };

      jest.spyOn(repository, 'save').mockResolvedValue(notificacion);
      const result = await service.create(notificacion);
      expect(result).toEqual(notificacion);
    });
  });

  describe('findAll', () => {
    it('should return an array of notifications', async () => {
      const notificaciones: Notificacion[] = [
        {
          id: 1,
          usuario: null,
          tipo_notificacion: 'QUESTION_ANSWERED',
          contenido: 'Nueva notificación',
          leida: false,
          fecha_envio: new Date(),
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(notificaciones);
      const result = await service.findAll();
      expect(result).toEqual(notificaciones);
    });
  });

  describe('findOne', () => {
    it('should return a single notification', async () => {
      const notificacion: Notificacion = {
        id: 1,
        usuario: null,
        tipo_notificacion: 'QUESTION_ANSWERED',
        contenido: 'Nueva notificación',
        leida: false,
        fecha_envio: new Date(),
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(notificacion);
      const result = await service.findOne(1);
      expect(result).toEqual(notificacion);
    });
  });

  describe('remove', () => {
    it('should delete a notification', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);
      await expect(service.remove(1)).resolves.toBeUndefined();
    });
  });
});
