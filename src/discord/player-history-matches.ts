import { getHubPlayers, getPlayerHistoryOnHub } from '@/faceit/faceit-api';
import { Members } from '@/models/interfaces/faceit-hub-members';
import { PlayerHistory } from '@/models/interfaces/faceit-player-history';
import { formatDateFaceit } from '@/utils/format-date-faceit';
import { colorYellow } from '@/utils/global-constants';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  Events,
  InteractionResponse,
} from 'discord.js';

export async function handlerPlayerHistory(
  interaction: ChatInputCommandInteraction,
  client: Client
) {
  const nickname = interaction.options.getString('nickname');

  if (!nickname) return interaction.reply('Nickname não informado');

  const player = await searchPlayerOnHub(nickname);

  const { finishedMatches, offset } = await getPlayerFinishedMathes(player);

  const historyEmbed = await createPlayerHistoryEmbed(finishedMatches, player);
  const embedMessage = await interaction.reply({ embeds: [historyEmbed] });

  addPaginationReactsOnEmbed(embedMessage, offset);

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId.includes('player-history')) {
      const page = historyPagination(interaction);
      const { finishedMatches, offset } = await getPlayerFinishedMathes(player, page);
      const historyEmbed = await createPlayerHistoryEmbed(finishedMatches, player);
      const embed = await interaction.update({ embeds: [historyEmbed] });
      addPaginationReactsOnEmbed(embed, offset);
    }
  });
}

async function searchPlayerOnHub(nickname: string): Promise<Members> {
  const hubPlayers = await getHubPlayers();
  const player = hubPlayers.items.find((player) => player.nickname === nickname);

  if (!player) throw new Error('Player not found on hub!');

  return player;
}

async function getPlayerFinishedMathes(
  player: Members,
  offset: number = 0
): Promise<{ finishedMatches: PlayerHistory[]; offset: number }> {
  const playerHistory = await getPlayerHistoryOnHub(player.user_id, {
    limit: 10,
    offset,
  });

  const finishedMatches = playerHistory.items.filter((match) => match.status === 'finished');
  return {
    finishedMatches,
    offset,
  };
}

async function createPlayerHistoryEmbed(history: PlayerHistory[], player: Members) {
  const embed = new EmbedBuilder()
    .setColor(colorYellow)
    .setTitle(`[${player.nickname}] ➞ Histórico de partidas no HUB da Faceit`)
    // .setDescription(
    //   `**Total de partidas:** ${4132123121312}\n **Total de vitórias:** ${123123123123}`
    // )
    .setThumbnail(player.avatar);

  history.map((match) => {
    const matchName = formatMatchName(match);
    const winner = checkPlayerWinner(match, player);

    embed.addFields([
      {
        name: `${winner ? '🟢' : '🔴'}  ${matchName}`,
        value: `**Data:** ${formatDateFaceit(match.started_at)}
        **Placar:** ${match.results.score.faction1} x ${
          match.results.score.faction2
        } • [Faceit URL](${match.faceit_url})`,
      },
    ]);
  });

  return embed;
}

export function historyPagination(interaction: ButtonInteraction): number {
  const offset = Number(interaction.customId.split('-')[2]);

  if (interaction.customId.includes('next')) {
    const newOffset = offset + 10;
    return newOffset;
  }

  if (interaction.customId.includes('previous')) {
    const newOffset = offset - 10;
    return newOffset;
  }

  return 0;
}

function addPaginationReactsOnEmbed(embed: InteractionResponse, page: number) {
  const paginationRow: any = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`player-history-${page}-previous`)
      .setLabel('Página anterior')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(`player-history-${page}-next`)
      .setLabel('Próxima página')
      .setStyle(ButtonStyle.Secondary)
  );

  embed.edit({ components: [paginationRow] });
}

// UTILS
function checkPlayerWinner(match: PlayerHistory, player: Members) {
  const winner = match.results.winner === 'faction1' ? match.teams.faction1 : match.teams.faction2;
  return winner.players.find((matchPlayer) => matchPlayer.player_id === player.user_id);
}

function formatMatchName(match: PlayerHistory): string {
  const team1 = formatTeamNickname(match.teams.faction1.nickname);
  const team2 = formatTeamNickname(match.teams.faction2.nickname);

  return `${team1} VS ${team2}`;

  function formatTeamNickname(team: string) {
    return team.replace('team_', '');
  }
}
