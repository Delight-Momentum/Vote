import ButtonRound from '@/components/button-round'
import Header from '@/components/header'
import ProgressBar from '@/components/progress-bar'
import React from 'react'

function ResultPage() {
  return (
    <>
      <Header>투표결과</Header>
      <div className="flex flex-col items-center">
        <div className="mt-62pxr flex h-320pxr w-465pxr flex-col justify-center">
          <div className="mb-48pxr flex flex-col gap-20pxr">
            <h1 className="text-24pxr font-semibold leading-[36px] tracking-[0.12px]">
              가장 최고의 아이돌은?
            </h1>
            <div className="flex flex-col gap-10pxr">
              <ProgressBar
                contentId={1}
                voteItem="BTS"
                choiceCount={300}
                participantCounts={523}
              />
              <ProgressBar
                contentId={2}
                voteItem="빅뱅"
                choiceCount={223}
                participantCounts={523}
              />
            </div>
            <span className="flex justify-end text-14pxr leading-[21px] tracking-[0.5px] text-[#999999]">
              총 523명 참여
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
