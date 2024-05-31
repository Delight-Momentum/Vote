'use client'

import ButtonRound from '@/components/button-round'
import Dialog from '@/components/dialog'
import RevoteDialog from '@/components/dialog-revote'
import Header from '@/components/header'
import ProgressBar from '@/components/progress-bar'
import useModal from '@/hooks/use-modal'
import getVote, { IGetVoteResponse } from 'apis/get-vote'
import defaultVote from 'constants/vote-default-value'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import convertToKoreanTime from 'utils/convert-to-korean-time'
import handleShareToKakao from 'utils/share-kakao'

function ResultPage() {
  const [vote, setVote] = useState<IGetVoteResponse>(defaultVote)
  const { isDialogOpen, setIsDialogOpen, dialogOutSideClick, dialogRef } =
    useModal()
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

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

  useEffect(() => {
    router.prefetch(`/vote/${id}`)
  }, [router])

  const { title, participantCounts, contents, periodEnd } = vote
  const periodEndDate = new Date(periodEnd).getTime()
  const date = new Date()
  const now = convertToKoreanTime(date).getTime()
  const isPossibleToVote =
    !(now > periodEndDate) &&
    !localStorage.getItem('participantVoteId')?.includes(id)

  const kakaoShareArgs = {
    id,
    title,
    contents,
    url: `/vote/${id}/result`,
  }

  return (
    <>
      <Header>투표결과</Header>
      <div className="flex  flex-col items-center">
        <div className="mt-62pxr flex w-375pxr flex-col justify-center sm:w-465pxr">
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
              onClick={() => handleShareToKakao(kakaoShareArgs)}
              data-cy="shareResultButton"
            >
              결과 공유하기
            </ButtonRound>
            {isPossibleToVote ? (
              <ButtonRound
                variant="primary"
                size="lg"
                onClick={() => router.push(`/vote/${id}`)}
              >
                투표 하러가기
              </ButtonRound>
            ) : null}
            <ButtonRound
              variant="secondary"
              size="lg"
              onClick={() => setIsDialogOpen(!isDialogOpen)}
              data-cy="revoteButton"
            >
              투표 기간 재설정
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
