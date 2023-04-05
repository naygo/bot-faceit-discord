import colors from '@/keys/colors';
import { command } from '@/utils';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';

const meta = new SlashCommandBuilder()
  .setName('set-button-match-voice-channels')
  .setDescription(
    'Cria o botão para criar canais de voz para cada time da partida gerada no FACEIT'
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export default command(meta, async ({ interaction }) => {
  const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('match-voice-channels')
      .setLabel('Criar canais de voz')
      .setStyle(ButtonStyle.Danger)
  );

  const embed = new EmbedBuilder()
    .setTitle(
      '📢 Clique no botão para criar os canais de voz para cada time da partida gerada no FACEIT'
    )
    .setAuthor({
      name: 'Faceit Bot',
      iconURL: interaction.client.user?.displayAvatarURL() as string,
    })
    .setColor(colors.yellow as any);

  interaction.channel?.send({
    embeds: [embed],
    components: [button],
  });

  const successMessage = await interaction.reply({
    content: '✅ Botão criado com sucesso!',
    ephemeral: true,
  });

  setTimeout(() => {
    successMessage.delete();
  }, 3000);
});
