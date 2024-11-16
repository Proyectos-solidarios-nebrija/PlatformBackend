import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Chat])],
    providers: [ChatService],
    controllers: [ChatController],
    exports: [ChatService],
})
export class ChatModule {}