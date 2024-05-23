function deConvertToKoreanTime(prevDate: string) {
  const offset = new Date().getTimezoneOffset() * 60000

  return new Date(new Date(prevDate).getTime() + offset)
}

export default deConvertToKoreanTime
