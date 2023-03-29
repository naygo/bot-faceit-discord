import { matchesMock } from "@/utils/global-constants";
import { Message, ChannelType } from "discord.js";

export async function deleteCategoriesAndChannelsMatches(message: Message) {
  try {
    const guild = message.guild;

    if (!guild) {
      throw new Error("Guild not found");
    }

    const categories = guild.channels.cache.filter(
      (channel) => channel.name.includes("Partida")
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

export async function deleteChannelsAndCategory(message: Message) {
  const matchs = matchesMock.map((match) => {
    return match.map((team) => {
      return team.replace("team_", "Time ");
    });
  })

  const channels = matchs.flat();
  const guild = message.guild;

  if (!guild) {
    throw new Error("Guild not found");
  }

  const matchsChannels = guild.channels.cache.filter(
    (channel) => channel.name.includes("Time")
  );

  matchsChannels.forEach(async (channel) => {
    const channelCategory = channel.parentId;

    if (!channelCategory) return

    if (!channels.includes(channel.name)) {
      await channel.delete();

      const category = guild.channels.cache.get(channelCategory);
      if (category) {
        await category.delete();
      }
    }
  });
}