import { Client, GatewayIntentBits } from 'discord.js';
import { testChannelId } from './utils/global-constants';
import { getMatches } from './discord/configure-matches-voices-channels';
import { messageToShowPlayersOnQueue } from './discord/queue-message';
import { messageToShowCurrentMatches } from './discord/current-matches-message';
import { createButtonUpdateMatches } from './discord/create-button-update-matches';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', async () => {
  console.log('========== BOT ONLINE ==========');
  messageToShowPlayersOnQueue(client);
  messageToShowCurrentMatches(client);
});

client.on('messageCreate', async (message) => {
  if (message.content === '!addButtonAction')
    createButtonUpdateMatches(message);

  if (message.channelId !== testChannelId && !message.author.bot) return;

  if (message.content === '!ping') message.reply('pong');

  if (message.content === '!updateVoiceChannels') getMatches(message);

  // if (message.content === '!deleteVoiceChannels') {
  //   try {
  //     await deleteCategoriesAndChannelsMatches(message)
  //   } catch (error) {
  //   }
  // }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'updateMatches') {
    interaction.reply('!updateVoiceChannels');
    await interaction.deleteReply();
  }
});

client.login(process.env.BOT_TOKEN);
