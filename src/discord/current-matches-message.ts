import { getHubMatches } from '@/faceit/faceit-api';
import { getMessagesFaceitInfoChannel } from '@/utils/faceit-info-channel';
import { Client } from 'discord.js';

export async function messageToShowCurrentMatches(client: Client) {
  const { messages, channel } = await getMessagesFaceitInfoChannel(client);

  const currentMatches = await getHubMatches();
  const countCurrentMatches = currentMatches.items.length;

  const message = messages.find((message) =>
    message.content.includes('PARTIDAS ATIVAS')
  );
  const messageText = `**[${countCurrentMatches}] PARTIDAS ATIVAS**`;

  if (message) {
    await message.edit(messageText);
  } else {
    await channel.send(messageText);
  }
}
