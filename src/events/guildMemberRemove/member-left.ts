import keys from '@/keys/env-keys';
import { event } from '@/utils';
import { ChannelType } from 'discord.js';

export default event('guildMemberRemove', async ({ log, client }, member) => {
  try {
    const channel = client.channels.cache.get(keys.memberLeftChannelId);

    if (!channel) throw new Error('Channel not found!');
    if (channel.type !== ChannelType.GuildText) throw new Error('Channel is not a text channel!');

    await channel.send(`👋 \`${member.user.tag}\` saiu do servidor!`);
  } catch (error) {
    log('[Member Left Error]', error);
    throw error;
  }
});
