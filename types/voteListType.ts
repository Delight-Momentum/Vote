export interface IVote {
  id: number
  title: string
  period_start: Date
  period_end: Date
  method: 'one' | 'multiple'
  participants_name: 'private' | 'public'
  host_name: string
  password: string
  createdAt: Date
  updatedAt: Date
  participantCounts: number
  isClosed: boolean
  contents: string[]
}

export interface IVoteList {
  total: number
  votes: IVote[]
}
