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
import useVoteData from '@/hooks/use-vote-data'

export interface ICreateVoteForm extends Record<string, string | string[]> {
  voteTitle: string
  voteContents: string[]
  voteHost: string
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
  } = useForm<ICreateVoteForm>()
  const voteData = useVoteData(id as string)
  const { handleValueChange } = useRadio()
  const { date, selectedDate, selectedTime, handleDateChange } = useDatePicker()

  const onSubmit = async (data: ICreateVoteForm) => {
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
        alert('비밀번호가 일치하지 않습니다.')
        return
      }

      router.push(`/vote/${id}`)
    } catch (error) {
      console.error('Error editing vote:', error)
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
        console.error('Error fetching vote data:', error)
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
          type="voteMethod"
          handleValueChange={handleValueChange}
          value={voteData?.method}
        />
        <VoteSelectRadio
          type="voteParticipantMethod"
          handleValueChange={handleValueChange}
          value={voteData?.participantNameMethod}
        />
        <div className="flex gap-15pxr">
          <VoteSmallInput type="voteHost" value={voteData?.hostName} />
          <VoteSmallInput type="password" register={register} errors={errors} />
        </div>
      </div>
      <div className="flex gap-20pxr">
        <ButtonRound variant="primary" size="sm">
          재투표 하기
        </ButtonRound>
        <ButtonRound
          type="submit"
          variant="primary"
          size="sm"
          data-cy="editVoteButton"
        >
          수정완료
        </ButtonRound>
      </div>
    </form>
  )
}

export default EditVoteForm
