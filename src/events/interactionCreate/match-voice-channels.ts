import { ButtonInteraction, ChannelType, Client } from 'discord.js';
import { HubMatch, MatchInfo } from '@/models/types';
import { EditReply, Reply, event, sleep } from '@/utils';
import keys from '@/keys/env-keys';
import { createDiscordChannel } from '@/utils/create-channel';
import { handleLeaderboard } from '../ready/leaderboard';
import { sendMatchFinisedEmbed } from '@/modules/match-finshed';
import { getHubMatches, getMatchInfo } from '@/faceit-service';

interface MatchHandler {
  channelsId: string[];
  categoryId: string;
}

export default event('interactionCreate', async ({ log, client }, interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'match-voice-channels') return;

  try {
    const matches = await getHubMatches();

    for (const match of matches.items) {
      match.status == 'MANUAL_RESULT' && handleNewMatch(match, interaction, client);
    }

    await interaction.deferUpdate();
  } catch (error) {
    log('[Match Voice Channels Error]', error);

    if (interaction.deferred)
      return await interaction.editReply(
        EditReply.error('❌ Ocorreu um erro ao executar o comando')
      );

    return await interaction.reply(Reply.error('❌ Ocorreu um erro ao executar o comando'));
  }
});

async function handleNewMatch(match: HubMatch, interaction: ButtonInteraction, client: Client) {
  const channelsAndCategory = await createChannelsAndCategory(match, interaction);
  const { payload } = await getMatchInfo(match.match_id);

  await forMatchToEnd(payload);

  const isChannelsDeleted = await deleteChannelsAndCategory(channelsAndCategory, interaction);
  isChannelsDeleted && (await sendMatchFinisedEmbed(match, client));

  await handleLeaderboard(client);
}

async function forMatchToEnd(match: MatchInfo): Promise<void> {
  while (match.status != 'FINISHED') {
    console.log(
      `[Match Voice Channels] Aguardando partida terminar... ${match.teams.faction1.name} x ${match.teams.faction2.name}`
    );
    await sleep(30);
    const { payload } = await getMatchInfo(match.id);
    match = payload;
  }

  return;
}

async function createChannelsAndCategory(
  match: HubMatch,
  interaction: ButtonInteraction
): Promise<MatchHandler> {
  const channelsPosition = +keys.positionVoiceChannels;
  const channelsId: string[] = [];
  const matchName = `Partida ${match.teams.faction1.name} x ${match.teams.faction2.name}`;

  const categoryExists = interaction.guild?.channels.cache.find(
    (channel) => channel.name === matchName
  );
  if (categoryExists) {
    return {
      channelsId: categoryExists.guild.channels.cache
        .filter((channel) => channel.parentId === categoryExists.id)
        .map((channel) => channel.id),
      categoryId: categoryExists.id,
    };
  }

  const categoryChannel = await createDiscordChannel(
    matchName,
    ChannelType.GuildCategory,
    channelsPosition,
    interaction
  );

  for (const team of Object.values(match.teams)) {
    const voiceChannel = await createDiscordChannel(
      team.name.replace('team_', 'Time '),
      ChannelType.GuildVoice,
      channelsPosition,
      interaction,
      categoryChannel
    );

    channelsId.push(voiceChannel.id);
  }

  return {
    channelsId,
    categoryId: categoryChannel.id,
  };
}

async function deleteChannelsAndCategory(
  channelsAndCategory: MatchHandler,
  interaction: ButtonInteraction
): Promise<boolean> {
  console.log('Deletando canais e categoria da partida: ', channelsAndCategory);
  const discordChannels = interaction.guild?.channels.cache;

  const channels = discordChannels?.filter((channel) =>
    channelsAndCategory.channelsId.includes(channel.id)
  );
  const category = discordChannels?.find(
    (channel) => channel.id === channelsAndCategory.categoryId
  );

  if (!channels || !category) return false;

  console.log(
    'Canais: ',
    channels?.map((channel) => channel.name)
  );
  console.log('Categoria: ', category?.name);

  channels?.forEach(async (channel) => await channel.delete());
  await category?.delete();

  return true;
}
