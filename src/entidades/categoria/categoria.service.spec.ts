import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaService } from '@categoria/categoria.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Categoria } from '@categoria/categoria.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CategoriaService', () => {
  let service: CategoriaService;
  let repository: Repository<Categoria>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriaService,
        {
          provide: getRepositoryToken(Categoria),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriaService>(CategoriaService);
    repository = module.get<Repository<Categoria>>(
      getRepositoryToken(Categoria),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('delete', () => {
    it('should delete a category by ID using remove', async () => {
      const categoria = {
        id: 1,
        nombre: 'Tecnología',
        descripcion: 'Categoría de tecnología',
        hilos: [],
      } as Categoria;

      jest.spyOn(repository, 'findOne').mockResolvedValue(categoria);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await service.remove(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith(categoria);
    });

    it('should throw NotFoundException if category not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException('Categoría con ID 1 no encontrada'),
      );
    });
  });
});
