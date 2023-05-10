import { FaceitLeaderboard, Leaderboard } from '@/types/faceit/leaderboard';
import { faceitOpenClient } from './api';
import keys from '@/keys/env-keys';

export async function getHubLeaderboard(
  limit: number = 30,
  offset: number = 0
): Promise<FaceitLeaderboard> {
  const response = await faceitOpenClient.get(`/leaderboards/hubs/${keys.faceitHubId}/general`, {
    params: {
      offset,
      limit,
    },
  });
  return response.data;
}

export async function getPlayerOnHubLeaderboard(userId: string): Promise<Leaderboard> {
  const leaderboard = await getHubLeaderboard();
  const player = leaderboard.items.find((item) => item.player.user_id === userId);

  if (!player) throw new Error('Player not found on hub!');

  return player;
}
