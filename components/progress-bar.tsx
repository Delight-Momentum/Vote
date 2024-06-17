'use client'

interface ProgressBarProps {
  contentId: number
  voteItem: string
  choiceCount: number
  participantCounts: number
}

function ProgressBar({
  contentId,
  voteItem,
  choiceCount,
  participantCounts,
}: ProgressBarProps) {
  const contentCountPercent = Math.trunc(
    (choiceCount / participantCounts) * 100,
  )
  const value = Number.isNaN(contentCountPercent) ? 0 : contentCountPercent

  const selected = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined')
      return false

    const getSelectedVoteContentsString = localStorage.getItem(
      'selectedVoteContents',
    )
    const getSelectedVoteContents = getSelectedVoteContentsString
      ? JSON.parse(getSelectedVoteContentsString)
      : []

    if (getSelectedVoteContents.length === 0) return false

    return getSelectedVoteContents.includes(contentId)
  }

  const selectedContentTextClass = selected()
    ? 'text-gray-100'
    : 'text-[#999999]'

  return (
    <div
      className="relative flex min-h-56pxr w-full overflow-hidden rounded-lg bg-white"
      data-cy="progressBar"
    >
      <hr
        style={{ width: `${value}%` }}
        className={`absolute -top-1pxr left-0pxr h-[101%] ${selected() ? 'bg-primary300' : 'bg-[#e5e5e58c]'}`}
      />
      <div className="z-10 flex w-full items-center justify-between gap-10pxr py-16pxr pl-24pxr pr-16pxr">
        <p
          className={`break-all text-16pxr font-semibold ${selectedContentTextClass}`}
        >
          {voteItem}
        </p>
        <p className={`text-16pxr font-semibold ${selectedContentTextClass}`}>
          {value}%
        </p>
      </div>
    </div>
  )
}

export default ProgressBar
