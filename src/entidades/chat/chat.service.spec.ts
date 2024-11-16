import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository } from 'typeorm';

describe('ChatService', () => {
    let service: ChatService;
    let repository: Repository<Chat>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChatService,
                {
                    provide: getRepositoryToken(Chat),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<ChatService>(ChatService);
        repository = module.get<Repository<Chat>>(getRepositoryToken(Chat));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a chat', async () => {
            const chat: Chat = {
                id: 1,
                emisor: { id: 1 } as any,
                receptor: { id: 2 } as any,
                fecha_inicio: new Date(),
                mensajes: [],
            };
            jest.spyOn(repository, 'save').mockResolvedValue(chat);

            expect(await service.create(chat)).toEqual(chat);
        });
    });

    describe('findAll', () => {
        it('should return an array of chats', async () => {
            const chats: Chat[] = [
                {
                    id: 1,
                    emisor: { id: 1 } as any,
                    receptor: { id: 2 } as any,
                    fecha_inicio: new Date(),
                    mensajes: [],
                },
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(chats);

            expect(await service.findAll()).toEqual(chats);
        });
    });

    describe('findOne', () => {
        it('should return a single chat', async () => {
            const chat: Chat = {
                id: 1,
                emisor: { id: 1 } as any,
                receptor: { id: 2 } as any,
                fecha_inicio: new Date(),
                mensajes: [],
            };
            jest.spyOn(repository, 'findOneBy').mockResolvedValue(chat);

            expect(await service.findOne(1)).toEqual(chat);
        });
    });

    describe('remove', () => {
        it('should delete a chat', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

            expect(await service.remove(1)).toBeUndefined();
        });
    });
});
