import { Message } from 'discord.js';

export async function deleteCategoriesAndChannelsMatches(message: Message) {
  try {
    const guild = message.guild;

    if (!guild) {
      throw new Error('Guild not found');
    }

    const categories = guild.channels.cache.filter((channel) =>
      channel.name.includes('Partida')
    );

    categories.forEach((category) => {
      category.guild.channels.cache.forEach((channel) => {
        if (channel.parentId === category.id) {
          channel.delete();
        }
      });

      category.delete();
    });
  } catch (error) {
    console.log(error);
  }
}
