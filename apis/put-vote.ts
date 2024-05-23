import BASE_URL from './api-config'

interface Ibody {
  periodEnd: string
  password: string
}

interface IPutVoteProps {
  voteId: string
  body: Ibody
}

async function putVote({ voteId, body }: IPutVoteProps) {
  const response = await fetch(`${BASE_URL}/api/vote/${voteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body }),
  })

  return response
}

export default putVote
