import { configPaginationButtons, generatePlayerHistoryEmbed } from '@/commands/player-history';
import { getPlayerHistoryOnHub } from '@/faceit-service';
import { EditReply, Reply, event, generatePaginationButtons, paginationAction } from '@/utils';
import { readIdPage } from '@/utils/page-ids';

export default event('interactionCreate', async ({ log, client }, interaction) => {
  if (!interaction.isButton()) return;
  if (!interaction.customId.startsWith('player-history')) return;

  try {
    // const [_, action, nickname, playerId, avatar, offset] = readIdPage(interaction.customId);
    const [_, action, nickname, playerId, offset] = readIdPage(interaction.customId);
    const newOffset = updateOffset(+offset, action); // calculate new offset

    log('[Player History]', newOffset);

    // search new values and update embed
    const playerHistory = await getPlayerHistoryOnHub(playerId, { offset: newOffset });

    // generate pagination button with new offset
    const buttonsConfig = configPaginationButtons(
      newOffset == 0,
      playerHistory.items.length < 10,
      nickname,
      playerId,
      // avatar,
      newOffset
    );
    const components = generatePaginationButtons(buttonsConfig);
    const embed = await generatePlayerHistoryEmbed(
      nickname,
      playerId,
      // avatar,
      playerHistory.items.filter((match) => match.status === 'finished'),
      interaction
    );

    await interaction.update({ embeds: [embed], components: [components] });
  } catch (error) {
    log('[Player History Error]', error);

    if (interaction.deferred)
      return await interaction.editReply(
        EditReply.error('❌ Ocorreu um erro ao executar o comando')
      );

    return await interaction.reply(Reply.error('❌ Ocorreu um erro ao executar o comando'));
  }
});

function updateOffset(offset: number, action: string): number {
  let newOffset = offset;

  if (action === paginationAction.back) {
    newOffset = offset - 10;
    if (newOffset < 0) newOffset = 0;
  }
  if (action === paginationAction.next) newOffset = offset + 10;

  return newOffset;
}
