import { Test, TestingModule } from '@nestjs/testing';
import { RespuestaService } from '@respuesta/respuesta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Respuesta } from '@respuesta/respuesta.entity';
import { Repository } from 'typeorm';

describe('RespuestaService', () => {
    let service: RespuestaService;
    let repository: Repository<Respuesta>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RespuestaService,
                {
                    provide: getRepositoryToken(Respuesta),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<RespuestaService>(RespuestaService);
        repository = module.get<Repository<Respuesta>>(getRepositoryToken(Respuesta));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a respuesta', async () => {
            const respuesta: Respuesta = {
                id: 1,
                contenido: 'Esta es una respuesta.',
                fecha_publicacion: new Date(),
                votos: 0,
                pregunta: null,
                usuario: null,
            };

            jest.spyOn(repository, 'save').mockResolvedValue(respuesta);
            expect(await service.create(respuesta)).toEqual(respuesta);
        });
    });

    describe('findAll', () => {
        it('should return an array of respuestas', async () => {
            const respuestas: Respuesta[] = [
                {
                    id: 1,
                    contenido: 'Esta es una respuesta.',
                    fecha_publicacion: new Date(),
                    votos: 0,
                    pregunta: null,
                    usuario: null,
                },
            ];

            jest.spyOn(repository, 'find').mockResolvedValue(respuestas);
            expect(await service.findAll()).toEqual(respuestas);
        });
    });

    describe('findOne', () => {
        it('should return a single respuesta', async () => {
            const respuesta: Respuesta = {
                id: 1,
                contenido: 'Esta es una respuesta.',
                fecha_publicacion: new Date(),
                votos: 0,
                pregunta: null,
                usuario: null,
            };

            jest.spyOn(repository, 'findOne').mockResolvedValue(respuesta);
            expect(await service.findOne(1)).toEqual(respuesta);
        });
    });

    describe('remove', () => {
        it('should delete a respuesta', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);
            await service.remove(1);
            expect(repository.delete).toHaveBeenCalledWith(1);
        });
    });
});
