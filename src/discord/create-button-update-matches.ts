import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle, Message } from 'discord.js';

export async function createButtonUpdateMatches(message: Message) {
  const row: any = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('updateMatches')
      .setLabel('🕹️ Atualizar canais')
      .setStyle(ButtonStyle.Primary)
  );

  await message.channel.send({
    content:
      'Clique no botão abaixo para atualizar os canais de voz de acordo com as partidas no FACEIT',
    components: [row],
  });
}
