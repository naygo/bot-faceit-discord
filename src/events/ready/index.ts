import { Event } from '@/models/types';

import login from './login';
import faceitInfo from './faceit-info';
import leaderboard from './leaderboard';

const events: Event<any>[] = [login, faceitInfo, leaderboard];

export default events;
