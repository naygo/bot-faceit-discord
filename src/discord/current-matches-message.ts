import { getHubMatches } from '@/faceit/faceit-api';
import { FaceitHubMatches, HubMatch, Roster } from '@/models/interfaces/hub-matches';
import { getMessagesFaceitInfoChannel } from '@/utils/faceit-info-channel';
import { sleep } from '@/utils/time';
import { Client } from 'discord.js';

interface CurrentMatchesInfo {
  matchName: string;
  startedAt: string;
  playersName: {
    faction1: string[];
    faction2: string[];
  };
}

export async function messageToShowCurrentMatches(client: Client) {
  const { messages, channel } = await getMessagesFaceitInfoChannel(client);
  const matches = await getHubMatches();
  const currentMatches = matches.items.filter(match => match.status !== 'CHECK_IN');
  const checkInMatches = matches.items.filter(match => match.status === 'CHECK_IN');

  const message = messages.find((message) =>
    message.content.includes('PARTIDAS ATIVAS')
  );

  const messageText = makeCurrentMatchesMessageText(mapCurrentMatchesInfo(currentMatches));

  if (message) {
    await message.edit(`**[${checkInMatches.length}] PARTIDAS EM CHECK-IN**\n` + messageText);
  } else {
    await channel.send(messageText);
  }

  sleep(5);
  messageToShowCurrentMatches(client);
}

function makeCurrentMatchesMessageText(currentMatchesInfo: CurrentMatchesInfo[]): string {
  const messageText = currentMatchesInfo.reduce((acc, currentMatchInfo) => {
    const { matchName, playersName, startedAt } = currentMatchInfo;
    
    const playersNameFaction1 = playersName.faction1.join('\n');
    const playersNameFaction2 = playersName.faction2.join('\n');

    return `${acc} **\n----------- ${matchName} ----------- ${startedAt}**\n\n**PLAYERS TIME 1**\n${playersNameFaction1}\n\n**PLAYERS TIME 2**\n${playersNameFaction2}\n`;
  }, `**[${currentMatchesInfo.length}] PARTIDAS ATIVAS**\n`);

  return messageText;
}

function mapCurrentMatchesInfo(
  matches: HubMatch[]
): CurrentMatchesInfo[] {
  const currentMatches: CurrentMatchesInfo[] = [];
  for (const match of matches) {
    currentMatches.push({
      matchName: `${match.teams.faction1.name} **VS** ${match.teams.faction2.name}`,
      startedAt: convertEpoch(match.started_at),
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

function convertEpoch(epoch: number): string {
  const date = new Date(epoch * 1000);
  return date.toLocaleString().replace(',', '');
}