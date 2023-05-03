import { FaceitWebhook } from './faceit-webhook';

interface FaceitMatchFinishedWebhookPayload {
  id: string;
  organizer_id: string;
  region: string;
  game: string;
  version: number;
  entity: {
    id: string;
    name: string;
    type: string;
  };
  teams: {
    name: string;
    id: string;
    score: number;
  }[];
  created_at: string;
  updated_at: string;
  started_at: string;
  finished_at: string;
}

export type FaceitMatchFinishedWebhook = FaceitWebhook<FaceitMatchFinishedWebhookPayload>;
