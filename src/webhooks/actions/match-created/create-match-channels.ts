import { client } from '@/index';
import keys from '@/keys/env-keys';
import { CategoryChannel, ChannelType, PermissionsBitField, VoiceChannel } from 'discord.js';
import { MatchCreated } from '../actions.types';

export async function handleNewMatch(match: MatchCreated): Promise<void> {
  if (channelsAlreadyCreated(match.matchName)) return console.log('Channel already exists');

  const categoryChannelId = await createCategory(match);
  await createVoiceChannels(match, categoryChannelId);
}

async function createCategory(match: MatchCreated): Promise<string> {
  const categoryChannel = await createChannel(match.matchName, ChannelType.GuildCategory);
  return categoryChannel.id;
}

async function createVoiceChannels(match: MatchCreated, categoryChannelId: string): Promise<void> {
  await createChannel(match.team1, ChannelType.GuildVoice, categoryChannelId);
  await createChannel(match.team2, ChannelType.GuildVoice, categoryChannelId);
}

async function createChannel(
  name: string,
  type: ChannelType.GuildCategory | ChannelType.GuildVoice,
  parent?: string
): Promise<CategoryChannel | VoiceChannel> {
  const guild = client.guilds.cache.get(keys.guildId);
  const channel = await guild?.channels.create({
    name,
    type,
    position: +keys.positionVoiceChannels,
    parent,
    permissionOverwrites: [
      {
        id: guild?.roles.everyone.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
      {
        id: keys.memberRoleId,
        allow: [PermissionsBitField.Flags.ViewChannel],
      },
    ],
  });

  if (!channel) throw new Error('Error creating channel');
  return channel;
}

function channelsAlreadyCreated(channelName: string) {
  const guild = client.guilds.cache.get(keys.guildId);
  const channel = guild?.channels.cache.find((channel) => channel.name === channelName);
  return channel;
}
