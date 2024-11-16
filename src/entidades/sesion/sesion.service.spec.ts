import { Test, TestingModule } from '@nestjs/testing';
import { SesionService } from './sesion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sesion } from './sesion.entity';
import { Repository } from 'typeorm';

describe('SesionService', () => {
    let service: SesionService;
    let repository: Repository<Sesion>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SesionService,
                {
                    provide: getRepositoryToken(Sesion),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<SesionService>(SesionService);
        repository = module.get<Repository<Sesion>>(getRepositoryToken(Sesion));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a sesion', async () => {
            const sesion: Sesion = {
                id: 1,
                usuario: null,
                tipo_sesion: 'Online',
                fecha: new Date('2024-11-10'),
                estado: 'Pendiente',
                notas: 'Revisión de proyecto',
            };

            jest.spyOn(repository, 'save').mockResolvedValue(sesion);
            const result = await service.create(sesion);
            expect(result).toEqual(sesion);
        });
    });

    describe('findAll', () => {
        it('should return an array of sesiones', async () => {
            const sesiones: Sesion[] = [
                {
                    id: 1,
                    usuario: null,
                    tipo_sesion: 'Online',
                    fecha: new Date('2024-11-10'),
                    estado: 'Pendiente',
                    notas: 'Revisión de proyecto',
                },
            ];

            jest.spyOn(repository, 'find').mockResolvedValue(sesiones);
            const result = await service.findAll();
            expect(result).toEqual(sesiones);
        });
    });

    describe('findOne', () => {
        it('should return a single sesion', async () => {
            const sesion: Sesion = {
                id: 1,
                usuario: null,
                tipo_sesion: 'Online',
                fecha: new Date('2024-11-10'),
                estado: 'Pendiente',
                notas: 'Revisión de proyecto',
            };

            jest.spyOn(repository, 'findOneBy').mockResolvedValue(sesion);
            const result = await service.findOne(1);
            expect(result).toEqual(sesion);
        });
    });

    describe('remove', () => {
        it('should delete a sesion', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);
            await expect(service.remove(1)).resolves.toBeUndefined();
        });
    });
});
