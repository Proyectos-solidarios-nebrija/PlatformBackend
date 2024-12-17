import { Test, TestingModule } from '@nestjs/testing';
import { HiloService } from '@hilo/hilo.service';
import { CategoriaService } from '@categoria/categoria.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Hilo } from '@hilo/hilo.entity';
import { Repository } from 'typeorm';

describe('HiloService', () => {
  let service: HiloService;
  let repository: Repository<Hilo>;
  let categoriaService: CategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HiloService,
        {
          provide: CategoriaService,
          useValue: {
            findOne: jest.fn().mockImplementation((id: number) => {
              return id === 1
                ? Promise.resolve({
                    id: 1,
                    nombre: 'Tecnología',
                    descripcion: 'Categoría de tecnología',
                    hilos: [],
                  })
                : null;
            }),
          },
        },
        {
          provide: getRepositoryToken(Hilo),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HiloService>(HiloService);
    repository = module.get<Repository<Hilo>>(getRepositoryToken(Hilo));
    categoriaService = module.get<CategoriaService>(CategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a thread (hilo)', async () => {
      const hiloData = {
        titulo: '¿Qué es NestJS?',
        contenido: 'Una discusión sobre el framework NestJS.',
        categoria: { id: 1 },
      };

      const categoriaCompleta = {
        id: 1,
        nombre: 'Tecnología',
        descripcion: 'Categoría de tecnología',
        hilos: [],
      };

      const hiloCreado = {
        ...hiloData,
        categoria: categoriaCompleta,
        id: 1,
        fechaCreacion: new Date(),
      } as Hilo;

      jest
        .spyOn(categoriaService, 'findOne')
        .mockResolvedValue(categoriaCompleta);
      jest.spyOn(repository, 'save').mockResolvedValue(hiloCreado);
      jest.spyOn(repository, 'create').mockReturnValue(hiloCreado);

      const result = await service.create(hiloData as Hilo);

      expect(categoriaService.findOne).toHaveBeenCalledWith(1);
      expect(repository.create).toHaveBeenCalledWith({
        titulo: hiloData.titulo,
        contenido: hiloData.contenido,
        categoria: categoriaCompleta,
      });
      expect(repository.save).toHaveBeenCalledWith(hiloCreado);
      expect(result).toEqual(hiloCreado);
    });
  });

  describe('findOne', () => {
    it('should return a thread by ID', async () => {
      const hilo = {
        id: 1,
        titulo: '¿Qué es NestJS?',
        contenido: 'Una discusión sobre el framework NestJS.',
        categoria: {
          id: 1,
          nombre: 'Tecnología',
          descripcion: 'Categoría de tecnología',
          hilos: [],
        },
        fechaCreacion: new Date(),
      } as Hilo;

      jest.spyOn(repository, 'findOne').mockResolvedValue(hilo);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['categoria'], // Asegúrate de incluir las relaciones
      });
      expect(result).toEqual(hilo);
    });
  });
});
