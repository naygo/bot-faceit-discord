import { Request, Response } from 'express';
import { FaceitMatchFinishedWebhook } from '../models';
import { handleFinishedMatch } from '@/webhooks/actions/match-finished/delete-match-channels';

export async function handleMatchFinishedController(req: Request, res: Response) {
  try {
    const body: FaceitMatchFinishedWebhook = req.body;

    console.log('--------------- finished ------------------- ');
    console.log(body)

    const team1 = body.payload.teams[0].name.replace('team_', 'Team ');
    const team2 = body.payload.teams[1].name.replace('team_', 'Team ');
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
