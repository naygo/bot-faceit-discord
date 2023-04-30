import { client } from '@/index';
import keys from '@/keys/env-keys';
import { MatchCreated } from '../actions.types';

const guild = client.guilds.cache.get(keys.guildId);

export async function handleFinishedMatch(match: MatchCreated): Promise<void> {
  await deleteVoiceChannels(match);
  await deleteCategory(match);
}

async function deleteCategory(match: MatchCreated) {
  const categoryChannel = guild?.channels.cache.find((channel) => channel.name === match.matchName);
  await categoryChannel?.delete();
}

async function deleteVoiceChannels(match: MatchCreated) {
  const voiceChannels = [
    guild?.channels.cache.find((channel) => channel.name === match.team1),
    guild?.channels.cache.find((channel) => channel.name === match.team2),
  ];
  voiceChannels.forEach(async (channel) => await channel?.delete());
}
