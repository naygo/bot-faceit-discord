import { Router } from 'express';
import { handleMatchCreatedController, handleMatchFinishedController } from '../controllers';

export const webhooksRouter = Router();

webhooksRouter.post('/match-created', handleMatchCreatedController);
webhooksRouter.post('/match-finished', handleMatchFinishedController);
