import BASE_URL from './api-config'

interface Ibody {
  participantName?: string
}

interface IPostVoteProps {
  voteId: string
  contentId: string
  body: Ibody | false
}

async function postDoVote({ voteId, contentId, body }: IPostVoteProps) {
  const response = await fetch(`${BASE_URL}/api/vote/${voteId}/${contentId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify({ ...body }) : undefined,
  })

  return response
}

export default postDoVote
