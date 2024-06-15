'use client'

import { useEffect, useState } from 'react'
import deConvertToKoreanTime from 'utils/de-convert-to-korean-time'
import useModal from '@/hooks/use-modal'
import { IGetVoteResponse } from 'apis/get-vote'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { ButtonRound, Dialog, Header, ProgressBar, RevoteDialog } from '.'
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

  useEffect(() => {
    if (vote) {
      const periodEndDate = deConvertToKoreanTime(vote.periodEnd)
      const nowDate = new Date()
      const participantVoteId = localStorage.getItem('participantVoteId')
      setIsPossibleToVote(
        nowDate < periodEndDate && !participantVoteId?.includes(id),
      )
    }
  }, [id, vote])

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

  return (
    <>
      <Header>투표결과</Header>
      <div className="flex flex-col items-center">
        <div className="mt-62pxr flex w-full max-w-465pxr flex-col justify-center px-12pxr">
          <div className="mb-48pxr flex flex-col gap-20pxr">
            <h1 className="text-24pxr font-semibold leading-[36px] tracking-[0.12px]">
              {title}
            </h1>
            <div className="flex flex-col gap-10pxr">
              {contents?.map(({ id: contentId, content, selectedCounts }) => (
                <ProgressBar
                  key={contentId}
                  contentId={contentId}
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
