import { client } from '@/index';
import keys from '@/keys/env-keys';
import { ChannelType, PermissionsBitField } from 'discord.js';
import { MatchCreated } from './actions.types';

const guild = client.guilds.cache.get(keys.guildId);

export async function handleNewMatch(match: MatchCreated) {
  await createVoiceChannels(match);
  await createCategory(match);
}

async function createCategory(match: MatchCreated): Promise<void> {
  await createChannel(match.matchName, ChannelType.GuildCategory);
}

async function createVoiceChannels(match: MatchCreated): Promise<void> {
  await createChannel(match.team1, ChannelType.GuildVoice);
  await createChannel(match.team2, ChannelType.GuildVoice);
}

async function createChannel(
  name: string,
  type: ChannelType.GuildCategory | ChannelType.GuildVoice
): Promise<void> {
  const channel = await guild?.channels.create({
    name,
    type,
    position: +keys.positionVoiceChannels,
    permissionOverwrites: [
      {
        id: guild?.roles.everyone.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
      {
        // TO-DO: change this to a dinamic role id
        id:
          guild?.roles?.cache?.find((role) => role.name === '🍙・Membro')?.id ||
          '1089662861216854067',
        allow: [PermissionsBitField.Flags.ViewChannel],
      },
    ],
  });

  if (!channel) throw new Error('Error creating channel');
}
