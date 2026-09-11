import { Message } from 'discord.js';

export type CommandType = {
    name: string;

    execute: (
        message: Message,
        args: string[],
        commands: CommandType[]
    ) => void | Promise<unknown>;

    about: string;
};