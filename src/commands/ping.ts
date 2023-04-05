import { command } from '@/utils';
import { SlashCommandBuilder } from 'discord.js';

const meta = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('\'Pinga\' BOT para testar a conexão')
  .addStringOption((option) =>
    option
      .setName('message')
      .setDescription('Provide the bot a message to responde with')
      .setMinLength(1)
      .setMaxLength(100)
      .setRequired(false)
  );

export default command(meta, async ({ interaction }) => {
  const message = interaction.options.getString('message');
  return interaction.reply({
    ephemeral: true,
    content: message ?? '🏓 Pong!'
  });
});

// import { EmbedBuilder } from '@discordjs/builders';
// import { ChatInputCommandInteraction } from 'discord.js';

// export default async function ping(interaction: ChatInputCommandInteraction) {
//   const embed = new EmbedBuilder()
//     .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
//     .setDescription(`🏓 Carregando ping...`)
//     .setTimestamp(new Date());

//   const embed2 = new EmbedBuilder()
//     .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
//     .setDescription(`🏓 Pong!`)
//     .setTimestamp(new Date());

//   const messageReplied = await interaction.reply({ embeds: [embed] });
//   setTimeout(() => {
//     messageReplied.edit({ embeds: [embed2] });
//   }, 3000);
// }
