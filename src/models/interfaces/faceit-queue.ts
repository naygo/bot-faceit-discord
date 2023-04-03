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
  joinType: JoinType;
  selection: any;
  premiumMatching: any;
  queueAlgorithm: QueueAlgorithm;
  matchConfiguration: MatchConfiguration;
  banSetting: BanSetting;
  requeueSetting: any;
  noOfPlayers: number;
  teamPick: TeamPick;
  checkIn: CheckIn;
  skillFeedback: any;
  anticheatRequired: boolean;
  calculateElo: boolean;
  fbiManagement: boolean;
  adminTool: boolean;
  manualResult: ManualResult;
  afkAction: any;
  preReqGate: PreReqGate;
  sortSelection: SortSelection;
  queueCooldownSeconds: number;
  lastModified: string;
}

export interface Permissions {
  playerGetList: string[];
  playerJoin: string[];
  playerRemove: string[];
  playerGetUserQueue: string[];
  queueEdit: string[];
  queueEditPermissions: string[];
  queueOpen: string[];
  queueDelete: string[];
  manageBans: string[];
}

export interface JoinType {
  maxParty: number;
  illegalPartySizes: any;
  solo: boolean;
  party: boolean;
  premade: boolean;
}

export interface QueueAlgorithm {
  id: string;
  algorithmId: string;
  geoLabel: GeoLabel;
  geoDescription: GeoDescription;
  algorithmParameters: AlgorithmParameters;
  algorithmInput: string[];
  roleBasedCaptainPick: boolean;
}

export interface GeoLabel {
  en: string;
}

export interface GeoDescription {
  en: string;
}

export interface AlgorithmParameters {
  band: Band;
  maxBand: any;
  bandExpandHz: any;
  stackingBalance: any;
}

export interface Band {
  value: number;
  geoLabel: GeoLabel2;
  geoDescription: GeoDescription2;
}

export interface GeoLabel2 {}

export interface GeoDescription2 {}

export interface MatchConfiguration {
  tree: Tree;
  overview: Overview;
  id: string;
}

export interface Tree {
  map: Map;
}

export interface Map {
  id: string;
  leaf_node: boolean;
  data_type: string;
  display: Display;
  optional: boolean;
  name: string;
  label: Label;
  flags: Flags;
  values: Values;
}

export interface Display {
  priority: number;
}

export interface Label {
  en: string;
}

export interface Flags {
  votable: boolean;
}

export interface Values {
  value: Value[];
  voting_steps: string[];
}

export interface Value {
  guid: string;
  name: string;
  game_map_id: string;
  class_name: string;
  image_sm: string;
  image_lg: string;
}

export interface Overview {
  description: Description;
  game: string;
  label: Label2;
  name: string;
  region: string;
  rounds: any;
  round: Round;
  detections: Detections;
  spectators: boolean;
  best_of: any;
  client_best_of: any;
  elo_mode: string;
  expire_seconds: number;
  flexible_factions: boolean;
  group_id: any;
  grouping_stats: string;
  max_players: number;
  min_players: number;
  room_states: any;
  team_size: number;
  time_to_connect: number;
  time_out_select_random: boolean;
  organizer_id: string;
  elo_type: string;
  match_configuration_type: MatchConfigurationType;
  match_finished_type: MatchFinishedType;
  game_type: string;
}

export interface Description {
  en: string;
}

export interface Label2 {
  en: string;
}

export interface Round {
  label: Label3;
  id: string;
  type: string;
  to_play: number;
  to_win: number;
  best_of_value: any;
}

export interface Label3 {
  en: string;
}

export interface Detections {
  afk: boolean;
  leavers: boolean;
}

export interface MatchConfigurationType {
  value: string;
  label: Label4;
}

export interface Label4 {
  en: string;
}

export interface MatchFinishedType {
  value: string;
  label: Label5;
}

export interface Label5 {
  en: string;
}

export interface BanSetting {
  noAccept: NoAccept;
  noPick: NoPick;
  noShow: NoShow;
  leaver: Leaver;
}

export interface NoAccept {
  enabled: boolean;
  banLength: number;
}

export interface NoPick {
  enabled: boolean;
  banLength: number;
}

export interface NoShow {
  enabled: boolean;
  banLength: number;
}

export interface Leaver {
  enabled: boolean;
  banLength: number;
}

export interface TeamPick {
  expire: number;
  order: string[];
  onPickFailed: string;
}

export interface CheckIn {
  time: number;
}

export interface ManualResult {
  timeout: number;
  onTimeout: string;
}

export interface PreReqGate {
  type: string;
  id: any;
}

export interface SortSelection {
  source: string;
  rankingSource: any;
  roleSource: any;
}
