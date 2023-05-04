import { Event } from '@/models/types';

import commands from './commands';
import playerHistory from './player-history';

const events: Event<any>[] = [commands, playerHistory];

export default events;
