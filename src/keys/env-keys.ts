import { Keys } from '@/types';

import dotenv from 'dotenv';
dotenv.config();

const keys: Keys = {
  botToken: process.env.BOT_TOKEN ?? 'NULL',

  faceitApiKey: process.env.FACEIT_API_KEY ?? 'NULL',
  faceitHubId: process.env.FACEIT_HUB_ID ?? 'NULL',

  guildId: process.env.GUILD_ID ?? 'NULL',

  faceitInfoChannelId: process.env.FACEIT_INFO_CHANNEL_ID ?? 'NULL',
  historicChannelId: process.env.HISTORIC_CHANNEL_ID ?? 'NULL',
  leaderboardChannelId: process.env.LEADERBOARD_CHANNEL_ID ?? 'NULL',
  memberRoleId: process.env.MEMBER_ROLE_ID ?? 'NULL',
  casterRoleId: process.env.CASTER_ROLE_ID ?? 'NULL',
  coachRoleId: process.env.COACH_ROLE_ID ?? 'NULL',

  positionVoiceChannels: process.env.POSITION_VOICE_CHANNELS ?? 'NULL',
};

if (Object.values(keys).includes('NULL')) throw new Error('Some key is not defined!');

export default keys;
