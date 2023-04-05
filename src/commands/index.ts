import { commands } from '@/utils';

import ping from './ping';
import playerHistory from './player-history';

import buttonMatchVoiceChannels from './button-match-voice-channels';

export default commands(ping, playerHistory, buttonMatchVoiceChannels);
