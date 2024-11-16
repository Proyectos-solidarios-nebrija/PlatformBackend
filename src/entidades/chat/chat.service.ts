import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
    ) {}

    async create(chat: Chat): Promise<Chat> {
        return this.chatRepository.save(chat);
    }

    async findAll(): Promise<Chat[]> {
        return this.chatRepository.find();
    }

    async findOne(id: number): Promise<Chat> {
        return this.chatRepository.findOneBy({ id });
    }

    async update(id: number, chat: Partial<Chat>): Promise<Chat> {
        await this.chatRepository.update(id, chat);
        return this.chatRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.chatRepository.delete(id);
    }
}
