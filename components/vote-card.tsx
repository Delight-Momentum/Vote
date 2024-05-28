import Link from 'next/link'
import React from 'react'
import CirCleButton from './circle-button'

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
  const sliceVoteItems = voteItems?.slice(0, 3)
  return (
    <div
      data-cy="voteCard"
      className="relative h-376pxr w-320pxr rounded-2xl bg-white px-25pxr pb-25pxr pt-17pxr"
    >
      {isClosed && (
        <div className="absolute left-0pxr top-0pxr z-50 flex h-full w-full flex-col items-center justify-center gap-10pxr rounded-2xl bg-[rgba(11,11,11,0.60)]">
          <p className="text-16pxr font-medium text-white">투표가 종료됐어요</p>
          <Link href={participateResultUrl}>
            <CirCleButton theme="normal" data-cy="resultButton">
              결과보기
            </CirCleButton>
          </Link>
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
            <p className="z-10 font-[#49454f] text-16pxr font-normal">{item}</p>
            <p className="font-[#49454f] text-16pxr font-normal">??%</p>
          </div>
        ))}
        <div className="absolute bottom-25pxr h-58pxr w-270pxr bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_100%)]" />
      </div>
      <div className="flex items-center justify-between pt-5pxr">
        <p
          className={`${isClosed && 'flex h-full w-full items-center justify-center !text-[#999999]'} text-14pxr font-normal text-[#49454F]`}
        >
          {participantsCount}
          {isClosed ? '명 참여 완료' : '명 참여중'}
        </p>
        {isClosed || (
          <Link href={participateUrl}>
            <CirCleButton
              theme="small"
              disabled={isClosed}
              data-cy="joinButton"
            >
              참여하기
            </CirCleButton>
          </Link>
        )}
      </div>
    </div>
  )
}

export default VoteCard
