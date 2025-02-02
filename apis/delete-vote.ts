import BASE_URL from './api-config'

interface Ibody {
  password: string
}

interface IDeleteVoteProps {
  id: string
  body: Ibody
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

async function deleteVote({ id, body }: IDeleteVoteProps) {
  const response = await fetch(`${BASE_URL}/api/vote/${id}`, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body }),
  })

  return response
}

export default deleteVote
