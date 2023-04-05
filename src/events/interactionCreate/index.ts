import { Event } from '@/models/types';

import commands from './commands';
import playerHistory from './player-history';
import matchVoiceChannels from './match-voice-channels';

const events: Event<any>[] = [commands, playerHistory, matchVoiceChannels];

export default events;
