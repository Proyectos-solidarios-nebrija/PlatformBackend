import { Test, TestingModule } from '@nestjs/testing';
import { SignoService } from './signo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Signo } from './signo.entity';
import { Repository } from 'typeorm';

describe('SignoService', () => {
    let service: SignoService;
    let repository: Repository<Signo>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SignoService,
                {
                    provide: getRepositoryToken(Signo),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<SignoService>(SignoService);
        repository = module.get<Repository<Signo>>(getRepositoryToken(Signo));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a signo', async () => {
            const signo: Signo = {
                id: 1,
                nombre_signo: 'Hola',
                descripcion: 'Saludo básico en lenguaje de signos.',
                ejemplo_imagen_url: 'https://example.com/signos/hola.png',
                traduccion_texto: 'Hello',
                fecha_creacion: new Date(),
            };

            jest.spyOn(repository, 'save').mockResolvedValue(signo);
            expect(await service.create(signo)).toEqual(signo);
        });
    });

    describe('findAll', () => {
        it('should return an array of signos', async () => {
            const signos: Signo[] = [
                {
                    id: 1,
                    nombre_signo: 'Hola',
                    descripcion: 'Saludo básico en lenguaje de signos.',
                    ejemplo_imagen_url: 'https://example.com/signos/hola.png',
                    traduccion_texto: 'Hello',
                    fecha_creacion: new Date(),
                },
            ];

            jest.spyOn(repository, 'find').mockResolvedValue(signos);
            expect(await service.findAll()).toEqual(signos);
        });
    });

    describe('findOne', () => {
        it('should return a single signo', async () => {
            const signo: Signo = {
                id: 1,
                nombre_signo: 'Hola',
                descripcion: 'Saludo básico en lenguaje de signos.',
                ejemplo_imagen_url: 'https://example.com/signos/hola.png',
                traduccion_texto: 'Hello',
                fecha_creacion: new Date(),
            };

            jest.spyOn(repository, 'findOneBy').mockResolvedValue(signo);
            expect(await service.findOne(1)).toEqual(signo);
        });
    });

    describe('remove', () => {
        it('should delete a signo', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);
            await expect(service.remove(1)).resolves.toBeUndefined();
        });
    });
});
