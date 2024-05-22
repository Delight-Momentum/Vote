import BASE_URL from './api-config'

interface Ibody {
  title: string
  contents: string[]
  periodStart: string
  periodEnd: string
  method: string
  participantNameMethod: string
  hostName: string
  password: string
}

interface IPostVoteProps {
  body: Ibody
}

async function postCreateVote({ body }: IPostVoteProps) {
  const response = await fetch(`${BASE_URL}/api/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body }),
  })

  return response
}

export default postCreateVote
