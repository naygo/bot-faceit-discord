export interface FaceitMatchInfo {
  code: string;
  env: string;
  message: string;
  payload: MatchInfo;
  time: number;
  version: string;
}

export interface MatchInfo {
  id: string;
  type: string;
  game: string;
  region: string;
  organizerId: string;
  allowOngoingJoin: boolean;
  anticheatRequired: boolean;
  anticheatMode: string;
  calculateElo: boolean;
  skillFeedback: string;
  afkAction: string;
  fbiManagement: boolean;
  adminTool: boolean;
  checkIn: CheckIn;
  state: string;
  status: string;
  round: number;
  states: string[];
  teams: MatchTeams;
  spectators: any[];
  results: MatchResult[];
  startedAt: string;
  configuredAt: string;
  finishedAt: string;
  timeToConnect: number;
  version: number;
  createdAt: string;
  lastModified: string;
}

export interface CheckIn {
  time: number;
  totalCheckedIn: number;
  totalPlayers: number;
  endTime: string;
  checkedIn: boolean;
}

export interface MatchTeams {
  faction1: MatchFaction;
  faction2: MatchFaction;
}

export interface MatchFaction {
  id: string;
  name: string;
  avatar: string;
  leader: string;
  roster: MatchRoster[];
  substituted: boolean;
}

export interface MatchRoster {
  id: string;
  nickname: string;
  avatar: string;
  gameId: string;
  gameName: string;
  memberships: string[];
  elo: number;
  gameSkillLevel: number;
  acReq: boolean;
  partyId: string;
}

export interface MatchResult {
  ascScore: boolean;
  leavers: any[];
  afk: any[];
  factions: {
    faction1: {
      score: number;
    };
    faction2: {
      score: number;
    };
  };
}
