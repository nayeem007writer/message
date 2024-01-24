import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Injectable()
export class MessagesRepository {

    async findOne(id: string) {
        const contents = await readFile('messages.json','utf8');
        const message = JSON.parse(contents);
        const msg = message[id];
        return msg;
    }

    async findAll() {
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);
        return messages;

    }

    async create(message: string) {
        const content = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(content);

        const id = Math.floor(Math.random()*999);
        messages[id] = { id, content: message };

        await writeFile('messages.json', JSON.stringify(messages));
    }
}