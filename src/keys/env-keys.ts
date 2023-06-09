import { Keys } from '@/models/types';

import dotenv from 'dotenv';
dotenv.config();

const keys: Keys = {
  botToken: process.env.BOT_TOKEN ?? 'NULL',

  faceitApiKey: process.env.FACEIT_API_KEY ?? 'NULL',
  faceitHubId: process.env.FACEIT_HUB_ID ?? 'NULL',

  testGuildId: process.env.TEST_GUILD_ID ?? 'NULL',
  // clientID: process.env.CLIENT_ID ?? 'NULL',

  faceitInfoChannelId: process.env.FACEIT_INFO_CHANNEL_ID ?? 'NULL',
  // testsChannelId: process.env.TESTS_CHANNEL_ID ?? 'NULL',
  historicChannelId: process.env.HISTORIC_CHANNEL_ID ?? 'NULL',
  leaderboardChannelId: process.env.LEADERBOARD_CHANNEL_ID ?? 'NULL',
  memberLeftChannelId: process.env.MEMBER_LEFT_CHANNEL_ID ?? 'NULL',

  positionVoiceChannels: process.env.POSITION_VOICE_CHANNELS ?? 'NULL',
};

console.log({ keys })

if (Object.values(keys).includes('NULL')) throw new Error('Some key is not defined!');

export default keys;
