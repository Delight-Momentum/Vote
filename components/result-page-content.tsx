'use client'

/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useRef, useState } from 'react'
import deConvertToKoreanTime from 'utils/de-convert-to-korean-time'
import useModal from '@/hooks/use-modal'
import { IGetVoteResponse } from 'apis/get-vote'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {
  ButtonRound,
  Dialog,
  Header,
  ProgressBar,
  RevoteDialog,
  Tooltip,
} from '.'
import ButtonShare from './button-share'

interface ResultPageContentProps {
  vote: IGetVoteResponse | undefined
  id: string
}

function ResultPageContent({ vote, id }: ResultPageContentProps) {
  const router = useRouter()
  const { isDialogOpen, setIsDialogOpen, dialogOutSideClick, dialogRef } =
    useModal()
  const [isPossibleToVote, setIsPossibleToVote] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    router.refresh()
  }, [router])

  useEffect(() => {
    if (vote) {
      const periodEndDate = deConvertToKoreanTime(vote.periodEnd)
      const nowDate = new Date()
      const participantVoteId = localStorage.getItem('participantVoteId')
      setIsPossibleToVote(
        nowDate < periodEndDate && !participantVoteId?.includes(id),
      )
    }
  }, [id, router, vote])

  if (!vote) {
    toast.error(
      <div>
        투표 결과를 찾을 수 없어요.
        <br />
        3초뒤 홈으로 이동할게요.
      </div>,
    )

    setTimeout(() => {
      router.push('/')
    }, 3000)

    return <Header>투표결과</Header>
  }

  const { title, contents, participantCounts } = vote
  const contentLength = contents?.length
  const [tooltip, setTooltip] = useState(Array(contentLength).fill(false))
  const handleClickProgress = (index?: number) => {
    setTooltip((prev) => prev.map((_, i) => i === index))
  }

  const handleClickOutside = (e: React.MouseEvent) => {
    if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
      setTooltip((prev) => prev.map(() => false))
    }
  }

  return (
    <>
      <Header>투표결과</Header>
      <div className="flex flex-col items-center" onClick={handleClickOutside}>
        <div className="mt-62pxr flex w-full max-w-465pxr flex-col justify-center px-12pxr">
          <div className="mb-48pxr flex flex-col gap-20pxr" ref={tooltipRef}>
            <h1 className="text-24pxr font-semibold leading-[36px] tracking-[0.12px]">
              {title}
            </h1>
            <div className="flex flex-col gap-10pxr">
              {contents?.map(
                (
                  { id: contentId, content, selectedCounts, participantNames },
                  index,
                ) => (
                  <div
                    className="relative"
                    key={contentId}
                    onClick={() => handleClickProgress(index)}
                  >
                    <ProgressBar
                      contentId={contentId}
                      voteItem={content}
                      choiceCount={selectedCounts}
                      participantCounts={participantCounts}
                    />
                    {tooltip[index] && (
                      <Tooltip
                        arrowPosition="left"
                        className="left-450pxr top-0pxr flex h-300pxr w-full flex-col items-center overflow-y-auto p-12pxr"
                      >
                        <p className="mb-12pxr w-full border-b border-primary200 text-center text-16pxr font-semibold text-primary300">
                          투표자
                        </p>
                        <div className="flex flex-col items-center justify-center gap-10pxr">
                          {participantNames.map((item, i) => (
                            <p key={i}>{item}</p>
                          ))}
                        </div>
                      </Tooltip>
                    )}
                  </div>
                ),
              )}
            </div>
            <span className="flex justify-end text-14pxr leading-[21px] tracking-[0.5px] text-[#999999]">
              총 {participantCounts}명 참여
            </span>
          </div>
          <div className="flex flex-col gap-16pxr">
            <ButtonShare
              id={id}
              title={title}
              contents={contents}
              data-cy="shareResultButton"
            />
            {isPossibleToVote && (
              <Link href={`/vote/${id}`} passHref>
                <ButtonRound variant="primary" size="lg">
                  투표 하러가기
                </ButtonRound>
              </Link>
            )}
            <ButtonRound
              variant="secondary"
              size="lg"
              onClick={() => setIsDialogOpen(true)}
              data-cy="revoteButton"
            >
              투표 기간 재설정
            </ButtonRound>
            <Dialog
              isOpen={isDialogOpen}
              dialogOutSideClick={dialogOutSideClick}
              dialogRef={dialogRef}
              className="h-291pxr max-w-488pxr p-12pxr"
              data-cy="revoteDialog"
            >
              <RevoteDialog
                voteId={id}
                onClose={() => setIsDialogOpen(false)}
              />
            </Dialog>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResultPageContent
