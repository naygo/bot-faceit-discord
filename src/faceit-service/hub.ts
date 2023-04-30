import keys from '@/keys/env-keys';
import { faceitOpenClient } from './api';
import { FaceitHubDetails, FaceitHubMembers, Members } from '@/models/types';

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
