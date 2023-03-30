import { CategoryChannel, ChannelType, Message } from "discord.js";

export const createDiscordChannel = async (name: string, type: any, position: number, message: Message, parent?: CategoryChannel) => {
  const guild = message.guild
  const channel = await guild?.channels.create({
    name,
    type,
    position,
  });

  if(parent)  await channel?.setParent(parent);

  return channel
}