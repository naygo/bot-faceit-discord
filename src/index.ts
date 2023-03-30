import { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import { botToken, testChannelId } from './utils/global-constants'
import { getMatches } from './discord/configure-matches-voices-channels'
import { deleteCategoriesAndChannelsMatches } from './discord/delete-channels'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent
  ],
})

client.guilds.

  client.on('ready', () => {
    console.log('Bot is ready!')
  })

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'updateMatches') {
    try {
      interaction.reply('!updateVoiceChannels')
      await interaction.deleteReply()

    } catch (error) {
      console.log(error)
    }
  }
})


client.on('messageCreate', async (message) => {
  if (message.content === '!addButtonAction') {
    try {
      const row: any = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('updateMatches')
            .setLabel('🕹️ Atualizar canais')
            .setStyle(ButtonStyle.Primary)
        )

      await message.reply({ content: 'Clique no botão abaixo para atualizar os canais de voz de acordo com as partidas no FACEIT', components: [row] })

    } catch (error) {
      console.log(error)
    }
  }

  if (message.channelId !== testChannelId && !message.author.bot) return

  if (message.content === '!ping') {
    message.reply('pong')
  }

  if (message.content === '!updateVoiceChannels') {
    try {
      getMatches(message)
    } catch (error) {
      console.log(error)
    }
  }

  if (message.content === '!deleteVoiceChannels') {
    try {
      await deleteCategoriesAndChannelsMatches(message)
    } catch (error) {
    }
  }
})



client.login(botToken)