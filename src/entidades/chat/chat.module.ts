import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '@chat/chat.entity';
import { ChatService } from '@chat/chat.service';
import { ChatController } from '@chat/chat.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Chat])],
    providers: [ChatService],
    controllers: [ChatController],
    exports: [ChatService],
})
export class ChatModule {}
