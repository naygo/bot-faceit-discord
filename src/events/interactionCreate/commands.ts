import commands from '@/commands';
import { Command } from '@/types';
import { EditReply, Reply, event } from '@/utils';

const allCommands = commands.reduce((acc, command) => {
  acc.set(command.meta.name, command);
  return acc;
}, new Map<string, Command>());

export default event('interactionCreate', async ({ log, client }, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    const commandName = interaction.commandName;
    const command = allCommands.get(commandName);
    
    if (!command) throw new Error(`Command ${commandName} not found`);

    await command.exec({
      client,
      interaction,
      log(...args) {
        log(`[${command.meta.name}]`, ...args);
      },
    });
  } catch (error) {
    log('[Command Error]', error);

    if (interaction.deferred)
      return await interaction.editReply(
        EditReply.error('❌ Ocorreu um erro ao executar o comando')
      );

    return await interaction.reply(Reply.error('❌ Ocorreu um erro ao executar o comando'));
  }
});
