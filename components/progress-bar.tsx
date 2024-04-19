interface ProgressBarProps {
  voteItem: string
  choiceCount: number
  participantsCount: number
}

function ProgressBar({
  voteItem,
  choiceCount,
  participantsCount,
}: ProgressBarProps) {
  const value = Math.trunc((choiceCount / participantsCount) * 100)

  return (
    <div className="relative h-56pxr w-full">
      <progress
        className="custom-progress h-full w-full overflow-hidden rounded-lg"
        value={value}
        max="100"
      />
      <span className="absolute left-24pxr top-1/2 -translate-y-1/2 text-16pxr font-normal text-[#616161]">
        {voteItem}
      </span>
      <span className="absolute right-20pxr top-1/2 -translate-y-1/2 text-16pxr font-normal text-[#616161]">
        {value}%
      </span>
    </div>
  )
}

export default ProgressBar
