import BASE_URL from './api-config'

export interface IGetVoteResponse {
  id: number
  title: string
  periodStart: string
  periodEnd: string
  method: 'one' | 'multiple'
  participantNameMethod: 'public' | 'private'
  hostName: string
  createdAt: Date
  updatedAt: Date
  participantCounts: number
  contents?: VoteContent[]
}

export interface VoteContent {
  id: number
  voteId: number
  content: string
  createdAt: Date
  updatedAt: Date
  selectedCounts: number
  participantNames: string[]
}

async function getVote({
  id,
  revalidate,
  cache,
}: {
  id: string
  revalidate?: number
  cache?: RequestCache
}) {
  const response = await fetch(`${BASE_URL}/api/votelist/${id}`, {
    method: 'GET',
    next: { revalidate, tags: ['vote'] },
    cache,
  })

  return response
}

export default getVote
