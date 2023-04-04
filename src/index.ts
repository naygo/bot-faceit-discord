import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  Client,
  Events,
  GatewayIntentBits,
} from 'discord.js';
import { getMatches } from './discord/matches-voices-channels';
import { handlerPlayerHistory, historyPagination } from './discord/player-history-matches';
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

client.on(Events.InteractionCreate, (interaction) => {
  if (interaction.isButton()) interactionButton(interaction);
  if (interaction.isChatInputCommand()) interactionChatInputCommand(interaction);
});

function interactionChatInputCommand(interaction: ChatInputCommandInteraction) {
  const interactions: Record<string, () => void> = {
    [CommandsEnum.PING]: () => interaction.reply('Pong!'),
    [CommandsEnum.UPDATE_MATCHES]: async () => await getMatches(interaction),
    [CommandsEnum.MATCHES_HISTORY]: async () => await handlerPlayerHistory(interaction, client),
  };

  interactions[interaction.commandName]();
}

async function interactionButton(interaction: ButtonInteraction) {
  // if (interaction.customId.includes('player-history')) {
  //   const page = historyPagination(interaction);
  //   await handlerPlayerHistory(interaction, page)
  //   return;
  // }
}

client.login(process.env.BOT_TOKEN);
