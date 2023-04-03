import { getHubPlayers, getPlayerHistoryOnHub } from '@/faceit/faceit-api';
import { Members } from '@/models/interfaces/faceit-hub-members';
import { PlayerHistory } from '@/models/interfaces/faceit-player-history';
import { formatDateFaceit } from '@/utils/format-date-faceit';
import { colorYellow } from '@/utils/global-constants';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  InteractionResponse,
} from 'discord.js';

export async function handlePlayerHistory(interaction: ChatInputCommandInteraction) {
  const nickname = interaction.options.getString('nickname');

  if (!nickname) return interaction.reply('Nickname não informado');

  const historyEmbed = await playerHistoryOnHub(nickname);
  const embedMessage = await interaction.reply({ embeds: [historyEmbed] });
  addPaginationReactsOnEmbed(embedMessage);
}

async function playerHistoryOnHub(nickname: string): Promise<EmbedBuilder> {
  const hubPlayers = await getHubPlayers();
  const player = hubPlayers.items.find((player) => player.nickname === nickname);

  if (!player) throw new Error('Player not found on hub!');

  console.log({
    player,
  });

  const playerHistory = await getPlayerHistoryOnHub(player?.user_id, {
    limit: 5,
  });

  const finishedMatches = playerHistory.items.filter((match) => match.status === 'finished');

  return await createPlayerHistoryEmbed(finishedMatches, player);
}

export async function createPlayerHistoryEmbed(history: PlayerHistory[], player: Members) {
  const embed = new EmbedBuilder()
    .setColor(colorYellow)
    .setTitle(`[${player.nickname}] ➞ Histórico de partidas no HUB da Faceit`)
    .setDescription(
      `**Total de partidas:** ${4132123121312}\n **Total de vitórias:** ${123123123123}`
    )
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

function checkPlayerWinner(match: PlayerHistory, player: Members) {
  const winner = match.results.winner === 'faction1' ? match.teams.faction1 : match.teams.faction2;
  return winner.players.find((matchPlayer) => matchPlayer.player_id === player.user_id);
}

function addPaginationReactsOnEmbed(embed: InteractionResponse) {
  const paginationRow: any = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('previous')
      .setLabel('Página anterior')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('next')
      .setLabel('Próxima página')
      .setStyle(ButtonStyle.Secondary)
  );

  embed.edit({ components: [paginationRow] });
}

function formatMatchName(match: PlayerHistory): string {
  const team1 = formatTeamNickname(match.teams.faction1.nickname);
  const team2 = formatTeamNickname(match.teams.faction2.nickname);

  return `${team1} VS ${team2}`;

  function formatTeamNickname(team: string) {
    return team.replace('team_', '');
  }
}
