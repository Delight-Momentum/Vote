interface Ibody {
  periodEnd: string
  password: string
}

interface IPutVoteProps {
  voteId: string
  body: Ibody
}

async function putVote({ voteId, body }: IPutVoteProps) {
  const response = await fetch(
    `http://13.125.250.153:3000/api/vote/${voteId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
    },
  )

  return response
}

export default putVote
