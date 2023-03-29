import dotenv from 'dotenv'
dotenv.config()

export const botToken = process.env.BOT_TOKEN

export const testChannelId = process.env.TESTS_CHANNEL_ID
export const hubId = process.env.HUB_ID
export const lobbyCategoryId = process.env.LOBBY_CATEGORY_ID
export const positionCreateChannels = process.env.POSITION_CREATE_CHANNELS

export const matchesMock = [
  ["team_1", "team_2"],
  ["team_3", "team_4"],
  ["team_5", "team_6"],
  ["team_7", "team_8"],
]


