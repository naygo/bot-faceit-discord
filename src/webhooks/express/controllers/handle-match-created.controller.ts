import { Request, Response } from 'express';
import { getHubMatches } from '@/faceit-service';
import { handleNewMatch } from '@/webhooks/actions/match-created/create-match-channels';

export async function handleMatchCreatedController(req: Request, res: Response) {
  try {
    const [matchInfo] = (await getHubMatches()).items;

    const team1 = matchInfo.teams.faction1.name.replace('team_', 'Team ');
    const team2 = matchInfo.teams.faction2.name.replace('team_', 'Team ');
    const matchName = `${team1} x ${team2}`;

    await handleNewMatch({
      matchName,
      team1,
      team2,
    });

    return res.status(200).json({
      message: 'acknowledged',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}
