import keys from '@/keys';
import {
  FaceitHubMatches,
  FaceitHubMembers,
  FaceitMatchInfo,
  FaceitPlayerHistory,
  FaceitQueue,
  Members,
} from '@/models/types';
import { FaceitLeaderboard, Leaderboard } from '@/models/types/faceit-leaderboard';
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
  const response = await faceitOpenClient.get(`/hubs/${keys.faceitHubId}/matches`, {
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
  const response = await faceitApiClient.get(`/queue/v1/queue/hub/${keys.faceitHubId}`);

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

export async function getHubPlayers(): Promise<FaceitHubMembers> {
  const response = await faceitOpenClient.get(`/hubs/${keys.faceitHubId}/members`);

  return response.data;
}

export async function getPlayerOnHub(nickname: string): Promise<Members> {
  const players = await getHubPlayers();
  const player = players.items.find((player) => player.nickname === nickname);

  if (!player) throw new Error('Player not found on hub!');

  return player;
}

export async function getHubLeaderboard(): Promise<FaceitLeaderboard> {
  const response = await faceitOpenClient.get(`/leaderboards/hubs/${keys.faceitHubId}/general`);
  return response.data;
}

export async function getPlayerOnHubLeaderboard(userId: string): Promise<Leaderboard> {
  const leaderboard = await getHubLeaderboard();
  const player = leaderboard.items.find((item) => item.player.user_id === userId);
  console.log(leaderboard.items)
  if (!player) throw new Error('Player not found on hub!');

  return player;
}
