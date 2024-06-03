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
import postCreateVote from 'apis/post-create-vote'
import { useRouter } from 'next/navigation'
import convertToKoreanTime from 'utils/convert-to-korean-time'
import { toast } from 'react-toastify'

export interface ICreateVoteForm extends Record<string, string | string[]> {
  voteTitle: string
  voteContents: string[]
  voteHost: string
  password: string
}

function CreateVoteForm() {
  const router = useRouter()
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

    const response = await postCreateVote({ body: voteData })
    const res = await response.json()
    if (response.status === 400) {
      toast.error(
        <div>
          {res.message}
          <br />
          계속해서 문제가 발생하면 관리자에게 문의해주세요.
        </div>,
      )
      return
    }

    const getLocalStorageCreatedVoteId = localStorage.getItem('createdVoteId')
    localStorage.setItem(
      'createdVoteId',
      JSON.stringify([
        ...(getLocalStorageCreatedVoteId
          ? JSON.parse(getLocalStorageCreatedVoteId)
          : []),
        String(res.id),
      ]),
    )

    router.push(`/vote/${res.id}`)
  }

  const pattern = {
    value: /^[a-zA-Z0-9]{6,12}$/,
    message: '비밀번호는 6 ~ 12자의 영문 대소문자와 숫자로 입력해주세요.',
  }

  return (
    <form
      className="flex w-full max-w-465pxr flex-col gap-48pxr"
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
          radioType="create"
          method="vote"
          handleValueChange={handleValueChange}
        />
        <VoteSelectRadio
          radioType="create"
          method="voteParticipant"
          handleValueChange={handleValueChange}
        />
        <div className="flex gap-15pxr">
          <VoteSmallInput type="voteHost" register={register} errors={errors} />
          <VoteSmallInput
            type="password"
            register={register}
            errors={errors}
            pattern={pattern}
          />
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
