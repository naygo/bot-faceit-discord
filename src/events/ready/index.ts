import { Event } from '@/models/types';

import login from './login';
import faceitInfo from './faceit-info';

const events: Event<any>[] = [login, faceitInfo];

export default events;
