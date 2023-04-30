import { FaceitHubMatches, FaceitMatchInfo } from '@/models/types';
import { faceitApiClient, faceitOpenClient } from './api';
import keys from '@/keys/env-keys';

export async function getMatchInfo(matchId: string): Promise<FaceitMatchInfo> {
  const response = await faceitApiClient.get(`match/v2/match/${matchId}`);

  return response.data;
}

export async function getHubMatches(): Promise<FaceitHubMatches> {
  const response = await faceitOpenClient.get(`/hubs/${keys.faceitHubId}/matches`, {
    params: {
      limit: 10,
      offset: 0,
      type: 'ongoing',
    },
  });

  return response.data;
}
