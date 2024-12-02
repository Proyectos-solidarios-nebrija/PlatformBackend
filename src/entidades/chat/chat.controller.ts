import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';

@Controller('chats')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    async create(@Body() chat: Chat): Promise<Chat> {
        return this.chatService.create(chat);
    }

    @Get()
    async findAll(): Promise<Chat[]> {
        return this.chatService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Chat> {
        return this.chatService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() chat: Partial<Chat>,
    ): Promise<Chat> {
        return this.chatService.update(id, chat);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.chatService.remove(id);
    }
}
