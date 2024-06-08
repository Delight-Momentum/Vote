interface IVoteSelectDescriptionProps {
  voteMethod: 'one' | 'multiple' | undefined
  periodEnd: Date | undefined
}

function VoteSelectDescription({
  voteMethod,
  periodEnd,
}: IVoteSelectDescriptionProps) {
  const voteMethodText = voteMethod === 'one' ? '1개만' : '여러 개'
  const currentDate = new Date()
  const timeDifference =
    periodEnd && periodEnd.getTime() - currentDate.getTime()

  const days =
    timeDifference && Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const hours =
    timeDifference &&
    Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  return (
    <ul className="flex list-inside list-disc flex-col gap-5pxr">
      <li className="text-[#616161]" data-cy="voteMethodDescription">
        이 투표는 {voteMethodText} 선택이 가능해요.
      </li>
      <li className="text-[#616161]" data-cy="voteRemainingPeriod">
        약{' '}
        <span className="font-semibold text-primary300 underline underline-offset-4">
          {days}일 {hours}시간 후에 투표가 종료
        </span>
        됩니다.
      </li>
    </ul>
  )
}

export default VoteSelectDescription
