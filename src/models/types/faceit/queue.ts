export interface FaceitQueue {
  code: string;
  env: string;
  message: string;
  payload: Queue[];
  time: number;
  version: string;
}

export interface Queue {
  id: string;
  entityType: string;
  entityId: string;
  queueName: string;
  organizerId: string;
  minSkill: number;
  maxSkill: number;
  gameMetaRestrictions: any;
  maxSkillStdDev: any;
  maxEloRange: any;
  game: string;
  region: string;
  state: string;
  groupSimilar: boolean;
  captainSelection: string;
  rolesPriority: string[];
  open: boolean;
  paused: boolean;
  permissions: Permissions;
  userTags: any[];
  memberships: any;
  countryWhitelisted: any[];
  countryBlacklisted: any[];
  selection: any;
  premiumMatching: any;
  requeueSetting: any;
  noOfPlayers: number;
  skillFeedback: any;
  anticheatRequired: boolean;
  calculateElo: boolean;
  fbiManagement: boolean;
  adminTool: boolean;
  afkAction: any;
  queueCooldownSeconds: number;
  lastModified: string;
}
