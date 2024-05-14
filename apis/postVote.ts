interface Ibody {
  title: string
  contents: string[]
  periodStart: string
  periodEnd: string
  method: string
  participantsName: string
  hostName: string
  password: string
}

interface IPostVoteProps {
  body: Ibody
}

async function postVote({ body }: IPostVoteProps) {
  try {
    const response = await fetch('http://13.125.250.153:3000/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
    })

    return await response.json()
  } catch (error) {
    return error
  }
}

export default postVote
