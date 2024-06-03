'use client'

import {
  ButtonRound,
  DeleteDialog,
  Dialog,
  VoteParticipantName,
  VoteSelectContent,
  VoteSelectDescription,
} from '@/components/index'
import useModal from '@/hooks/use-modal'
import useSelectedContent from '@/hooks/use-selected-content'
import useVoteData from '@/hooks/use-vote-data'
import postDoVote from 'apis/post-do-vote'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import deConvertToKoreanTime from 'utils/de-convert-to-korean-time'
import handleShareToKakao from 'utils/share-kakao'

export interface IVoteForm extends Record<string, string> {
  participantName: string
}

function VoteForm() {
  const router = useRouter()
  const { id } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVoteForm>()
  const voteData = useVoteData(id as string)
  const { selectedContent, handleChangeSelectedContent } = useSelectedContent({
    method: voteData?.method,
  })
  const { isDialogOpen, setIsDialogOpen, dialogOutSideClick, dialogRef } =
    useModal()

  const onSubmit = async (data: IVoteForm) => {
    try {
      const getLocalStorageCreatedVoteId = localStorage.getItem('createdVoteId')
      const parsedCreatedVoteIds = getLocalStorageCreatedVoteId
        ? JSON.parse(getLocalStorageCreatedVoteId)
        : []

      if (parsedCreatedVoteIds.includes(id)) {
        toast.warn('자신이 생성한 투표는 투표할 수 없어요.')
        return
      }

      const getLocalStorageParticipantVoteId =
        localStorage.getItem('participantVoteId')
      const parsedParticipantVoteIds = getLocalStorageParticipantVoteId
        ? JSON.parse(getLocalStorageParticipantVoteId)
        : []

      if (parsedParticipantVoteIds.includes(id)) {
        toast.warn('이미 투표한 내역이 있어요. 결과 페이지로 이동할게요.')
        router.push(`/vote/${id}/result`)
        return
      }

      if (selectedContent.length === 0) {
        toast.info('투표할 항목을 선택해 주세요.')
        return
      }

      await Promise.all(
        selectedContent.map((contentId) =>
          postDoVote({
            voteId: id as string,
            contentId,
            body:
              voteData?.participantNameMethod === 'public'
                ? {
                    participantName: data.participantName,
                  }
                : {},
          }),
        ),
      )

      localStorage.setItem(
        'participantVoteId',
        JSON.stringify([...parsedParticipantVoteIds, id]),
      )

      router.push(`/vote/${id}/result`)
    } catch (error) {
      toast.error(
        <div>
          투표에 실패했어요.
          <br />
          계속해서 문제가 발생하면 관리자에게 문의해주세요.
          <p>{String(error)}</p>
        </div>,
      )
    }
  }

  useEffect(() => {
    if (
      voteData?.periodEnd &&
      new Date(deConvertToKoreanTime(voteData.periodEnd)) < new Date()
    ) {
      toast.info(
        <div>
          종료된 투표에요.
          <br />
          결과 페이지로 이동할게요.
        </div>,
      )
      router.push(`/vote/${id}/result`)
    }
  }, [id, router, voteData?.periodEnd])

  const kakaoShareOption = {
    id,
    title: voteData?.title,
    contents: voteData?.contents,
    url: `/vote/${id}`,
  }

  return (
    <form
      className="flex w-465pxr flex-col gap-48pxr"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-40pxr">
        <div className="flex flex-col gap-16pxr">
          <VoteSelectContent
            title={voteData?.title}
            contents={voteData?.contents}
            onValueChange={handleChangeSelectedContent}
            voteMethod={voteData?.method}
          />
          <VoteSelectDescription
            voteMethod={voteData?.method}
            periodEnd={
              voteData?.periodEnd
                ? new Date(deConvertToKoreanTime(voteData.periodEnd))
                : undefined
            }
          />
        </div>
        {voteData?.participantNameMethod === 'public' && (
          <VoteParticipantName register={register} errors={errors} />
        )}
      </div>
      <ButtonRound
        type="submit"
        variant="primary"
        size="lg"
        data-cy="voteButton"
      >
        투표 하기
      </ButtonRound>
      <div className="flex gap-20pxr">
        <ButtonRound
          variant="primary"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          data-cy="voteDeleteButton"
        >
          삭제하기
        </ButtonRound>
        <Link href={`/vote/${id}/edit`} className="w-full">
          <ButtonRound variant="primary" size="sm" data-cy="voteEditButton">
            수정하기
          </ButtonRound>
        </Link>
        <Dialog
          isOpen={isDialogOpen}
          dialogOutSideClick={dialogOutSideClick}
          dialogRef={dialogRef}
        >
          <DeleteDialog
            voteId={id as string}
            onClose={() => setIsDialogOpen(false)}
          />
        </Dialog>
      </div>
      <ButtonRound
        variant="secondary"
        size="lg"
        onClick={() => handleShareToKakao(kakaoShareOption)}
      >
        투표 공유하기
      </ButtonRound>
    </form>
  )
}

export default VoteForm
