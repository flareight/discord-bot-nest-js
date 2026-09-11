import {
    Injectable,
    OnModuleInit
} from '@nestjs/common';

import {
    Client,
    GatewayIntentBits
} from 'discord.js';

import { CommandsService } from './commands/commands.service';

import { ConfigService } from '@nestjs/config';

@Injectable()

export class BotService implements OnModuleInit {
    private client: Client;
    private readonly configService: ConfigService;
    private readonly commandsService: CommandsService;
    private readonly startupMessages = [
        'Бот запущен!',
        'Всем привет!',
        'Бот готов!'
    ];
    
    constructor(configService: ConfigService, commandsService: CommandsService) {
         this.configService = configService;
         this.commandsService = commandsService;
    }

    randomGreetings() {
        const messages = this.startupMessages;

          return messages[Math.floor(Math.random() * messages.length)];
    };

    onModuleInit() {
        const token = this.configService.get<string>('DISCORD_TOKEN');
        const channelId = this.configService.get<string>('DISCORD_CHANNEL');
        const prefix = this.configService.get<string>('PREFIX');

        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds, 
                GatewayIntentBits.GuildMessages, 
                GatewayIntentBits.MessageContent
            ]});

        if (channelId) {
            this.client.on('ready', () => {
                const channel = this.client.channels.cache.get(channelId);

                if (channel?.isSendable()) {
                    channel.send(this.randomGreetings());
                };
            });
        };

        if (prefix) {
            this.client.on('messageCreate', (message) => {
                if (message.author.bot) return;

                if (!message.content.startsWith(prefix)) return;

                this.commandsService.handle(message);
            });
        };

        this.client.login(token);
    }
}