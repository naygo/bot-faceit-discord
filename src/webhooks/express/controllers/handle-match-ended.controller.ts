import { Request, Response } from 'express';
import { FaceitMatchEndedWebhook } from '../models';
import { getMatchInfo } from '@/faceit-service';

export async function handleMatchCreatedController(req: Request, res: Response) {
  try {
    const body: FaceitMatchEndedWebhook = req.body;
    const matchId = body.payload.id;

    const matchInfo = await getMatchInfo(matchId);

    const team1 = matchInfo.payload.teams.faction1.name.replace('team_', 'Team');
    const team2 = matchInfo.payload.teams.faction2.name.replace('team_', 'Team');
    const matchName = `${team1} x ${team2}`;

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
