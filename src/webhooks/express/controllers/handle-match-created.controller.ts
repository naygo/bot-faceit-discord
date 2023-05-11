import { Request, Response } from 'express';
import { getHubMatches, getMatchInfo } from '@/faceit-service';
import { handleNewMatch } from '@/webhooks/actions/match-created/create-match-channels';
import { sleep } from '@/utils';

export async function handleMatchCreatedController(req: Request, res: Response) {
  try {
    console.log('--------------- created ------------------- ');
    const matchId = req.body.payload.id;
    let result = await getMatchInfo(matchId);

    console.log(`${matchId} --- ${result.payload.state}`);
    while (result.payload.state !== 'MANUAL_RESULT' && result.payload.state !== 'CANCELLED') {
      console.log(`${matchId} --- Waiting for match to start...`);
      await sleep(30);
      result = await getMatchInfo(matchId);
    }

    if (result.payload.state === 'CANCELLED') {
      console.log(`${matchId} --- Match cancelled`);
      return res.status(200).json({
        message: 'acknowledged',
      });
    }

    const faction1 = result.payload.teams?.faction1?.name;
    const faction2 = result.payload.teams?.faction2?.name;

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
