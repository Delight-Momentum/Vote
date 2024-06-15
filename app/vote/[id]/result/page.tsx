import getVote, { IGetVoteResponse } from 'apis/get-vote'
import { Metadata } from 'next'
import ResultPageContent from '@/components/result-page-content'

interface Props {
  params: { id: string }
}

const errorParamsData = {
  metadata: {
    title: '투표 결과',
  },
  vote: undefined,
}

async function generateMetadata({
  params,
}: Props): Promise<{ metadata: Metadata; vote: IGetVoteResponse | undefined }> {
  const { id } = params

  try {
    const voteResponse = await getVote({ id })

    if (voteResponse.status !== 200) {
      return errorParamsData
    }

    const vote = await voteResponse.json()

    return {
      metadata: {
        title: vote.title,
      },
      vote,
    }
  } catch (error) {
    return errorParamsData
  }
}

async function ResultPage({ params }: Props) {
  const { vote: initialVote } = await generateMetadata({ params })
  const { id } = params

  return <ResultPageContent vote={initialVote} id={id} />
}

export default ResultPage
