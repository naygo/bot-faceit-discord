import { Router } from 'express';
import { handleMatchCreatedController, handleMatchFinishedController, handleWebhooksController } from '../controllers';

export const webhooksRouter = Router();

webhooksRouter.post('/', handleWebhooksController);
webhooksRouter.post('/match-created', handleMatchCreatedController);
webhooksRouter.post('/match-finished', handleMatchFinishedController);
