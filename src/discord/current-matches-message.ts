import { getHubMatches } from '@/faceit/faceit-api';
import { HubMatch, Map, Roster, Teams } from '@/models/interfaces/faceit-hub-matches';
import { formatDateFaceit } from '@/utils/format-date-faceit';
import { colorYellow, emptySpace } from '@/utils/global-constants';
import { EmbedBuilder } from 'discord.js';

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

export async function messageToShowCurrentMatches(): Promise<EmbedBuilder[]> {
  const matches = await getHubMatches();

  const currentMatches = matches.items.filter(
    (match) => match.status === 'MANUAL_RESULT'
  );
  const checkInMatches = matches.items.filter(
    (match) => match.status === 'CHECK_IN'
  );

  const currentMatchesInfo = mapCurrentMatchesInfo(currentMatches);
  const embeds: EmbedBuilder[] = [];
  embeds.push(
    makeCurrentMatchesEmbed(currentMatches.length, checkInMatches.length)
  );

  matches.items.length > 0 &&
    embeds.push(...createCurrentMatchesEmbed(currentMatchesInfo));

  return embeds;
}

function makeCurrentMatchesEmbed(
  currentMatches: number,
  checkInMatches: number
) {
  const embed = new EmbedBuilder().setColor(colorYellow).setDescription(
    `
        ${'🟢' + emptySpace}**[${currentMatches}] PARTIDAS ATIVAS**
        ${'🟠' + emptySpace}**[${checkInMatches}] PARTIDAS EM CHECK-IN**\n
        ${'📃' + emptySpace} INFORMAÇÕES DAS PARTIDAS **ATIVAS** ⤵️
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
      faceitUrl: match.faceit_url,
      mapImage: getImageVotedMap(match.voting?.map),
      playersName: {
        faction1: mapPlayerNickname(match.teams.faction1.roster),
        faction2: mapPlayerNickname(match.teams.faction2.roster),
      },
    });
  }

  return currentMatches;
}

function mapPlayerNickname(players: Roster[]) {
  return players.map((player) => player.game_player_name);
}

function createCurrentMatchesEmbed(
  currentMatchesInfo: CurrentMatchesInfo[]
): EmbedBuilder[] {
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

function getImageVotedMap(map: Map): string {
  if (!map) return ' ';

  const votedMap = map.pick[0];
  const infoVotedMap = map.entities.find((map) => map.guid === votedMap);

  return infoVotedMap?.image_lg || ' ';
}

function formatTeamsName(teams: Teams): string {
  if (!teams.faction1 || !teams.faction2) return ' ';

  return `**${formatTeam(teams.faction1.name)}** vs **${formatTeam(
    teams.faction2.name
  )}**`;

  function formatTeam(team: string) {
    return team.replace('team_', 'Time ').replace(/_/g, ' ').toUpperCase();
  }
}
