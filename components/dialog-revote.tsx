'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useDatePicker from '@/hooks/use-date-picker'
import convertToKoreanTime from 'utils/convert-to-korean-time'
import putVote from 'apis/put-vote'
import PopoverDatePicker from './popover-date-picker'

interface IProps {
  voteId?: string
  onClose?: () => void
}

function DialogRevote({ voteId, onClose }: IProps) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)

  const { date, selectedDate, selectedTime, handleDateChange } = useDatePicker()

  const handlePasswordChange = (passwordValue: string) => {
    setPassword(passwordValue)

    if (isError) {
      setIsError(false)
    }
  }

  const handleReVote = async () => {
    if (!date.startDate || !date.endDate || !date.time) return
    const endDateKoreanTime = convertToKoreanTime(date.endDate)
    const endTimeKoreanTime = convertToKoreanTime(date.time)
    const formattedEndDate = endDateKoreanTime
      .toISOString()
      .split('T')[0]
      .concat('T', endTimeKoreanTime.toISOString().split('T')[1])

    const voteBody = {
      periodEnd: formattedEndDate,
      password,
    }
    try {
      if (!voteId) return
      if (!password || password === '') {
        setIsError(true)
        return
      }
      const response = await putVote({
        voteId,
        body: voteBody,
      })

      if (response.status === 401) {
        setIsError(true)
        alert('비밀번호가 일치하지않아요')
        return
      }

      if (response.status === 500) {
        alert('서버 오류입니다. 다시 시도해주세요.')
        return
      }

      alert('재투표합니다.')
      router.push(`/vote/${voteId}/result`)
    } catch (error) {
      console.error('Error deleting vote:', error)
    }
  }
  return (
    <div className="flex flex-col justify-center ">
      <div className="flex flex-col gap-15pxr px-25pxr pt-25pxr">
        <h1 className="text-22pxr font-semibold">재투표를 할까요?</h1>
        <h2 className="text-14pxr font-semibold text-[#6E6E6E]">
          기존 내용은 그대로 유지하고 새롭게 투표를 받을 수 있어요.
        </h2>
      </div>
      <div className="flex h-100pxr w-full flex-col items-center justify-between rounded-lg bg-white px-24pxr py-10pxr sm:h-56pxr sm:flex-row">
        <PopoverDatePicker
          type="date"
          date={date}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onDateChange={handleDateChange}
        />
        <div className="h-1pxr w-full bg-[#b0b0b0] sm:h-35pxr sm:w-1pxr" />
        <PopoverDatePicker
          type="time"
          date={date}
          selectedTime={selectedTime}
          onDateChange={handleDateChange}
        />
      </div>
      <input
        type="password"
        className={`flex flex-1 items-center rounded-lg bg-[#f2f2f2] px-24pxr py-16pxr ${isError ? 'border border-red-500' : ''}`}
        placeholder="비밀번호를 입력해주세요"
        data-cy="deleteDialogInput"
        onChange={(e) => handlePasswordChange(e.target.value)}
        autoComplete="off"
      />
      <div className="mt-8pxr flex justify-end gap-10pxr">
        <button
          type="button"
          className="p-10pxr font-semibold text-[#6e6e6e] hover:font-bold"
          data-cy="deleteDialogButton"
          onClick={() => onClose && onClose()}
        >
          취소
        </button>
        <button
          className="p-10pxr font-semibold text-primary300 hover:font-bold"
          type="button"
          onClick={handleReVote}
        >
          재투표하기
        </button>
      </div>
    </div>
  )
}

export default DialogRevote
