export interface FaceitWebhook<T> {
  transaction_id: string;
  event: string;
  event_id: string;
  third_party_id: string;
  app_id: string;
  timestamp: string;
  retry_count: number;
  version: number;
  payload: T;
}
