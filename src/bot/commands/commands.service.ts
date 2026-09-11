import {
    Injectable
} from '@nestjs/common';
import { Message } from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { 
    HelloCommand,
    RandomInt,
    SendMessage,
    ShowHelp
} from './simpleCommands';

@Injectable()
export class CommandsService {
    private readonly configService: ConfigService;
    private readonly commands = [
        {
            name: 'хелп',
            execute: ShowHelp,
            about: 'Показывает список всех доступных команд'
        },
        {
            name: 'привет',
            execute: HelloCommand,
            about: 'Привет!'
        },
        {
            name: 'рандом',
            execute: RandomInt,
            about: 'Выдаёт рандомное число в указанном диапазоне'
        },
        {
            name: 'сообщение',
            execute: SendMessage,
            about: 'Отправляет сообщение в канал'
        }
    ];

    constructor(configService: ConfigService) {
         this.configService = configService
    }
    getCommands() {
        return [...this.commands];
    }

    handle(message: Message) {
        const command = message.content.trim() + ' ';
        const commName = command.slice(0, command.indexOf(' '));
        const prefix = this.configService.get<string>('PREFIX');
        const args = command.trim().split(/\s+/).slice(1);

        for (const comm of this.commands) {
            if (prefix + comm.name === commName) {
                comm.execute(message, args, this.getCommands());
                return;
            };
        };
    }
}