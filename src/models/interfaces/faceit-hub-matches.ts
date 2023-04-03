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
  teams: Teams;
  voting: Voting;
  calculate_elo: boolean;
  started_at: number;
  chat_room_id: string;
  best_of: number;
  status: string;
  faceit_url: string;
}

export interface Teams {
  faction1: Faction;
  faction2: Faction;
}

export interface Faction {
  faction_id: string;
  leader: string;
  avatar: string;
  roster: Roster[];
  substituted: boolean;
  name: string;
  type: string;
}

export interface Roster {
  player_id: string;
  nickname: string;
  avatar: string;
  membership: string;
  game_player_id: string;
  game_player_name: string;
  game_skill_level: number;
  anticheat_required: boolean;
}

export interface Roster2 {
  player_id: string;
  nickname: string;
  avatar: string;
  membership: string;
  game_player_id: string;
  game_player_name: string;
  game_skill_level: number;
  anticheat_required: boolean;
}

export interface Voting {
  voted_entity_types: string[];
  map: Map;
}

export interface Map {
  entities: Entity[];
  pick: string[];
}

export interface Entity {
  game_map_id: string;
  guid: string;
  image_lg: string;
  image_sm: string;
  name: string;
  class_name: string;
}
