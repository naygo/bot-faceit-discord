export interface FaceitLeaderboard {
  end: number;
  items: Leaderboard[];
  leaderboard: Leaderboard;
  start: number;
}

export interface Leaderboard {
  current_streak: number;
  draw: number;
  lost: number;
  played: number;
  player: Player;
  points: number;
  position: number;
  win_rate: number;
  won: number;
}

export interface Player {
  avatar: string;
  country: string;
  faceit_url: string;
  membership_type: string;
  memberships: string[];
  nickname: string;
  skill_level: number;
  user_id: string;
}

export interface Leaderboard {
  competition_id: string;
  competition_type: string;
  end_date: number;
  game_id: string;
  group: number;
  leaderboard_id: string;
  leaderboard_mode: string;
  leaderboard_name: string;
  leaderboard_type: string;
  min_matches: number;
  points_per_draw: number;
  points_per_loss: number;
  points_per_win: number;
  points_type: string;
  ranking_boost: number;
  ranking_type: string;
  region: string;
  round: number;
  season: number;
  start_date: number;
  starting_points: number;
  status: string;
}
