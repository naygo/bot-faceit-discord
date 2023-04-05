import { ButtonInteraction, ChannelType } from 'discord.js';
import { HubMatch, MatchInfo } from '@/models/types';
import { getHubMatches, getMatchInfo } from '@/services/faceit-api';
import { EditReply, Reply, event, sleep } from '@/utils';
import keys from '@/keys';
import { createDiscordChannel } from '@/utils/create-channel';

interface MatchHandler {
  channelsId: string[];
  category: string;
}

export default event('interactionCreate', async ({ log, client }, interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'match-voice-channels') return;

  try {
    const matches = await getHubMatches();

    for (const match of matches.items) {
      handleNewMatch(match, interaction);
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

async function handleNewMatch(match: HubMatch, interaction: ButtonInteraction) {
  const handler = await createChannelsAndCategory(match, interaction);
  const { payload } = await getMatchInfo(match.match_id);

  await forMatchToEnd(payload);
  deleteChannelsAndCategory(handler, interaction);
}

async function forMatchToEnd(match: MatchInfo): Promise<void> {
  while (match.status != 'FINISHED') {
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
      category: categoryExists.id,
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
    category: categoryChannel.id,
  };
}

function deleteChannelsAndCategory(matchHandler: MatchHandler, interaction: ButtonInteraction) {
  console.log('Deletando canais e categoria da partida: ', matchHandler);

  const discordChannels = interaction.guild?.channels.cache;
  const channels = discordChannels?.filter((channel) =>
    matchHandler.channelsId.includes(channel.id)
  );
  const category = discordChannels?.find((channel) => channel.id === matchHandler.category);

  channels?.forEach((channel) => channel.delete());
  category?.delete();
}
