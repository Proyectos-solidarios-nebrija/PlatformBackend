import { Test, TestingModule } from '@nestjs/testing';
import { VideollamadaService } from '@videollamada/videollamada.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Videollamada } from '@videollamada/videollamada.entity';
import { Repository } from 'typeorm';

describe('VideollamadaService', () => {
    let service: VideollamadaService;
    let repository: Repository<Videollamada>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VideollamadaService,
                {
                    provide: getRepositoryToken(Videollamada),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<VideollamadaService>(VideollamadaService);
        repository = module.get<Repository<Videollamada>>(
            getRepositoryToken(Videollamada),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a videollamada', async () => {
            const videollamada: Videollamada = {
                id: 1,
                usuario: null,
                fecha: new Date(),
                estado: 'pendiente',
            };

            jest.spyOn(repository, 'save').mockResolvedValue(videollamada);
            expect(await service.create(videollamada)).toEqual(videollamada);
        });
    });

    describe('findAll', () => {
        it('should return all videollamadas', async () => {
            const videollamadas: Videollamada[] = [
                {
                    id: 1,
                    usuario: null,
                    fecha: new Date(),
                    estado: 'pendiente',
                },
            ];

            jest.spyOn(repository, 'find').mockResolvedValue(videollamadas);
            expect(await service.findAll()).toEqual(videollamadas);
        });
    });

    describe('findOne', () => {
        it('should return a single videollamada', async () => {
            const videollamada: Videollamada = {
                id: 1,
                usuario: null,
                fecha: new Date(),
                estado: 'pendiente',
            };

            jest.spyOn(repository, 'findOne').mockResolvedValue(videollamada);
            expect(await service.findOne(1)).toEqual(videollamada);
        });
    });

    describe('remove', () => {
        it('should delete a videollamada', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);
            expect(await service.remove(1)).toBeUndefined();
        });
    });
});
