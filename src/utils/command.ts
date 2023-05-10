import { Command, CommandEventExec, CommandMeta } from '@/types';

export function command(meta: CommandMeta, exec: CommandEventExec): Command {
  return { meta, exec };
}

export function commands(...commands: Command[]): Command[] {
  return commands;
}