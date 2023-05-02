import { Request, Response } from 'express';

export async function handleWebhooksController(req: Request, res: Response) {
  try {
    const body = req.body;

    console.log('handleWebhooksController ------------------------------------------ ')
    console.log(body);

    if(body.event == 'match_status_finished')
      console.log(body.teams);

    return res.status(200).json({
      body
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}
