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
  entity: Entity;
  entityCustom: EntityCustom;
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
  teams: Teams;
  spectators: any[];
  matchCustom: MatchCustom;
  voting: Voting;
  maps: Map3[];
  locations: Location3[];
  summaryResults: SummaryResults;
  results: Result[];
  startedAt: string;
  configuredAt: string;
  finishedAt: string;
  timeToConnect: number;
  version: number;
  createdAt: string;
  lastModified: string;
  parties: Party[];
}

export interface Entity {
  type: string;
  id: string;
  name: string;
}

export interface EntityCustom {
  effectiveRanking: number;
  matcherMatchId: string;
  parties: Parties;
  partyQueueDurations: PartyQueueDurations;
  queueId: string;
}

export interface Parties {
  '8271d2e3-4350-4fd4-8405-512489e31a9b': string[];
  'b6f453a4-052a-424f-9317-af65cc3f3ec1': string[];
}

export interface PartyQueueDurations {
  '8271d2e3-4350-4fd4-8405-512489e31a9b': number;
  'b6f453a4-052a-424f-9317-af65cc3f3ec1': number;
}

export interface CheckIn {
  time: number;
  totalCheckedIn: number;
  totalPlayers: number;
  endTime: string;
  checkedIn: boolean;
}

export interface Teams {
  faction1: Faction1;
  faction2: Faction2;
}

export interface Faction1 {
  id: string;
  name: string;
  avatar: string;
  leader: string;
  roster: Roster[];
  substituted: boolean;
}

