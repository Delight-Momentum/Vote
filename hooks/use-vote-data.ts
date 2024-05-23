import { useEffect, useState } from 'react'
import getVote, { IGetVoteResponse } from 'apis/get-vote'
import { useRouter } from 'next/navigation'

function useVoteData(id: string) {
  const [voteData, setVoteData] = useState<IGetVoteResponse>()
  const router = useRouter()

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const response = await getVote({ id: id as string })

        if (response.status === 404) {
          alert('존재하지 않는 투표입니다.')
          router.push('/')
          return
        }

        const res: IGetVoteResponse = await response.json()
        setVoteData(res)
      } catch (error) {
        console.error('Error fetching vote data:', error)
      }
    }

    fetchVoteData()
  }, [id, router])

  return voteData
}

export default useVoteData
