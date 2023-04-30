import { client } from '@/index';
import keys from '@/keys/env-keys';
import { MatchCreated } from '../actions.types';

const guild = client.guilds.cache.get(keys.guildId);

export function handleFinishedMatch(match: MatchCreated) {
  deleteVoiceChannels(match);
  deleteCategory(match);
}

function deleteCategory(match: MatchCreated) {
  const categoryChannel = guild?.channels.cache.find((channel) => channel.name === match.matchName);
  categoryChannel?.delete();
}

function deleteVoiceChannels(match: MatchCreated) {
  const voiceChannels = [
    guild?.channels.cache.find((channel) => channel.name === match.team1),
    guild?.channels.cache.find((channel) => channel.name === match.team2),
  ];
  voiceChannels.forEach((channel) => channel?.delete());
}
