import { Event } from '@/models/types';

import ready from './ready';
import interactionCreate from './interactionCreate';
import guildRemove from './guildMemberRemove';

const events: Event<any>[] = [...ready, ...interactionCreate, ...guildRemove];

export default events;