export interface Roster {
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

export interface Faction2 {
  id: string;
  name: string;
  avatar: string;
  leader: string;
  roster: Roster2[];
  substituted: boolean;
}

export interface Roster2 {
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

export interface MatchCustom {
  id: string;
  overview: Overview;
  tree: Tree;
}

export interface Overview {
  description: Description;
  game: string;
  label: Label;
  name: string;
  region: string;
  round: Round;
  detections: Detections;
  spectators: boolean;
  elo_mode: string;
  expire_seconds: number;
  grouping_stats: string;
  max_players: number;
  min_players: number;
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

export interface Label {
  en: string;
}

export interface Round {
  label: Label2;
  id: string;
  type: string;
  to_play: number;
  to_win: number;
}

export interface Label2 {
  en: string;
}

export interface Detections {
  afk: boolean;
  leavers: boolean;
}

export interface MatchConfigurationType {
  value: string;
  label: Label3;
}

export interface Label3 {
  en: string;
}

export interface MatchFinishedType {
  value: string;
  label: Label4;
}

export interface Label4 {
  en: string;
}

export interface Tree {
  game_config: GameConfig;
  location: Location;
  map: Map;
  server_config: ServerConfig;
  spectators: Spectators;
  stream: Stream;
}

export interface GameConfig {
  data_type: string;
  flags: Flags;
  id: string;
  leaf_node: boolean;
  values: Values;
}

export interface Flags {}

export interface Values {
  value: string;
}

export interface Location {
  data_type: string;
  display: Display;
  flags: Flags2;
  id: string;
  label: Label5;
  leaf_node: boolean;
  name: string;
  values: Values2;
}

export interface Display {
  priority: number;
}

export interface Flags2 {
  votable: boolean;
}

export interface Label5 {
  en: string;
}

export interface Values2 {
  value: Value[];
  voting_steps: string[];
}

export interface Value {
  class_name: string;
  game_location_id: string;
  guid: string;
  image_lg: string;
  image_sm: string;
  name: string;
}

export interface Map {
  data_type: string;
  display: Display2;
  flags: Flags3;
  id: string;
  label: Label6;
  leaf_node: boolean;
  name: string;
  values: Values3;
}

export interface Display2 {
  priority: number;
}

export interface Flags3 {
  votable: boolean;
}

export interface Label6 {
  en: string;
}

export interface Values3 {
  value: Value2[];
  voting_steps: string[];
}

export interface Value2 {
  class_name: string;
  game_map_id: string;
  guid: string;
  image_lg: string;
  image_sm: string;
  name: string;
}

export interface ServerConfig {
  children: Children;
  id: string;
}

export interface Children {
  bots: Bots;
  botsDifficulty: BotsDifficulty;
  deadTalk: DeadTalk;
  freezeTime: FreezeTime;
  friendlyFire: FriendlyFire;
  gameMode: GameMode;
  gameType: GameType;
  knifeRound: KnifeRound;
  maxRounds: MaxRounds;
  overtimeHalftimePausetimer: OvertimeHalftimePausetimer;
  overtimeMaxRounds: OvertimeMaxRounds;
  overtimeStartMoney: OvertimeStartMoney;
  pause: Pause;
  pauseTime: PauseTime;
  startMoney: StartMoney;
  startOnReady: StartOnReady;
  timeToConnect: TimeToConnect;
  timeoutMax: TimeoutMax;
  timeoutTime: TimeoutTime;
  tvDelay: TvDelay;
  voteKick: VoteKick;
}

export interface Bots {
  data_type: string;
  flags: Flags4;
  id: string;
  leaf_node: boolean;
  values: Values4;
}

export interface Flags4 {}

export interface Values4 {
  value: boolean;
}

export interface BotsDifficulty {
  data_type: string;
  flags: Flags5;
  id: string;
  leaf_node: boolean;
  values: Values5;
}

export interface Flags5 {}

export interface Values5 {
  max_value: number;
  min_value: number;
  value: number;
}

export interface DeadTalk {
  data_type: string;
  flags: Flags6;
  id: string;
  leaf_node: boolean;
  values: Values6;
}

export interface Flags6 {}

export interface Values6 {
  value: boolean;
}

export interface FreezeTime {
  data_type: string;
  flags: Flags7;
  id: string;
  leaf_node: boolean;
  values: Values7;
}

export interface Flags7 {}

export interface Values7 {
  value: number;
}

export interface FriendlyFire {
  data_type: string;
  flags: Flags8;
  id: string;
  leaf_node: boolean;
  values: Values8;
}

export interface Flags8 {}

export interface Values8 {
  value: boolean;
}

export interface GameMode {
  data_type: string;
  flags: Flags9;
  id: string;
  leaf_node: boolean;
  values: Values9;
}

export interface Flags9 {}

export interface Values9 {
  value: number;
}

export interface GameType {
  data_type: string;
  flags: Flags10;
  id: string;
  leaf_node: boolean;
  values: Values10;
}

export interface Flags10 {}

export interface Values10 {
  max_value: number;
  min_value: number;
  value: number;
}

export interface KnifeRound {
  data_type: string;
  flags: Flags11;
  id: string;
  leaf_node: boolean;
  values: Values11;
}

export interface Flags11 {}

export interface Values11 {
  value: boolean;
}

export interface MaxRounds {
  data_type: string;
  display: Display3;
  flags: Flags12;
  id: string;
  label: Label7;
  leaf_node: boolean;
  name: string;
  values: Values12;
}

export interface Display3 {
  priority: number;
}

export interface Flags12 {}

export interface Label7 {
  en: string;
}

export interface Values12 {
  max_value: number;
  min_value: number;
  value: number;
}

export interface OvertimeHalftimePausetimer {
  data_type: string;
  flags: Flags13;
  id: string;
  leaf_node: boolean;
  values: Values13;
}

export interface Flags13 {}

export interface Values13 {
  value: boolean;
}

export interface OvertimeMaxRounds {
  data_type: string;
  flags: Flags14;
  id: string;
  leaf_node: boolean;
  values: Values14;
}

export interface Flags14 {}

export interface Values14 {
  max_value: number;
  min_value: number;
  value: number;
}

export interface OvertimeStartMoney {
  data_type: string;
  flags: Flags15;
  id: string;
  leaf_node: boolean;
  values: Values15;
}

export interface Flags15 {}

export interface Values15 {
  value: number;
}

export interface Pause {
  data_type: string;
  flags: Flags16;
  id: string;
  leaf_node: boolean;
  values: Values16;
}

export interface Flags16 {}

export interface Values16 {
  value: boolean;
}

export interface PauseTime {
  data_type: string;
  flags: Flags17;
  id: string;
  leaf_node: boolean;
  values: Values17;
}

export interface Flags17 {}

export interface Values17 {
  max_value: number;
  min_value: number;
  value: number;
}

export interface StartMoney {
  data_type: string;
  flags: Flags18;
  id: string;
  leaf_node: boolean;
  values: Values18;
}

export interface Flags18 {}

export interface Values18 {
  max_value: number;
  min_value: number;
  value: number;
}

export interface StartOnReady {
  data_type: string;
  flags: Flags19;
  id: string;
  leaf_node: boolean;
  values: Values19;
}

export interface Flags19 {}

export interface Values19 {
  value: boolean;
}

export interface TimeToConnect {
  data_type: string;
  flags: Flags20;
  id: string;
  leaf_node: boolean;
  link: string;
  optional: boolean;
  values: Values20;
}

export interface Flags20 {}

export interface Values20 {
  max_value: number;
  min_value: number;
  value: number;
}

export interface TimeoutMax {
  data_type: string;
  flags: Flags21;
  id: string;
  leaf_node: boolean;
  values: Values21;
}

export interface Flags21 {}

export interface Values21 {
  max_value: number;
  min_value: number;
  value: number;
}

export interface TimeoutTime {
  data_type: string;
  flags: Flags22;
  id: string;
  leaf_node: boolean;
  values: Values22;
}

export interface Flags22 {}

export interface Values22 {
  max_value: number;
  min_value: number;
  value: number;
}

export interface TvDelay {
  data_type: string;
  flags: Flags23;
  id: string;
  leaf_node: boolean;
  values: Values23;
}

export interface Flags23 {}

export interface Values23 {
  max_value: number;
  min_value: number;
  value: number;
}

export interface VoteKick {
  data_type: string;
  flags: Flags24;
  id: string;
  leaf_node: boolean;
  values: Values24;
}

export interface Flags24 {}

export interface Values24 {
  value: boolean;
}

export interface Spectators {
  allow_empty: boolean;
  data_type: string;
  flags: Flags25;
  id: string;
  leaf_node: boolean;
  optional: boolean;
  values: Values25;
}

export interface Flags25 {}

export interface Values25 {
  value: any[];
}

export interface Stream {
  data_type: string;
  flags: Flags26;
  id: string;
  leaf_node: boolean;
  values: Values26;
}

export interface Flags26 {}

export interface Values26 {
  value: boolean;
}

export interface Voting {
  voted_entity_types: string[];
  location: Location2;
  map: Map2;
}

export interface Location2 {
  entities: Entity2[];
  pick: string[];
}

export interface Entity2 {
  class_name: string;
  game_location_id: string;
  guid: string;
  image_lg: string;
  image_sm: string;
  name: string;
}

export interface Map2 {
  entities: Entity3[];
  pick: string[];
}

export interface Entity3 {
  class_name: string;
  game_map_id: string;
  guid: string;
  image_lg: string;
  image_sm: string;
  name: string;
}

export interface Map3 {
  class_name: string;
  game_map_id: string;
  guid: string;
  image_lg: string;
  image_sm: string;
  name: string;
}

export interface Location3 {
  class_name: string;
  game_location_id: string;
  guid: string;
  image_lg: string;
  image_sm: string;
  name: string;
}

export interface SummaryResults {
  ascScore: boolean;
  leavers: any[];
  afk: any[];
  factions: Factions;
}

export interface Factions {
  faction1: Faction12;
  faction2: Faction22;
}

export interface Faction12 {
  score: number;
}

export interface Faction22 {
  score: number;
}

export interface Result {
  ascScore: boolean;
  leavers: any[];
  afk: any[];
  factions: Factions2;
}

export interface Factions2 {
  faction1: Faction13;
  faction2: Faction23;
}

export interface Faction13 {
  score: number;
}

export interface Faction23 {
  score: number;
}

export interface Party {
  partyId: string;
  users: string[];
}
