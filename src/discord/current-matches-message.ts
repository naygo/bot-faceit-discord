import { getHubMatches } from '@/faceit/faceit-api';
import { FaceitHubMatches, Roster } from '@/models/interfaces/hub-matches';
import { getMessagesFaceitInfoChannel } from '@/utils/faceit-info-channel';
import { Client } from 'discord.js';

interface CurrentMatchesInfo {
  matchName: string;
  playersName: {
    faction1: string[];
    faction2: string[];
  };
}

export async function messageToShowCurrentMatches(client: Client) {
  const { messages, channel } = await getMessagesFaceitInfoChannel(client);
  const currentMatches = await getHubMatches();

  const message = messages.find((message) =>
    message.content.includes('PARTIDAS ATIVAS')
  );

  const messageText = makeMessageText(mapCurrentMatchesInfo(currentMatches));

  if (message) {
    await message.edit(messageText);
  } else {
    await channel.send(messageText);
  }
}

function makeMessageText(currentMatchesInfo: CurrentMatchesInfo[]): string {
  const messageText = currentMatchesInfo.reduce((acc, currentMatchInfo) => {
    const { matchName, playersName } = currentMatchInfo;

    const playersNameFaction1 = playersName.faction1.join('\n');
    const playersNameFaction2 = playersName.faction2.join('\n');

    return `${acc} **\n----------- ${matchName} -----------**\n\n**PLAYERS TIME 1**\n${playersNameFaction1}\n\n**PLAYERS TIME 2**\n${playersNameFaction2}\n`;
  }, `**[${currentMatchesInfo.length}] PARTIDAS ATIVAS**\n`);

  return messageText;
}

function mapCurrentMatchesInfo(
  matches: FaceitHubMatches
): CurrentMatchesInfo[] {
  const currentMatches: CurrentMatchesInfo[] = [];
  for (const match of matches.items) {
    currentMatches.push({
      matchName: `${match.teams.faction1.name} **VS** ${match.teams.faction2.name}`,
      playersName: {
        faction1: mapPlayerName(match.teams.faction1.roster),
        faction2: mapPlayerName(match.teams.faction2.roster),
      },
    });
  }

  return currentMatches;
}

function mapPlayerName(players: Roster[]) {
  return players.map(
    (player) => `${player.nickname} (${player.game_player_name})`
  );
}
