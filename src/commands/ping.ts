import { command } from '@/utils';
import { SlashCommandBuilder } from 'discord.js';

const meta = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('\'Pinga\' BOT para testar a conexão')
  .addStringOption((option) =>
    option
      .setName('message')
      .setDescription('Provide the bot a message to responde with')
      .setMinLength(1)
      .setMaxLength(100)
      .setRequired(false)
  );

export default command(meta, async ({ interaction }) => {
  const message = interaction.options.getString('message');
  return interaction.reply({
    ephemeral: true,
    content: message ?? '🏓 Pong!'
  });
});
