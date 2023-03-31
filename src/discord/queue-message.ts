import { getPlayersOnQueue } from '@/faceit/faceit-api';
import { getMessagesFaceitInfoChannel } from '@/utils/faceit-info-channel';
import { sleep } from '@/utils/time';
import { Client } from 'discord.js';

const reactions = [
  {
    emoji: '😿',
    valores: [0, 1, 2],
  },
  {
    emoji: '😼',
    valores: [3, 4, 5],
  },
  {
    emoji: '🙀',
    valores: [6, 7, 8],
  },
  {
    emoji: '😻',
    valores: [9, 10],
  },
];

export async function messageToShowPlayersOnQueue(client: Client) {
  const { messages, channel } = await getMessagesFaceitInfoChannel(client);
  const message = messages.find((message) =>
    message.content.includes('NA FILA')
  );

  const playersOnQueue = await getPlayersOnQueue();

  const emoji = reactions.find((reaction) =>
    reaction.valores.includes(playersOnQueue)
  )?.emoji;
  const messageText = `**[${playersOnQueue}] NA FILA** ${emoji}`;

  if (message) {
    await message.edit(messageText);
  } else {
    await channel.send(messageText);
  }

  await sleep(5);
  messageToShowPlayersOnQueue(client);
}
