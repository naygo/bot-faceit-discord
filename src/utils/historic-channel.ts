import keys from '@/keys/env-keys';
import { ChannelType, Client } from 'discord.js';

export const historicChannel = (client: Client) => {
  const channelLeaderboard = client.channels.cache.get(keys.historicChannelId);

  if (!channelLeaderboard || channelLeaderboard.type !== ChannelType.GuildText)
    throw new Error('Channel not found!');

  return channelLeaderboard;
};
