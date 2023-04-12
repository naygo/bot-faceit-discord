import colors from '@/keys/colors';
import { HubMatch } from '@/models/types';
import { historicChannel } from '@/utils/historic-channel';
import { Client, EmbedBuilder } from 'discord.js';

export async function sendMatchFinisedEmbed(match: HubMatch, client: Client) {
  console.log(`[Match Finished] Enviando embed para o canal ${match.match_id}}`)
  if(!match) return console.log(`[Match Finished] Partida não encontrada!`)

  const embed = await generateEmbedMatchFinished(match);
  const channel = historicChannel(client);

  channel.send({embeds: [embed]});
}

export async function generateEmbedMatchFinished(match: HubMatch): Promise<EmbedBuilder> {
  const matchName = `Partida ${match.teams.faction1.name} x ${match.teams.faction2.name}`;
  const embed = new EmbedBuilder()
    .setTitle('✅ PARTIDA FINALIZADA')
    .setColor(colors.yellow as any)
    .setDescription(matchName);

  return embed;
}
