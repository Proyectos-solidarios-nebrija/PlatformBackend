import { Test, TestingModule } from '@nestjs/testing';
import { MensajeService } from '@mensaje/mensaje.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mensaje } from '@mensaje/mensaje.entity';
import { Repository } from 'typeorm';

describe('MensajeService', () => {
    let service: MensajeService;
    let repository: Repository<Mensaje>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MensajeService,
                {
                    provide: getRepositoryToken(Mensaje),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<MensajeService>(MensajeService);
        repository = module.get<Repository<Mensaje>>(getRepositoryToken(Mensaje));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a message', async () => {
            const mensaje = new Mensaje();
            jest.spyOn(repository, 'save').mockResolvedValue(mensaje);

            expect(await service.create(mensaje)).toEqual(mensaje);
        });
    });

    describe('findAll', () => {
        it('should return an array of messages', async () => {
            const mensajes = [new Mensaje()];
            jest.spyOn(repository, 'find').mockResolvedValue(mensajes);

            expect(await service.findAll()).toEqual(mensajes);
        });
    });

    describe('findOne', () => {
        it('should return a single message', async () => {
            const mensaje = new Mensaje();
            jest.spyOn(repository, 'findOneBy').mockResolvedValue(mensaje);

            expect(await service.findOne(1)).toEqual(mensaje);
        });
    });

    describe('remove', () => {
        it('should delete a message', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

            expect(await service.remove(1)).toBeUndefined();
        });
    });
});
