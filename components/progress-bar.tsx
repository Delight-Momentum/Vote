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
    const getSelectedVoteContentsString = localStorage.getItem(
      'selectedVoteContents',
    )
    const getSelectedVoteContents = getSelectedVoteContentsString
      ? JSON.parse(getSelectedVoteContentsString)
      : []

    if (getSelectedVoteContents.length === 0) return false

    return getSelectedVoteContents.includes(contentId)
  }

  return (
    <div className="relative h-56pxr w-full" data-cy="progressBar">
      <progress
        className={`custom-progress h-full w-full overflow-hidden rounded-lg ${selected() ? 'custom-progress-selected' : ''}`}
        value={value}
        max="100"
      />
      <span
        className={`absolute left-24pxr top-1/2 -translate-y-1/2 text-16pxr font-semibold ${selected() ? 'text-primary300' : 'text-[#999999]'}`}
      >
        {voteItem}
      </span>
      <span
        className={`absolute right-16pxr top-1/2 -translate-y-1/2 text-16pxr font-semibold ${selected() ? 'text-primary300' : 'text-[#999999]'}`}
      >
        {value}%
      </span>
    </div>
  )
}

export default ProgressBar
