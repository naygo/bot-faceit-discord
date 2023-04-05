import events from '@/events';
import keys from '@/keys';
import { registerEvents } from '@/utils';
import { Client, GatewayIntentBits } from 'discord.js';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

registerEvents(client, events);

client.login(keys.botToken).catch((err) => {
  console.error('❌ Error on login: ', err);
  process.exit(1);
});