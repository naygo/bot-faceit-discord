import { getHubMatches } from "@/faceit/faceit-api";
import { hubId, matchesMock, positionCreateChannels } from "@/utils/global-constants";
import { ChannelType, Message } from "discord.js";

export async function configureMatchesVoiceChannels(message: Message) {
  try {
    // const matches = await getTeamsNames();
    const matches = matchesMock
    await createMatchesVoiceChannels(matches, message);

  } catch (error) {
    console.log(error);
  }
}

async function getTeamsNames() {
  try {
    if (!hubId) {
      throw new Error("Hub id not found");
    }

    const { items } = await getHubMatches(hubId);

    return items.map((match) => {
      return [match.teams.faction1.name, match.teams.faction2.name];
    });
  } catch (error) {
    console.log(error);
  }
}

async function createMatchesVoiceChannels(matches: any, message: Message) {
  try {
    const guild = message.guild;

    if (!guild) {
      throw new Error("Guild not found");
    }

    for (const match of matches) {
      if (guild.channels.cache.find(channel => channel.name === `Partida ${match[0]} x ${match[1]}`)) continue

      if (!positionCreateChannels) throw new Error('Position not found! (positionCreateChannels)')

      const category = await guild.channels.create({
        name: `Partida ${match[0]} x ${match[1]}`,
        type: ChannelType.GuildCategory,
        position: +positionCreateChannels,
      });

      for (const team of match) {
        await guild.channels.create({
          name: team.replace('team_', 'Time '),
          type: ChannelType.GuildVoice,
          parent: category,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
