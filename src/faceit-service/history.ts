import { FaceitPlayerHistory } from '@/models/types';
import { faceitOpenClient } from './api';
import keys from '@/keys/env-keys';

export async function getPlayerHistoryOnHub(
  userId: string,
  params?: { limit?: number; offset?: number }
): Promise<FaceitPlayerHistory> {
  const response = await faceitOpenClient.get(`players/${userId}/history`, {
    params: {
      game: 'valorant',
      hub: keys.faceitHubId,
      limit: params?.limit || 10,
      offset: params?.offset || 0,
    },
  });

  return response.data;
}
