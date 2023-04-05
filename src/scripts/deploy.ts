import commands from '@/commands';
import keys from '@/keys';
import { APIUser, REST, Routes } from 'discord.js';

const body = commands.map((command) => command.meta.toJSON());
const rest = new REST({ version: '10' }).setToken(keys.botToken);

async function main() {
  const currentUser = (await rest.get(Routes.user())) as APIUser;
  const endpoint =
    process.env.NODE_ENV === 'production'
      ? Routes.applicationCommands(currentUser.id)
      : Routes.applicationGuildCommands(currentUser.id, keys.testGuildId);

  await rest.put(endpoint, { body });

  return currentUser;
}

main()
  .then((user) => {
    const tag = `${user.username}#${user.discriminator}`;
    const response = process.env.NODE_ENV
      ? `Succesfully released commands in production as ${tag}!`
      : `Succesfully registered commands for development in ${keys.testGuildId} as ${tag}!`;

    console.log(response);
  })
  .catch(console.error);
