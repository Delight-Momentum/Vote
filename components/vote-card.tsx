import Link from 'next/link'
import React from 'react'

interface Props {
  isClosed: boolean
  voteTitle: string
  voteItems: string[]
  participantsCount: number
  participateUrl: string
  participateResultUrl: string
}

function VoteCard({
  isClosed,
  voteTitle,
  voteItems,
  participantsCount,
  participateUrl,
  participateResultUrl,
}: Props) {
  const MAX_VOTE_ITEMS = 3
  const sliceVoteItems = voteItems?.slice(0, MAX_VOTE_ITEMS)

  return (
    <Link href={`${isClosed ? participateResultUrl : participateUrl}`}>
      <div
        data-cy="voteCard"
        className="relative h-376pxr w-320pxr rounded-2xl bg-white px-25pxr pb-25pxr pt-17pxr"
      >
        {isClosed && (
          <div className="absolute left-0pxr top-0pxr z-50 flex h-full w-full flex-col items-center justify-center gap-10pxr rounded-2xl bg-[rgba(11,11,11,0.60)]">
            <p className="text-center text-16pxr font-medium text-white">
              투표가 종료됐어요
              <br />
              <span className="text-18pxr">결과를 확인해보세요!</span>
            </p>
          </div>
        )}
        <div className="w-282pxr pb-17pxr">
          <h2
            data-cy="voteTitle"
            className="overflow-hidden text-ellipsis whitespace-nowrap text-22pxr font-medium"
          >
            {voteTitle}
          </h2>
        </div>
        <div className="relative flex h-239pxr flex-col gap-15pxr pb-25pxr pt-10pxr">
          {sliceVoteItems?.map((item, index) => (
            <div
              className={`relative flex items-center justify-between overflow-hidden rounded-md bg-[#eBeBeB] py-17pxr pl-25pxr pr-13pxr ${isClosed ? 'bg-[#e7e7e8]' : ''}`}
              key={`${item}-${index + 1}`}
            >
              <div
                className={`absolute left-0pxr top-0pxr h-full w-1/2 rounded-r-md bg-primary200 ${isClosed ? 'bg-[#999999]' : ''}`}
              />
              <p className="z-10 w-190pxr overflow-hidden text-ellipsis text-nowrap font-[#49454f] text-16pxr font-normal">
                {item}
              </p>
              <p className="font-[#49454f] text-16pxr font-normal">??%</p>
            </div>
          ))}
          <div className="absolute bottom-25pxr h-58pxr w-270pxr bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_100%)]" />
          {voteItems?.length > MAX_VOTE_ITEMS && (
            <div className="absolute bottom-6pxr left-0pxr z-10 flex w-full items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_100%)]">
              <p className="text-14pxr font-normal text-[#49454F]">
                +{voteItems.length - MAX_VOTE_ITEMS}개의 선택지가 더 있어요
              </p>
            </div>
          )}
        </div>
        <div className="flex h-40pxr items-end pt-5pxr">
          <p
            className={`${isClosed && 'flex h-full w-full items-center justify-center !text-[#999999]'} text-14pxr font-normal text-[#49454F]`}
          >
            {participantsCount}
            {isClosed ? '명 참여 완료' : '명 참여중'}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default VoteCard
