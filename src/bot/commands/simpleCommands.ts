import { Message } from 'discord.js';
import { CommandType } from './types/command';

export function ShowHelp(
    message: Message,
    args: string[],
    commands: CommandType[]
) {
    const lines = commands.map(
        command => `\`${command.name}\` — ${command.about}`
    );

    return message.reply(
        `**Доступные команды:**\n${lines.join('\n')}`
    );
}

export function HelloCommand(message: Message) {
    return message.reply('Привет!');
}

export function RandomInt(message: Message, args: string[]) {
    let min, max;

    if (args.length === 1) {
        min = 0;
        max = +(args[0]);
    }else if (args.length === 2) {
        min = +(args[0]);
        max = +(args[1]);
    }else {
        message.reply('Пожалуйста, укажите диапазон в формате: /рандом [минимум] [максимум] или /random [максимум]');
        return;
    }

    try {
        if (isNaN(min) || isNaN(max)) {
            throw new Error('Одно из указанных значений не является числом.');
        }
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        message.reply(`Случайное число между ${min} и ${max}: ${randomNum}`);
    } catch (err) {
        message.reply(`Возникла ошибка - ${err}`);
    }

}

export function SendMessage(message: Message, args: string[]) {
    const channel = message.channel;

    if (channel.isTextBased() && 'send' in channel) {
        const mess = args.join(' ');

        if (mess) {
            channel.send(mess)
        }else {
            message.reply('Сообщение не должно быть пустым.');
        };
    }
}