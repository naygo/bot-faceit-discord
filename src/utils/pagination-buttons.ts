import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const paginationAction = {
  next: 'next',
  back: 'back',
};

export interface PaginationButtonConfig {
  back: {
    id: string;
    disabled?: boolean;
  },
  next: {
    id: string;
    disabled?: boolean;
  }
}

export function generatePaginationButtons(
  { back, next }: PaginationButtonConfig
): ActionRowBuilder<ButtonBuilder> {
  const backButton = new ButtonBuilder()
    .setCustomId(back.id)
    .setLabel('Voltar')
    .setStyle(ButtonStyle.Danger)
    .setDisabled(back.disabled);

  const nextButton = new ButtonBuilder()
    .setCustomId(next.id)
    .setLabel('Próxima')
    .setStyle(ButtonStyle.Success)
    .setDisabled(next.disabled);

  return new ActionRowBuilder<ButtonBuilder>().addComponents([backButton, nextButton]);
}
