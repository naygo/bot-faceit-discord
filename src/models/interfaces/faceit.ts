export interface FaceitHubMatches {
  items: FaceitHubMatch[]
}

export interface FaceitHubMatch {
  match_id: string
  teams: {
    faction1: {
      name: string
    }
    faction2: {
      name: string
    }
  }
}