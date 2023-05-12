import { client } from '@/index';
import keys from '@/keys/env-keys';
import { MatchCreated } from '../actions.types';
import { handleLeaderboard } from '@/events/ready/leaderboard';
import { sleep } from '@/utils';

export async function handleFinishedMatch(match: MatchCreated): Promise<void> {
  console.log(`${match.matchName} ---- Deleting channels ----`);
  await deleteVoiceChannels(match);
  await deleteCategory(match);
  
  console.log(`${match.matchName} ---- Updating leaderboard ----`);
  await handleLeaderboard(client);
}

async function deleteCategory(match: MatchCreated) {
  const guild = client.guilds.cache.get(keys.guildId);
  const categoryChannel = guild?.channels.cache.find((channel) => channel.name === match.matchName);
  await categoryChannel?.delete();
}

async function deleteVoiceChannels(match: MatchCreated) {
  const guild = client.guilds.cache.get(keys.guildId);

  const voiceChannels = [
    guild?.channels.cache.find((channel) => channel.name === match.team1),
    guild?.channels.cache.find((channel) => channel.name === match.team2),
  ];

  voiceChannels.forEach(async (channel) => await channel?.delete());
}
