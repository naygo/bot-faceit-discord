import keys from '@/keys/env-keys';
import colors from '@/keys/colors';
import { specialCaracteres } from '@/keys/special-caracteres';
import { HubMatch, HubMatchMap, HubMatchRoster, HubMatchTeams } from '@/models/types';
import { event, formatDateFaceit, queueReactions, sleep } from '@/utils';
import { ChannelType, Client, EmbedBuilder } from 'discord.js';
import { getHubMatches, getPlayersOnQueue } from '@/faceit-service';

interface CurrentMatchesInfo {
  matchName: string;
  startedAt: string;
  faceitUrl: string;
  mapImage: string;
  playersName: {
    faction1: string[];
    faction2: string[];
  };
}

export default event('ready', async ({ log, client }) => {
  try {
    await updateEmbedInfo(client);
  } catch (error) {
    log('[Faceit Info Error]', error);
    throw error;
  }
});

async function updateEmbedInfo(client: Client) {
  const channelFaceitInfo = client.channels.cache.get(keys.faceitInfoChannelId);

  if (!channelFaceitInfo || channelFaceitInfo.type !== ChannelType.GuildText)
    throw new Error('Channel not found');

  const embeds = [await generateEmbedPlayersOnQueue(), ...(await messageToShowCurrentMatches())];

  const channelMessages = await channelFaceitInfo.messages.fetch();
  const faceitInfoMessageExists = channelMessages.find((message) =>
    message.embeds.find((embed) => embed.description?.includes('NA FILA'))
  );

  const message = {
    content: 'Informações atualizadas da fila e partidas no FACEIT',
    embeds,
  };

  if (faceitInfoMessageExists) {
    await faceitInfoMessageExists.edit(message);
  } else {
    await channelFaceitInfo.send(message);
  }

  await sleep(5);
  await updateEmbedInfo(client);
}

async function generateEmbedPlayersOnQueue(): Promise<EmbedBuilder> {
  const playersOnQueue = await getPlayersOnQueue();

  const emoji = queueReactions.find((reaction) => reaction.valores.includes(playersOnQueue))?.emoji;
  const messageText = `${emoji + specialCaracteres.blackSpace}**[${playersOnQueue}] NA FILA**`;

  const embed = new EmbedBuilder().setColor('#e09600').setDescription(messageText);

  return embed;
}

async function messageToShowCurrentMatches(): Promise<EmbedBuilder[]> {
  const matches = await getHubMatches();

  const currentMatches = matches.items.filter((match) => match.status === 'MANUAL_RESULT');
  const checkInMatches = matches.items.filter((match) => match.status === 'CHECK_IN');

  const currentMatchesInfo = mapCurrentMatchesInfo(currentMatches);
  const embeds: EmbedBuilder[] = [];
  embeds.push(makeCurrentMatchesEmbed(currentMatches.length, checkInMatches.length));

  matches.items.length > 0 && embeds.push(...createCurrentMatchesEmbed(currentMatchesInfo));

  return embeds;
}

function makeCurrentMatchesEmbed(currentMatches: number, checkInMatches: number) {
  const embed = new EmbedBuilder().setColor(colors.yellow as any).setDescription(
    `
        ${'🟢' + specialCaracteres.blackSpace}**[${currentMatches}] PARTIDAS ATIVAS**
        ${'🟠' + specialCaracteres.blackSpace}**[${checkInMatches}] PARTIDAS EM CHECK-IN**\n
        ${'📃' + specialCaracteres.blackSpace} INFORMAÇÕES DAS PARTIDAS **ATIVAS** ⤵️
      `
  );

  return embed;
}

function mapCurrentMatchesInfo(matches: HubMatch[]): CurrentMatchesInfo[] {
  const currentMatches: CurrentMatchesInfo[] = [];
  for (const match of matches) {
    currentMatches.push({
      matchName: formatTeamsName(match.teams),
      startedAt: formatDateFaceit(match.started_at),
      faceitUrl: match.faceit_url.replace('{lang}', 'pt'),
      mapImage: getImageVotedMap(match.voting?.map),
      playersName: {
        faction1: mapPlayerNickname(match.teams.faction1.roster),
        faction2: mapPlayerNickname(match.teams.faction2.roster),
      },
    });
  }

  return currentMatches;
}

function mapPlayerNickname(players: HubMatchRoster[]) {
  return players.map((player) => player.game_player_name);
}

function createCurrentMatchesEmbed(currentMatchesInfo: CurrentMatchesInfo[]): EmbedBuilder[] {
  const embeds = currentMatchesInfo.map((currentMatchInfo) => {
    const { matchName, playersName, startedAt } = currentMatchInfo;

    const embed = new EmbedBuilder()
      .setTitle(matchName)
      .setAuthor({
        name: '📎 Faceit Link',
        url: currentMatchInfo.faceitUrl,
      })
      .addFields([
        {
          name: ' ',
          value: playersName.faction1.join('\n'),
          inline: true,
        },
        {
          name: ' ',
          value: playersName.faction2.join('\n'),
          inline: true,
        },
      ])
      .setImage(currentMatchInfo.mapImage)
      .setFooter({ text: `Partida iniciada em: ${startedAt}` });

    return embed;
  });

  return embeds;
}

function getImageVotedMap(map: HubMatchMap): string {
  if (!map) return ' ';

  const votedMap = map.pick[0];
  const infoVotedMap = map.entities.find((map) => map.guid === votedMap);

  return infoVotedMap?.image_lg || ' ';
}

function formatTeamsName(teams: HubMatchTeams): string {
  if (!teams.faction1 || !teams.faction2) return ' ';

  return `**${formatTeam(teams.faction1.name)}** vs **${formatTeam(teams.faction2.name)}**`;

  function formatTeam(team: string) {
    return team.replace('team_', 'Time ').replace(/_/g, ' ').toUpperCase();
  }
}
