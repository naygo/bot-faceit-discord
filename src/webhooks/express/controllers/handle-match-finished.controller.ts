import { Request, Response } from 'express';
import { FaceitMatchFinishedWebhook } from '../models';
import { getMatchInfo } from '@/faceit-service';
import { handleFinishedMatch } from '@/webhooks/actions/match-finished/delete-match-channels';

export async function handleMatchFinishedController(req: Request, res: Response) {
  try {
    const body: FaceitMatchFinishedWebhook = req.body;

    const matchId = body.payload.id;

    const matchInfo = await getMatchInfo(matchId);

    const team1 = matchInfo.payload.teams.faction1.name.replace('team_', 'Team');
    const team2 = matchInfo.payload.teams.faction2.name.replace('team_', 'Team');
    const matchName = `${team1} x ${team2}`;

    await handleFinishedMatch({
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
