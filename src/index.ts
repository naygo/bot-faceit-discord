import { Client, GatewayIntentBits } from 'discord.js'
import { botToken, testChannelId } from './utils/global-constants'
import { configureMatchesVoiceChannels } from './discord/configure-matches-voices-channels'
import { deleteCategoriesAndChannelsMatches, deleteChannelsAndCategory } from './discord/delete-channels'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent
  ],
})

client.on('ready', () => {
  console.log('Bot is ready!')
})

client.on('messageCreate', async (message) => {
  if (message.channelId !== testChannelId) return

  if (message.content === '!ping') {
    message.reply('pong')
  }

  if (message.content === '!updateMatches') {
    try {
      await configureMatchesVoiceChannels(message)
      await deleteChannelsAndCategory(message)
    } catch (error) {
      message.reply(error)
    }
  }

  if (message.content === '!deleteCategoriesMatches') {
    try {
      await deleteCategoriesAndChannelsMatches(message)
    } catch (error) {
      message.reply(error)
    }
  }
})



client.login(botToken)