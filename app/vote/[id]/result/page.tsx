import getVote, { IGetVoteResponse } from 'apis/get-vote'
import { Metadata } from 'next'
import ResultPageContent from '@/components/result-page-content'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params
  try {
    const vote: IGetVoteResponse = await (await getVote({ id })).json()
    return {
      title: vote.title,
    }
  } catch (error) {
    console.error('Error fetching vote data:', error)
    return {
      title: '투표 결과',
    }
  }
}

async function ResultPage({ params }: Props) {
  const { id } = params
  try {
    const voteResponse = await getVote({ id, cache: 'no-cache' })
    if (voteResponse.status === 404) {
      return <ResultPageContent vote={undefined} id={id} />
    }

    const vote: IGetVoteResponse = await voteResponse.json()

    return <ResultPageContent vote={vote} id={id} />
  } catch (error) {
    console.error('Error fetching vote data:', error)
    return <ResultPageContent vote={undefined} id={id} />
  }
}

export default ResultPage
