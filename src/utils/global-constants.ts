import { Matches } from '@/models/interfaces/matches'
import dotenv from 'dotenv'
dotenv.config()

export const botToken = process.env.BOT_TOKEN

export const testChannelId = process.env.TESTS_CHANNEL_ID
export const hubId = process.env.HUB_ID
export const lobbyCategoryId = process.env.LOBBY_CATEGORY_ID
export const positionCreateChannels = process.env.POSITION_CREATE_CHANNELS

export const matchesMock: Matches[] = [
  {
    matchId: 'match_1',
    teams: {
      faction1: 'team_1',
      faction2: 'team_2',
    }
  },
  {
    matchId: 'match_2',
    teams: {
      faction1: 'team_3',
      faction2: 'team_4',
    }
  },
  {
    matchId: 'match_3',
    teams: {
      faction1: 'team_5',
      faction2: 'team_6',
    }
  },
]