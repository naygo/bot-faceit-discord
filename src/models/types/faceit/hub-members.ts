export interface FaceitHubMembers {
  items: Members[]
  start: number
  end: number
}

export interface Members {
  user_id: string
  nickname: string
  avatar: string
  roles: string[]
  faceit_url: string
}
