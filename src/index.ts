import { Client, GatewayIntentBits } from 'discord.js';
import { testChannelId } from './utils/global-constants';
import { getMatches } from './discord/configure-matches-voices-channels';
import { messageToShowPlayersOnQueue } from './discord/queue-message';
import { messageToShowCurrentMatches } from './discord/current-matches-message';
import { createButtonUpdateMatches } from './discord/create-button-update-matches';
import { getMessagesFaceitInfoChannel } from './utils/faceit-info-channel';
import { sleep } from './utils/time';

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
  updateFaceitInfoChannelEmbeds(client);
});

async function updateFaceitInfoChannelEmbeds(client: Client) {
  const { messages, channel } = await getMessagesFaceitInfoChannel(client);
  const messageExists = messages.find((message) =>
    message.embeds.find((embed) =>
      embed.description?.includes('PARTIDAS ATIVAS')
    )
  );

  const embeds = [];
  embeds.push(await messageToShowPlayersOnQueue());
  embeds.push(...(await messageToShowCurrentMatches()));

  const message = {
    content: 'Informações atualizadas da fila e partidas no FACEIT',
    embeds,
  };

  if (messageExists) {
    await messageExists.edit(message);
  } else {
    await channel.send(message);
  }

  await sleep(5);
  updateFaceitInfoChannelEmbeds(client);
}

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
