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
import useDatePicker from '@/hooks/use-date-picker'
import { useForm } from 'react-hook-form'
import postVote from 'apis/post-vote'
import { useRouter } from 'next/navigation'
import convertToKoreanTime from 'utils/convert-to-korean-time'

export interface ICreateVoteForm extends Record<string, string | string[]> {
  voteTitle: string
  voteContents: string[]
  voteHost: string
  password: string
}

function CreateVoteForm() {
  const route = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateVoteForm>()
  const { radioValues, handleValueChange } = useRadio()
  const { date, selectedDate, selectedTime, handleDateChange } = useDatePicker()

  const onSubmit = async (data: ICreateVoteForm) => {
    if (!date.startDate || !date.endDate || !date.time) return
    const startDateKoreanTime = convertToKoreanTime(date.startDate)
    const endDateKoreanTime = convertToKoreanTime(date.endDate)
    const endTimeKoreanTime = convertToKoreanTime(date.time)

    const formattedEndDate = endDateKoreanTime
      .toISOString()
      .split('T')[0]
      .concat('T', endTimeKoreanTime.toISOString().split('T')[1])

    const voteData = {
      title: data.voteTitle,
      contents: data.voteContents,
      periodStart: startDateKoreanTime.toISOString(),
      periodEnd: formattedEndDate,
      method: radioValues.voteMethod,
      participantNameMethod: radioValues.participantNameMethod,
      hostName: data.voteHost,
      password: data.password,
    }

    const response = await postVote({ body: voteData })
    const res = await response.json()

    const getLocalStorage = localStorage.getItem('voteId')
    localStorage.setItem(
      'voteId',
      JSON.stringify([
        ...(getLocalStorage ? JSON.parse(getLocalStorage) : []),
        res.id,
      ]),
    )

    route.push(`/vote/${res.id}`)
  }

  return (
    <form
      className="flex w-full max-w-465pxr flex-col gap-48pxr px-12pxr"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-40pxr">
        <VoteTitle register={register} errors={errors} />
        <VoteContents register={register} errors={errors} />
        <VotePeriod
          date={date}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          handleDateChange={handleDateChange}
        />
        <VoteSelectRadio
          type="voteMethod"
          handleValueChange={handleValueChange}
        />
        <VoteSelectRadio
          type="voteParticipantMethod"
          handleValueChange={handleValueChange}
        />
        <div className="flex gap-15pxr">
          <VoteSmallInput type="voteHost" register={register} errors={errors} />
          <VoteSmallInput type="password" register={register} errors={errors} />
        </div>
      </div>
      <ButtonRound
        type="submit"
        variant="primary"
        size="lg"
        data-cy="createVoteButton"
      >
        투표 등록하기
      </ButtonRound>
    </form>
  )
}

export default CreateVoteForm
