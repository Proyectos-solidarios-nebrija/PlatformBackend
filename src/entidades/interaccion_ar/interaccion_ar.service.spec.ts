import { Test, TestingModule } from '@nestjs/testing';
import { InteraccionARService } from './interaccion_ar.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InteraccionAR } from './interaccion_ar.entity';
import { Repository } from 'typeorm';

describe('InteraccionARService', () => {
    let service: InteraccionARService;
    let repository: Repository<InteraccionAR>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InteraccionARService,
                {
                    provide: getRepositoryToken(InteraccionAR),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<InteraccionARService>(InteraccionARService);
        repository = module.get<Repository<InteraccionAR>>(getRepositoryToken(InteraccionAR));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create an interaction', async () => {
            const interaction: InteraccionAR = {
                id: 1,
                usuario: null,
                tipo_gesto: 'wave',
                fecha_interaccion: new Date(),
                feedback_visual: { success: true },
            };

            jest.spyOn(repository, 'save').mockResolvedValue(interaction);

            expect(await service.create(interaction)).toEqual(interaction);
        });
    });

    describe('findAll', () => {
        it('should return an array of interactions', async () => {
            const interactions: InteraccionAR[] = [
                {
                    id: 1,
                    usuario: null,
                    tipo_gesto: 'wave',
                    fecha_interaccion: new Date(),
                    feedback_visual: { success: true },
                },
            ];

            jest.spyOn(repository, 'find').mockResolvedValue(interactions);

            expect(await service.findAll()).toEqual(interactions);
        });
    });

    describe('findOne', () => {
        it('should return a single interaction', async () => {
            const interaction: InteraccionAR = {
                id: 1,
                usuario: null,
                tipo_gesto: 'wave',
                fecha_interaccion: new Date(),
                feedback_visual: { success: true },
            };

            jest.spyOn(repository, 'findOneBy').mockResolvedValue(interaction);

            expect(await service.findOne(1)).toEqual(interaction);
        });
    });

    describe('remove', () => {
        it('should delete an interaction', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

            expect(await service.remove(1)).toBeUndefined();
        });
    });
});
