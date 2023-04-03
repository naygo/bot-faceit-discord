import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle, Client, Message } from 'discord.js';

import { getMessagesFaceitInfoChannel } from '@/utils/faceit-info-channel';
import { sleep } from '@/utils/time';

import { messageToShowCurrentMatches } from './current-matches-message';
import { messageToShowPlayersOnQueue } from './players-on-queue-embed';

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

export async function updateFaceitInfoChannelEmbeds(client: Client) {
  const { messages, channel } = await getMessagesFaceitInfoChannel(client);
  const messageExists = messages.find((message) =>
    message.embeds.find((embed) => embed.description?.includes('NA FILA'))
  );

  const embeds = [];
  embeds.push(await messageToShowPlayersOnQueue());
  embeds.push(...(await messageToShowCurrentMatches()));

  const message = {
    content: 'Informações atualizadas da fila e partidas no FACEIT',
    embeds,
  };

  if (messageExists) {
    await messageExists.edit(message);
  } else {
    await channel.send(message);
  }

  await sleep(5);
  updateFaceitInfoChannelEmbeds(client);
}
