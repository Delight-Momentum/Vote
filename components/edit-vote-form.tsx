'use client'

import {
  ButtonRound,
  VoteContents,
  VotePeriod,
  VoteSelectRadio,
  VoteSmallInput,
  VoteTitle,
} from '@/components/index'
import useRadio from '@/hooks/use-radio'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import useDatePicker from '@/hooks/use-date-picker'
import convertToKoreanTime from 'utils/convert-to-korean-time'
import deConvertToKoreanTime from 'utils/de-convert-to-korean-time'
import { useEffect } from 'react'
import putVote from 'apis/put-vote'
import { toast } from 'react-toastify'
import useVoteData from '@/hooks/use-vote-data'

export interface IEditVoteForm extends Record<string, string | string[]> {
  password: string
}

function EditVoteForm() {
  const router = useRouter()
  const params = useParams()
  const { id } = params

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditVoteForm>()
  const voteData = useVoteData(id as string)
  const { handleValueChange } = useRadio()
  const { date, selectedDate, selectedTime, handleDateChange } = useDatePicker()

  const onSubmit = async (data: IEditVoteForm) => {
    try {
      if (!date.startDate || !date.endDate || !date.time) return

      const endDateKoreanTime = convertToKoreanTime(date.endDate)
      const endTimeKoreanTime = convertToKoreanTime(date.time)

      const formattedEndDate = endDateKoreanTime
        .toISOString()
        .split('T')[0]
        .concat('T', endTimeKoreanTime.toISOString().split('T')[1])

      const voteBody = {
        periodEnd: formattedEndDate,
        password: data.password,
      }

      const response = await putVote({ voteId: id as string, body: voteBody })

      if (response.status === 401) {
        toast.error('비밀번호가 일치하지 않습니다.')
        return
      }

      router.push(`/vote/${id}`)
    } catch (error) {
      toast.error(
        <div>
          수정에 실패 했어요.
          <br />
          계속해서 문제가 발생하면 관리자에게 문의해주세요.
          <p>{String(error)}</p>
        </div>,
      )
    }
  }

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        if (voteData) {
          const startDateKoreanTime = deConvertToKoreanTime(
            voteData.periodStart,
          )
          const endKoreanTime = deConvertToKoreanTime(voteData.periodEnd)

          handleDateChange({
            startDate: startDateKoreanTime,
            endDate: endKoreanTime,
            time: endKoreanTime,
          })
        }
      } catch (error) {
        toast.error(
          <div>
            투표 수정에 실패했어요.
            <br />
            계속해서 문제가 발생하면 관리자에게 문의해주세요.
            <p>{String(error)}</p>
          </div>,
        )
      }
    }

    fetchVoteData()
  }, [handleDateChange, id, router, voteData])

  return (
    <form
      className="flex w-full max-w-465pxr flex-col gap-48pxr"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-40pxr">
        <VoteTitle value={voteData?.title} />
        <VoteContents values={voteData?.contents} />
        <VotePeriod
          date={date}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          handleDateChange={handleDateChange}
        />
        <VoteSelectRadio
          radioType="edit"
          method="vote"
          handleValueChange={handleValueChange}
          value={voteData?.method}
        />
        <VoteSelectRadio
          radioType="edit"
          method="voteParticipant"
          handleValueChange={handleValueChange}
          value={voteData?.participantNameMethod}
        />
        <div className="flex gap-15pxr">
          <VoteSmallInput type="voteHost" value={voteData?.hostName} />
          <VoteSmallInput type="password" register={register} errors={errors} />
        </div>
      </div>
      <ButtonRound
        type="submit"
        variant="primary"
        size="lg"
        data-cy="editVoteButton"
      >
        수정완료
      </ButtonRound>
    </form>
  )
}

export default EditVoteForm
