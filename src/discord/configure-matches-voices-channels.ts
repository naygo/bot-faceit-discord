import { getHubMatches, getMatchInfo } from '@/faceit/faceit-api';
import { Faction, HubMatch } from '@/models/interfaces/hub-matches';
import { createDiscordChannel } from '@/utils/create-channel';
import { hubId, positionCreateChannels } from '@/utils/global-constants';
import { ChannelType, Message } from 'discord.js';
import { sleep } from '@/utils/time';
import { MatchInfo } from '@/models/interfaces/match';

interface MatchHandler {
  channelsId: string[];
  category: string;
}

interface Context {
  match: HubMatch;
  message: Message;
}

export async function getMatches(message: Message) {
  if (!hubId) throw new Error('HubId not found! (hubId)');
  const matches = await getHubMatches();

  for (const match of matches.items) {
    handleNewMatch({ match, message });
  }
}

async function handleNewMatch(ctx: Context) {
  const handler = await createChannelsAndCategory(ctx.match, ctx.message); // criar os canais no discord
  const { payload } = await getMatchInfo(ctx.match.match_id);

  await forMatchToEnd(payload); // esperar enquanto a partida não está cancelada/finalizada
  deleteChannelsAndCategory(handler, ctx.message); // se "FINISHED" -> deletar os canais
}

async function forMatchToEnd(match: MatchInfo): Promise<void> {
  while (match.status != 'FINISHED') {
    await sleep(30);
    console.log(`Match ${match.id} is ${match.status}`);
    const { payload } = await getMatchInfo(match.id);
    match = payload;
  }

  return;
}

async function createChannelsAndCategory(
  match: HubMatch,
  message: Message
): Promise<MatchHandler> {
  const channelsPosition = +(positionCreateChannels || '0');
  const channelsId: string[] = [];
  const teams: Faction[] = Object.values(match.teams);
  const matchName = `Partida ${match.teams.faction1.name} x ${match.teams.faction2.name}`;

  const categoryExists = message.guild?.channels.cache.find(
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
    message
  );

  for (const team of teams) {
    const voiceChannel = await createDiscordChannel(
      team.name.replace('team_', 'Time '),
      ChannelType.GuildVoice,
      channelsPosition,
      message,
      categoryChannel
    );

    channelsId.push(voiceChannel.id);
  }

  return {
    channelsId,
    category: categoryChannel.id,
  };
}

function deleteChannelsAndCategory(
  matchHandler: MatchHandler,
  message: Message
) {
  console.log('Deletando canais e categoria da partida: ', matchHandler);

  const discordChannels = message.guild?.channels.cache;
  const channels = discordChannels?.filter((channel) =>
    matchHandler.channelsId.includes(channel.id)
  );
  const category = discordChannels?.find(
    (channel) => channel.id === matchHandler.category
  );

  channels?.forEach((channel) => channel.delete());
  category?.delete();
}
