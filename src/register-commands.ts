import { CommandsEnum } from '@/models/enums/commands.enum';
import { clientId, discordToken, guildId } from '@/utils/global-constants';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

import dotenv from 'dotenv';
dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName(CommandsEnum.PING)
    .setDescription('Replies with Pong!'),
  new SlashCommandBuilder()
    .setName(CommandsEnum.UPDATE_MATCHES)
    .setDescription('Atualiza os canais de voz'),
  new SlashCommandBuilder()
    .setName(CommandsEnum.MATCHES_HISTORY)
    .setDescription('Mostra o histórico de partidas')
    .addStringOption((option) =>
      option
        .setName('nickname')
        .setDescription('Nickname do jogador')
        .setRequired(true)
    ),
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN || '');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    if (!clientId || !discordToken || !guildId)
      throw new Error('clientId, discordToken or guildId is not defined');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
