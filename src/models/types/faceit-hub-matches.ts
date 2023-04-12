// `/hubs/${keys.faceitHubId}/matches`
export interface FaceitHubMatches {
  items: HubMatch[];
  start: number;
  end: number;
}

export interface HubMatch {
  match_id: string;
  version: number;
  game: string;
  region: string;
  competition_id: string;
  competition_type: string;
  competition_name: string;
  organizer_id: string;
  teams: HubMatchTeams;
  voting: HubMatchVoting;
  calculate_elo: boolean;
  started_at: number;
  chat_room_id: string;
  best_of: number;
  status: string;
  faceit_url: string;
}

export interface HubMatchTeams {
  faction1: HubMatchFaction;
  faction2: HubMatchFaction;
}

export interface HubMatchFaction {
  faction_id: string;
  leader: string;
  avatar: string;
  roster: HubMatchRoster[];
  substituted: boolean;
  name: string;
  type: string;
}

export interface HubMatchRoster {
  player_id: string;
  nickname: string;
  avatar: string;
  membership: string;
  game_player_id: string;
  game_player_name: string;
  game_skill_level: number;
  anticheat_required: boolean;
}

export interface HubMatchVoting {
  voted_entity_types: string[];
  map: HubMatchMap;
}

export interface HubMatchMap {
  entities: HubMatchEntity[];
  pick: string[];
}

export interface HubMatchEntity {
  game_map_id: string;
  guid: string;
  image_lg: string;
  image_sm: string;
  name: string;
  class_name: string;
}
