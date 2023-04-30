import { FaceitQueue } from '@/models/types';
import { faceitApiClient } from './api';
import keys from '@/keys/env-keys';

export async function getQueueInfo(): Promise<FaceitQueue> {
  const response = await faceitApiClient.get(`/queue/v1/queue/hub/${keys.faceitHubId}`);

  return response.data;
}

export async function getPlayersOnQueue(): Promise<number> {
  const queueInfo = await getQueueInfo();
  return queueInfo.payload[0].noOfPlayers;
}
