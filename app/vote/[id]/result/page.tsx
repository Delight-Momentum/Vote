'use client'

import ButtonRound from '@/components/button-round'
import Header from '@/components/header'
import ProgressBar from '@/components/progress-bar'
import getVote from 'apis/getVote'
import defaultVote from 'constants/vote-default-value'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IOneVote } from 'types/voteType'

function ResultPage() {
  const [vote, setVote] = useState<IOneVote>(defaultVote)
  const { id } = useParams()

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const result = await getVote(Number(id))
        setVote(result)
      } catch (error) {
        console.error('fetch에 실패했습니다.', error)
      }
    }

    fetchVoteData()
  }, [id])
  const { title, participantCounts, contents } = vote
  return (
    <>
      <Header>투표결과</Header>
      <div className="mt-62pxr flex flex-col items-center">
        <div className="mt-62pxr flex h-320pxr w-465pxr flex-col justify-center">
          <div className="mb-48pxr flex flex-col gap-20pxr">
            <h1 className="text-24pxr font-semibold leading-[36px] tracking-[0.12px]">
              {title}
            </h1>
            <div className="flex flex-col gap-10pxr">
              {contents?.map((content) => (
                <ProgressBar
                  key={content.id}
                  contentId={content.id}
                  voteItem={content.content}
                  choiceCount={content.selectedCounts}
                  participantCounts={participantCounts}
                />
              ))}
            </div>
            <span className="flex justify-end text-14pxr leading-[21px] tracking-[0.5px] text-[#999999]">
              총 {participantCounts}명 참여
            </span>
          </div>
          <ButtonRound variant="primary" size="lg">
            결과 공유하기
          </ButtonRound>
        </div>
      </div>
    </>
  )
}

export default ResultPage
