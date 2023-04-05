import { Awaitable, Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

type LoggerFunction = (...args: unknown[]) => void;

export interface CommandProps {
  interaction: ChatInputCommandInteraction;
  client: Client;
  log: LoggerFunction;
}

export type CommandEventExec = (props: CommandProps) => Awaitable<unknown>;

export type CommandMeta =
  | SlashCommandBuilder
  | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

export interface Command {
  meta: CommandMeta;
  exec: CommandEventExec;
}
