'use client'

import ButtonRound from '@/components/button-round'
import Dialog from '@/components/dialog'
import RevoteDialog from '@/components/dialog-revote'
import Header from '@/components/header'
import ProgressBar from '@/components/progress-bar'
import useModal from '@/hooks/use-modal'
import getVote, { IGetVoteResponse } from 'apis/get-vote'
import defaultVote from 'constants/vote-default-value'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function ResultPage() {
  const [vote, setVote] = useState<IGetVoteResponse>(defaultVote)
  const { isDialogOpen, setIsDialogOpen, dialogOutSideClick, dialogRef } =
    useModal()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const result = await getVote({ id })
        result.json().then((value) => setVote(value))
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('fetch에 실패했습니다.', error)
      }
    }

    fetchVoteData()
  }, [id])
  const { title, participantCounts, contents } = vote

  const handleShareToKakao = () => {
    const { Kakao, location } = window
    Kakao.Share.sendScrap({
      requestUrl: location.href,
    })
  }

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
              {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
              {contents?.map(({ id, content, selectedCounts }) => (
                <ProgressBar
                  key={id}
                  contentId={id}
                  voteItem={content}
                  choiceCount={selectedCounts}
                  participantCounts={participantCounts}
                />
              ))}
            </div>
            <span className="flex justify-end text-14pxr leading-[21px] tracking-[0.5px] text-[#999999]">
              총 {participantCounts}명 참여
            </span>
          </div>
          <div className="flex flex-col gap-16pxr">
            <ButtonRound
              variant="primary"
              size="lg"
              onClick={handleShareToKakao}
              data-cy="shareResultButton"
            >
              결과 공유하기
            </ButtonRound>
            <ButtonRound
              variant="secondary"
              size="lg"
              onClick={() => setIsDialogOpen(!isDialogOpen)}
              data-cy="revoteButton"
            >
              재투표 하기
            </ButtonRound>
            <Dialog
              isOpen={isDialogOpen}
              dialogOutSideClick={dialogOutSideClick}
              dialogRef={dialogRef}
              className="h-291pxr max-w-488pxr p-12pxr"
            >
              <RevoteDialog
                voteId="74"
                onClose={() => setIsDialogOpen(false)}
              />
            </Dialog>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResultPage
