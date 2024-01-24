import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(public messageService: MessagesService){}
    @Get()
    async listMessages() {
        const message = await this.messageService.findAll();

        if(!message) {
            throw new NotFoundException('message not found');
        }

        return message;
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        const content = body.content;
        console.log(content);
        return this.messageService.create(content);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string) {
        return this.messageService.findOne(id);
    }
}
