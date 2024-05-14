import { useState } from 'react'

export interface IDate {
  startDate: Date | null
  endDate: Date | null
  time: Date | null
}

function useDatePicker() {
  const [date, setDate] = useState<IDate>({
    startDate: new Date(),
    endDate: new Date(),
    time: new Date(),
  })

  const handleDateChange = (newDate: IDate) => {
    setDate(newDate)
  }

  const formattedDate = (selectedDate: Date) => {
    if (!selectedDate) return '선택되지 않음'
    return `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
  }

  const selectedDate = () => {
    if (date.startDate || date.endDate) {
      let startDateString = '시작 날짜를 선택해주세요.'
      let endDateString = '선택해주세요'

      if (date.startDate) {
        startDateString = formattedDate(date.startDate)
      }

      if (date.endDate) {
        endDateString = formattedDate(date.endDate)
      }

      return `${startDateString} ~ ${endDateString}`
    }
    return '날짜 선택'
  }

  const selectedTime = () => {
    if (date.time) {
      const { time } = date
      const formattedHours = time.getHours().toString().padStart(2, '0')
      const formattedMinutes = time.getMinutes().toString().padStart(2, '0')

      return `${formattedHours}:${formattedMinutes} 까지`
    }

    return '시간 선택'
  }

  return {
    date,
    selectedDate,
    selectedTime,
    handleDateChange,
  }
}

export default useDatePicker
