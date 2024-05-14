'use client'

import {
  ButtonRound,
  VoteContents,
  VotePeriod,
  VoteSelectRadio,
  VoteSmallInput,
  VoteTitle,
} from '@/components/index'
import useRadio from '@/hooks/useRadio'
import useDatePicker from '@/hooks/useDatePicker'
import { useForm } from 'react-hook-form'
import postVote from 'apis/postVote'
import { useRouter } from 'next/navigation'

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

  function convertToKoreanTime(prevDate: Date) {
    const offset = new Date().getTimezoneOffset() * 60000
    return new Date(prevDate.getTime() - offset)
  }

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
      participantsName: radioValues.participant,
      hostName: data.voteHost,
      password: data.password,
    }

    const response = await postVote({ body: voteData })

    const getLocalStorage = localStorage.getItem('voteId')
    localStorage.setItem(
      'voteId',
      JSON.stringify([
        ...(getLocalStorage ? JSON.parse(getLocalStorage) : []),
        response.id,
      ]),
    )
    route.push(`/vote/${response.id}`)
  }

  return (
    <form
      className="flex w-465pxr flex-col gap-48pxr"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-40pxr">
        <VoteTitle register={register} errors={errors} />
        <VoteContents register={register} errors={errors} />
        <VotePeriod
          date={date}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          handleDateChange={handleDateChange}
        />
        <VoteSelectRadio
          type="voteMethed"
          handleValueChange={handleValueChange}
        />
        <VoteSelectRadio
          type="voteParticipant"
          handleValueChange={handleValueChange}
        />
        <div className="flex gap-15pxr">
          <VoteSmallInput type="voteHost" register={register} errors={errors} />
          <VoteSmallInput type="password" register={register} errors={errors} />
        </div>
      </div>
      <ButtonRound type="submit" variant="primary" size="lg">
        투표 등록하기
      </ButtonRound>
    </form>
  )
}

export default CreateVoteForm
