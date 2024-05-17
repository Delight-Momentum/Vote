const filterPassedTime = (time: Date) => {
  const currentDate = new Date()
  const selectedDate = new Date(time)

  // 오늘 날짜의 연월일을 가져옵니다.
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()

  // 선택한 날짜의 연월일을 오늘 날짜로 설정합니다.
  selectedDate.setFullYear(currentYear)
  selectedDate.setMonth(currentMonth)
  selectedDate.setDate(currentDay)

  // 선택한 날짜와 현재 시간의 차이를 계산하여 반환합니다.
  return currentDate.getTime() < selectedDate.getTime()
}

export default filterPassedTime
