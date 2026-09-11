import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { CommandsService } from './commands/commands.service';

@Module({
  controllers: [BotController],
  providers: [BotService, CommandsService],
})
export class BotModule {}