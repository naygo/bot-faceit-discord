import axios from 'axios';
import dotenv from 'dotenv';

import { FaceitHubMembers } from '@/models/interfaces/faceit-hub-members';
import { FaceitPlayerHistory } from '@/models/interfaces/faceit-player-history';
import { FaceitHubMatches } from '@/models/interfaces/faceit-hub-matches';
import { FaceitMatchInfo } from '@/models/interfaces/faceit-match';
import { hubId } from '@/utils/global-constants';
import { FaceitQueue } from '@/models/interfaces/faceit-queue';

dotenv.config();

const faceitOpenClient = axios.create({
  baseURL: 'https://open.faceit.com/data/v4',
  headers: {
    Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
  },
});

const faceitApiClient = axios.create({
  baseURL: 'https://api.faceit.com',
});

export async function getHubMatches(): Promise<FaceitHubMatches> {
  if (hubId === undefined) throw new Error('HubId not found! (hubId)');

  const response = await faceitOpenClient.get(`/hubs/${hubId}/matches`, {
    params: {
      limit: 10,
      offset: 0,
      type: 'ongoing',
    },
  });

  return response.data;
}

export async function getMatchInfo(matchId: string): Promise<FaceitMatchInfo> {
  const response = await faceitApiClient.get(`match/v2/match/${matchId}`);

  return response.data;
}

export async function getQueueInfo(): Promise<FaceitQueue> {
  const response = await faceitApiClient.get(`/queue/v1/queue/hub/${hubId}`);

  return response.data;
}

export async function getPlayersOnQueue(): Promise<number> {
  const queueInfo = await getQueueInfo();
  return queueInfo.payload[0].noOfPlayers;
}

export async function getPlayerHistoryOnHub(
  userId: string,
  params?: { limit?: number; offset?: number }
): Promise<FaceitPlayerHistory> {
  console.log('getPlayerHistoryOnHub', params)
  const response = await faceitOpenClient.get(`players/${userId}/history`, {
    params: {
      game: 'valorant',
      hub: hubId,
      limit: params?.limit || 10,
      offset: params?.offset || 0,
    },
  });

  return response.data;
}

export async function getHubPlayers(): Promise<FaceitHubMembers> {
  const response = await faceitOpenClient.get(`/hubs/${hubId}/members`);

  return response.data;
}
