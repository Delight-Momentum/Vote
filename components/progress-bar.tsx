'use client'

import { useEffect, useState } from 'react'

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
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const getLocalStorageVotedContentIds =
        localStorage.getItem('VotedContentIds')
      const parsedParticipantVoteIds = getLocalStorageVotedContentIds
        ? JSON.parse(getLocalStorageVotedContentIds)
        : []
      if (parsedParticipantVoteIds.includes(contentId.toString())) {
        setIsSelected(true)
      }
    }
  }, [contentId])

  const contentCountPercent = Math.trunc(
    (choiceCount / participantCounts) * 100,
  )
  const value = Number.isNaN(contentCountPercent) ? 0 : contentCountPercent
  const selectedContentTextClass = isSelected
    ? 'text-primary300'
    : 'text-[#999999]'

  return (
    <div
      className="relative flex min-h-56pxr w-full overflow-hidden rounded-lg bg-white"
      data-cy="progressBar"
    >
      <hr
        style={{ width: `${value}%` }}
        className={`absolute -top-1pxr left-0pxr h-[101%] ${isSelected ? 'bg-primary200' : 'bg-[#e8e8e9]'}`}
      />
      <div className="z-10 flex w-full cursor-pointer items-center justify-between gap-10pxr py-16pxr pl-24pxr pr-16pxr">
        <p
          className={`break-all text-16pxr font-semibold  text-[#999999] ${selectedContentTextClass}`}
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
