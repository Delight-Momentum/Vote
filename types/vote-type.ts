export interface IOneVote {
  id: number
  title: string
  periodStart: Date
  periodEnd: Date
  method: 'one' | 'multiple'
  participantNameMethod: 'public' | 'private'
  hostName: string
  createdAt: Date
  updatedAt: Date
  participantCounts: number
  contents: IVoteContent[]
}

export interface IVoteContent {
  id: number
  voteId: number
  content: string
  createdAt: Date
  updatedAt: Date
  selectedCounts: number
  participantNames: string[]
}
