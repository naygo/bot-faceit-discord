import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import {
  PaginationButtonConfig,
  command,
  createIdPage,
  formatDateFaceit,
  generatePaginationButtons,
  paginationAction,
} from '@/utils';
import { getHubPlayers, getPlayerHistoryOnHub } from '@/services/faceit-api';
import { Members, PlayerHistory } from '@/models/types';
import colors from '@/keys/colors';

const meta = new SlashCommandBuilder()
  .setName('historico')
  .setDescription('Lista seu histórico de jogos no FACEIT')
  .addStringOption((option) =>
    option
      .setName('nickname')
      .setDescription('Seu nickname no FACEIT')
      .setMinLength(1)
      .setRequired(true)
  );

export default command(meta, async ({ interaction }) => {
  const nickname = interaction.options.getString('nickname');
  if (!nickname) {
    interaction.reply('❌ Nickname não informado');
    throw new Error('Nickname não informado');
  }

  // await interaction.deferReply({ ephemeral: true });
  await interaction.deferReply({ ephemeral: true });

  const player = await getPlayerOnHub(nickname);
  console.log(player);
  const playerHistory = (await getPlayerHistoryOnHub(player.user_id)).items.filter(
    (match) => match.status === 'finished'
  );

  const initialOffset = 0;
  const embed = await generatePlayerHistoryEmbed(
    player.nickname,
    player.user_id,
    // player.avatar,
    playerHistory,
    interaction
  );

  const buttonsConfig = configPaginationButtons(
    true,
    playerHistory.length < 10,
    player.nickname,
    player.user_id,
    // player.avatar,
    initialOffset
  );
  const components = generatePaginationButtons(buttonsConfig);

  await interaction.editReply({ embeds: [embed], components: [components] });
});

export async function getPlayerOnHub(nickname: string): Promise<Members> {
  const players = await getHubPlayers();
  const player = players.find((player) => player.nickname === nickname);

  if (!player) throw new Error('Player not found on hub!');

  return player;
}

export async function generatePlayerHistoryEmbed(
  nickname: string,
  playerId: string,
  // avatar: string,
  playerHistory: PlayerHistory[],
  interaction: ChatInputCommandInteraction | ButtonInteraction
): Promise<EmbedBuilder> {
  // const playerLeaderboard = await getPlayerOnHubLeaderboard(playerId);

  const embed = new EmbedBuilder()
    .setColor(colors.yellow as any)
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
    .setTitle(`Histórico de partidas de [${nickname}] no HUB da Faceit`);
  // .setDescription(
  //   `**Total de partidas:** ${playerLeaderboard.played}\n **Total de vitórias:** ${playerLeaderboard.won}`
  // )
  // .setThumbnail(playerLeaderboard.player.avatar)

  for (const match of playerHistory) {
    const matchName = formatMatchName(match);
    const winner = checkPlayerWinner(match, playerId);

    embed.addFields([
      {
        name: `${winner ? '🟢' : '🔴'}  ${matchName}`,
        value: `**Data:** ${formatDateFaceit(match.started_at)}
      **Placar:** ${match.results.score.faction1} x ${
          match.results.score.faction2
        } • [Faceit URL](${match.faceit_url})`,
      },
    ]);
  }

  return embed;
}

export function configPaginationButtons(
  backDisabled: boolean = false,
  nextDisabled: boolean = false,
  ...args: unknown[]
): PaginationButtonConfig {
  const backId = createIdPage('player-history', paginationAction.back, ...args);
  const nextId = createIdPage('player-history', paginationAction.next, ...args);

  const buttonsConfig: PaginationButtonConfig = {
    back: { id: backId, disabled: backDisabled },
    next: { id: nextId, disabled: nextDisabled },
  };

  return buttonsConfig;
}

// utils
function checkPlayerWinner(match: PlayerHistory, playerId: string) {
  const winner = match.results.winner === 'faction1' ? match.teams.faction1 : match.teams.faction2;
  return winner.players.find((matchPlayer) => matchPlayer.player_id === playerId);
}

function formatMatchName(match: PlayerHistory): string {
  const team1 = formatTeamNickname(match.teams.faction1.nickname);
  const team2 = formatTeamNickname(match.teams.faction2.nickname);

  return `${team1} VS ${team2}`;

  function formatTeamNickname(team: string) {
    return team.replace('team_', '');
  }
}
