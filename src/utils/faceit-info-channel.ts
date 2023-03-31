import {
  ChannelType,
  Client,
  Collection,
  Message,
  TextChannel,
} from 'discord.js';
import { faceitChannelInfoId } from './global-constants';

interface FaceitInfoChannel {
  messages: Collection<string, Message<true>>;
  channel: TextChannel;
}

export async function getMessagesFaceitInfoChannel(
  client: Client
): Promise<FaceitInfoChannel> {
  if (!faceitChannelInfoId) {
    throw new Error('Faceit info channel ID not found');
  }

  const channel = await client.channels.fetch(faceitChannelInfoId);

  if (!channel || channel.type !== ChannelType.GuildText) {
    throw new Error('Faceit info channel not found');
  }

  return {
    messages: await channel.messages.fetch(),
    channel,
  };
}
