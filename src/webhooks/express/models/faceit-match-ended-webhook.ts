import { FaceitWebhook } from './faceit-webhook';

interface FaceitMatchEndedWebhookPayload {
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
  created_at: string;
  updated_at: string;
}

export type FaceitMatchEndedWebhook = FaceitWebhook<FaceitMatchEndedWebhookPayload>;
