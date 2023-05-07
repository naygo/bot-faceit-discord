import { Request, Response } from 'express';
import { getHubMatches, getMatchInfo } from '@/faceit-service';
import { handleNewMatch } from '@/webhooks/actions/match-created/create-match-channels';
import { sleep } from '@/utils';

export async function handleMatchCreatedController(req: Request, res: Response) {
  try {
    console.log('--------------- created ------------------- ');
    const matchId = req.body.payload.id;
    const { payload } = await getMatchInfo(matchId);

    const faction1 = payload.teams?.faction1?.name;
    const faction2 = payload.teams?.faction2?.name;

    while (!faction1 || !faction2) {
      console.log(`Waiting for match ${matchId} to start...`);
      sleep(30);
    }

    const team1 = faction1.replace('team_', 'Team ');
    const team2 = faction2.replace('team_', 'Team ');
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
