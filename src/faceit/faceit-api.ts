import { FaceitHubMatches } from '@/models/interfaces/hub-matches';
import { FaceitMatchInfo } from '@/models/interfaces/match';
import { FaceitQueue } from '@/models/interfaces/queue';
import { hubId } from '@/utils/global-constants';
import axios from 'axios';
import dotenv from 'dotenv';

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
