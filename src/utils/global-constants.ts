import dotenv from 'dotenv';
dotenv.config();

export const testChannelId = process.env.TESTS_CHANNEL_ID;
export const hubId = process.env.HUB_ID;
export const positionCreateChannels = process.env.POSITION_CREATE_CHANNELS;
export const discordId = process.env.DISCORD_SERVER_ID;
export const faceitChannelInfoId = process.env.QUEUE_CHANNEL_ID;
