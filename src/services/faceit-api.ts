import keys from '@/keys';
import {
  FaceitHubDetails,
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

export async function getHubDetails(): Promise<FaceitHubDetails> {
  const response = await faceitOpenClient.get(`/hubs/${keys.faceitHubId}`);

  return response.data;
}

export async function getHubPlayers(): Promise<Members[]> {
  const hubDetails = await getHubDetails();
  const timesToGetAll = Math.ceil(hubDetails.players_joined / 100);

  const players = await Promise.all(
    Array.from({ length: timesToGetAll }, (_, index) =>
      faceitOpenClient.get<FaceitHubMembers>(`/hubs/${keys.faceitHubId}/members`, {
        params: {
          limit: 100,
          offset: index * 100,
        },
      })
    )
  );

  return players.flatMap((player) => player.data.items);
}

export async function getHubLeaderboard(): Promise<FaceitLeaderboard> {
  const response = await faceitOpenClient.get(`/leaderboards/hubs/${keys.faceitHubId}/general`);
  return response.data;
}

export async function getPlayerOnHubLeaderboard(userId: string): Promise<Leaderboard> {
  const leaderboard = await getHubLeaderboard();
  const player = leaderboard.items.find((item) => item.player.user_id === userId);
  console.log(leaderboard.items);
  if (!player) throw new Error('Player not found on hub!');

  return player;
}
