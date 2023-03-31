import { getPlayersOnQueue } from '@/faceit/faceit-api';
import { emptySpace } from '@/utils/global-constants';
import { EmbedBuilder } from 'discord.js';

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

export async function messageToShowPlayersOnQueue(): Promise<EmbedBuilder> {
  const playersOnQueue = await getPlayersOnQueue();

  const emoji = reactions.find((reaction) =>
    reaction.valores.includes(playersOnQueue)
  )?.emoji;
  const messageText = `${emoji + emptySpace}**[${playersOnQueue}] NA FILA**`;

  const embed = new EmbedBuilder()
    .setColor('#e09600')
    .setDescription(messageText);

  return embed;
}
