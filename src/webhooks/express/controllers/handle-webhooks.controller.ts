import { getHubMatches } from '@/faceit-service';
import { Request, Response } from 'express';

export async function handleWebhooksController(req: Request, res: Response) {
  try {
    const body = req.body;

    console.log(' ---------------------handleWebhooksController ------------------------- ');
    console.log(req.body);
    console.log('------------------------------------------------------------------------------------')

    return res.status(200).json({
      body,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}
