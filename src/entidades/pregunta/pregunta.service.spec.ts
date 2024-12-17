import { Test, TestingModule } from '@nestjs/testing';
import { PreguntaService } from '@pregunta/pregunta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pregunta } from '@pregunta/pregunta.entity';
import { Repository } from 'typeorm';

describe('PreguntaService', () => {
    let service: PreguntaService;
    let repository: Repository<Pregunta>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PreguntaService,
                {
                    provide: getRepositoryToken(Pregunta),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<PreguntaService>(PreguntaService);
        repository = module.get<Repository<Pregunta>>(getRepositoryToken(Pregunta));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a pregunta', async () => {
            const pregunta: Pregunta = {
                id: 1,
                usuario: null,
                contenido: '¿Qué es TypeORM?',
                fecha_publicacion: new Date(),
                respuestas: [],
            };

            jest.spyOn(repository, 'save').mockResolvedValue(pregunta);
            expect(await service.create(pregunta)).toEqual(pregunta);
        });
    });

    describe('findAll', () => {
        it('should return all preguntas', async () => {
            const preguntas: Pregunta[] = [
                {
                    id: 1,
                    usuario: null,
                    contenido: '¿Qué es TypeORM?',
                    fecha_publicacion: new Date(),
                    respuestas: [],
                },
            ];

            jest.spyOn(repository, 'find').mockResolvedValue(preguntas);
            expect(await service.findAll()).toEqual(preguntas);
        });
    });

    describe('findOne', () => {
        it('should return a single pregunta', async () => {
            const pregunta: Pregunta = {
                id: 1,
                usuario: null,
                contenido: '¿Qué es TypeORM?',
                fecha_publicacion: new Date(),
                respuestas: [],
            };

            jest.spyOn(repository, 'findOne').mockResolvedValue(pregunta);
            expect(await service.findOne(1)).toEqual(pregunta);
        });
    });

    describe('remove', () => {
        it('should delete a pregunta', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);
            expect(await service.remove(1)).toBeUndefined();
        });
    });
});
