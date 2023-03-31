import {
  CategoryChannel,
  ChannelType,
  Message,
  OverwriteResolvable,
  PermissionsBitField,
} from 'discord.js';

export const createDiscordChannel = async (
  name: string,
  type: any,
  position: number,
  message: Message,
  parent?: CategoryChannel,
  permissions?: OverwriteResolvable[]
) => {
  const guild = message.guild;
  const channel = await guild?.channels.create({
    name,
    type,
    position,
    permissionOverwrites: [
      {
        id: guild?.roles.everyone.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
      {
        // TO-DO: change this to a dinamic role id
        id:
          guild?.roles?.cache?.find((role) => role.name === '🍙・Membro')?.id ||
          '1089662861216854067',
        allow: [PermissionsBitField.Flags.ViewChannel],
      },
    ],
  });

  if (parent) await channel?.setParent(parent);

  return channel;
};
