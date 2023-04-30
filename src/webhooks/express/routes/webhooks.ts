import { Router } from 'express';
import { handleMatchCreatedController } from '../controllers';

export const webhooksRouter = Router();

webhooksRouter.post('/match-created', handleMatchCreatedController);
