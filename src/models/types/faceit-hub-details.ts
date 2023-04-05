export interface FaceitHubDetails {
  avatar: string;
  background_image: string;
  chat_room_id: string;
  cover_image: string;
  description: string;
  faceit_url: string;
  game_data: GameData;
  game_id: string;
  hub_id: string;
  join_permission: string;
  max_skill_level: number;
  min_skill_level: number;
  name: string;
  organizer_data: OrganizerData;
  organizer_id: string;
  players_joined: number;
  region: string;
  rule_id: string;
}

interface GameData {
  assets: Assets;
  game_id: string;
  long_label: string;
  order: number;
  parent_game_id: string;
  platforms: string[];
  regions: string[];
  short_label: string;
}

interface Assets {
  cover: string;
  featured_img_l: string;
  featured_img_m: string;
  featured_img_s: string;
  flag_img_icon: string;
  flag_img_l: string;
  flag_img_m: string;
  flag_img_s: string;
  landing_page: string;
}

interface OrganizerData {
  avatar: string;
  cover: string;
  description: string;
  facebook: string;
  faceit_url: string;
  followers_count: number;
  name: string;
  organizer_id: string;
  twitch: string;
  twitter: string;
  type: string;
  vk: string;
  website: string;
  youtube: string;
}
