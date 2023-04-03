import { Client, GatewayIntentBits } from 'discord.js';
import { getMatches } from './discord/matches-voices-channels';
import { messageToShowPlayersOnQueue } from './discord/players-on-queue-embed';
import { messageToShowCurrentMatches } from './discord/current-matches-message';
import { getMessagesFaceitInfoChannel } from './utils/faceit-info-channel';
import { sleep } from './utils/time';
import { handlePlayerHistory } from './discord/player-history-matches';
import { CommandsEnum } from './models/enums/commands.enum';
import { updateFaceitInfoChannelEmbeds } from './discord/button-update-matches';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', async (c) => {
  console.log(`✅ Logged in as ${c.user?.tag}!`);

  await updateFaceitInfoChannelEmbeds(client);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const interactions: Record<string, () => void> = {
    [CommandsEnum.PING]: () => interaction.reply('Pong!'),
    [CommandsEnum.UPDATE_MATCHES]: () => getMatches(interaction),
    [CommandsEnum.MATCHES_HISTORY]: async () => handlePlayerHistory(interaction),
  };

  interactions[interaction.commandName]();

  // if (interaction.isButton()) {
  //   if (interaction.customId === 'updateMatches') {
  //     interaction.reply('!updateVoiceChannels');
  //     await interaction.deleteReply();
  //   }
  // }
});

client.login(process.env.BOT_TOKEN);


