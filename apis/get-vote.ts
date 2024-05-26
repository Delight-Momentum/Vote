import BASE_URL from './api-config'

interface IGetVoteProps {
  id: string
}

export interface IGetVoteResponse {
  id: number
  title: string
  periodStart: string
  periodEnd: string
  method: 'one' | 'multiple' // 투표 방법: 하나 선택 또는 다중 선택
  participantNameMethod: 'public' | 'private' // 참가자 이름 공개 여부
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

async function getVote({ id }: IGetVoteProps) {
  const response = await fetch(`${BASE_URL}/api/votelist/${id}`, {
    method: 'GET',
  })

  return response
}

export default getVote
