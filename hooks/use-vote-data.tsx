'use client'

import { useEffect, useState } from 'react'
import getVote, { IGetVoteResponse } from 'apis/get-vote'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

function useVoteData(id: string) {
  const [voteData, setVoteData] = useState<IGetVoteResponse>()
  const router = useRouter()

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const response = await getVote({ id: id as string })

        if (response.status === 404) {
          toast.warn(
            <div>
              존재하지 않는 투표에요.
              <br />
              홈으로 이동할게요.
            </div>,
          )
          router.push('/')
          return
        }

        const res: IGetVoteResponse = await response.json()
        setVoteData(res)
      } catch (error) {
        toast.error(
          <div>
            투표 데이터를 불러오지못했어요.
            <br />
            계속해서 문제가 발생하면 관리자에게 문의해주세요.
            <p>{String(error)}</p>
          </div>,
        )
      }
    }

    fetchVoteData()
  }, [id, router])

  return voteData
}

export default useVoteData
