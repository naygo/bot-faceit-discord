import keys from '@/keys/env-keys';
import colors from '@/keys/colors';
import { event } from '@/utils';
import { ChannelType, Client, EmbedBuilder } from 'discord.js';
import { getHubLeaderboard } from '@/faceit-service';
import { FaceitLeaderboard } from '@/types/faceit/leaderboard';

export default event('ready', async ({ log, client }) => {
  try {
    await handleLeaderboard(client);
  } catch (error) {
    log('[Leaderboard Error]', error);
    throw error;
  }
});

export async function handleLeaderboard(client: Client) {
  const leaderboard = await getHubLeaderboard(15);
  const channelLeaderboard = client.channels.cache.get(keys.leaderboardChannelId);

  if (!channelLeaderboard || channelLeaderboard.type !== ChannelType.GuildText)
    throw new Error('Channel not found!');

  const embed = await generateEmbedLeaderboard(leaderboard);

  const channelMessages = await channelLeaderboard.messages.fetch();
  const embedExists = channelMessages.find((m) =>
    m.embeds.find((e) => e.title?.includes('LEADERBOARD'))
  );

  if (embedExists) {
    await embedExists.edit({ embeds: [embed] });
  } else {
    await channelLeaderboard.send({ embeds: [embed] });
  }

  console.log('Leaderboard updated!');
}

async function generateEmbedLeaderboard(leaderboard: FaceitLeaderboard): Promise<EmbedBuilder> {
  const embed = new EmbedBuilder().setTitle('🎯  LEADERBOARD').setColor(colors.yellow as any);
  const topLeaders: { [key: number]: string } = {
    0: '🥇',
    1: '🥈',
    2: '🥉',
  };
  for (const [index, player] of Object.entries(leaderboard.items)) {
    const { nickname } = player.player;
    const { won, played, points } = player;

    embed.addFields({
      name: `${topLeaders[Number(index)] ?? '🔸'} \`${nickname}\``,
      value: `Pontos: **${points}** | Won: **${won}** | Played: **${played}**`,
    });
  }

  return embed;
}
