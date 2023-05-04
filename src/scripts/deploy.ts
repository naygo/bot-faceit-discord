import commands from '@/commands';
import keys from '@/keys/env-keys';
import { APIUser, REST, Routes } from 'discord.js';

const body = commands.map((command) => command.meta.toJSON());
const rest = new REST({ version: '10' }).setToken(keys.botToken);

async function main() {
  const currentUser = (await rest.get(Routes.user())) as APIUser;
  const endpoint = Routes.applicationCommands(currentUser.id);
  await rest.put(endpoint, { body });
  return currentUser;
}

main()
  .then((user) => {
    const tag = `${user.username}#${user.discriminator}`;
    const response = `Successfully released commands in for ${tag}!`;
    console.log(response);
  })
  .catch(console.error);
