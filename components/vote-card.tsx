'use client'

import Link from 'next/link'
import { useState } from 'react'
import CirCleButton from './circle-button'
import Tooltip from './tooltip'

interface Props {
  isClosed: boolean
  voteTitle: string
  voteItems: string[]
  participantsCount: number
  participateUrl: string
  participateResultUrl: string
}

const MAX_VOTE_ITEMS = 3

function VoteCard({
  isClosed,
  voteTitle,
  voteItems,
  participantsCount,
  participateUrl,
  participateResultUrl,
}: Props) {
  const [tooltip, setTooltip] = useState({
    voteTitle: false,
    voteItems: Array(MAX_VOTE_ITEMS).fill(false),
  })

  const sliceVoteItems = voteItems.slice(0, MAX_VOTE_ITEMS)

  const handleMouseEnter = (index?: number) => {
    setTooltip((prev) => ({
      voteTitle: index === undefined ? true : prev.voteTitle,
      voteItems: prev.voteItems.map((_, i) => i === index),
    }))
  }

  const handleMouseLeave = (index?: number) => {
    setTooltip((prev) => ({
      voteTitle: index === undefined ? false : prev.voteTitle,
      voteItems: prev.voteItems.map(() => false),
    }))
  }

  return (
    <div
      data-cy="voteCard"
      className="relative h-376pxr w-320pxr transform rounded-2xl bg-white px-25pxr pb-25pxr pt-17pxr transition duration-300 hover:scale-110"
    >
      <Link href={isClosed ? participateResultUrl : participateUrl}>
        {isClosed && (
          <div className="absolute left-0pxr top-0pxr z-50 flex h-full w-full flex-col items-center justify-center gap-10pxr rounded-2xl bg-[rgba(11,11,11,0.60)]">
            <p className="text-center text-16pxr font-medium text-white">
              투표가 종료됐어요
              <br />
              <span className="text-18pxr">결과를 확인해보세요!</span>
            </p>
          </div>
        )}
        <div className="relative w-282pxr pb-17pxr">
          <h2
            data-cy="voteTitle"
            className="overflow-hidden text-ellipsis whitespace-nowrap text-22pxr font-medium"
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            onTouchStart={() => handleMouseEnter()}
            onTouchEnd={() => handleMouseLeave()}
          >
            {voteTitle}
          </h2>
          {tooltip.voteTitle && (
            <Tooltip arrowPosition="top">{voteTitle}</Tooltip>
          )}
        </div>
        <div className="relative flex h-239pxr flex-col gap-15pxr pb-25pxr pt-10pxr">
          {sliceVoteItems.map((item, index) => (
            <div
              className={`relative flex items-center justify-between rounded-md bg-[#eBeBeB] py-17pxr pl-25pxr pr-13pxr ${isClosed ? 'bg-[#e7e7e8]' : ''}`}
              key={`${item}-${index + 1}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onTouchStart={() => handleMouseEnter(index)}
              onTouchEnd={() => handleMouseLeave(index)}
            >
              <div
                className={`absolute left-0pxr top-0pxr h-full w-1/2 rounded-md bg-primary200 ${isClosed ? 'bg-[#999999]' : ''}`}
              />
              <p className="z-10 w-190pxr overflow-hidden text-ellipsis text-nowrap font-[#49454f] text-16pxr font-normal">
                {item}
              </p>
              <p className="font-[#49454f] text-16pxr font-normal">??%</p>
              {tooltip.voteItems[index] && (
                <Tooltip arrowPosition="left">{item}</Tooltip>
              )}
            </div>
          ))}
          {voteItems.length > MAX_VOTE_ITEMS && (
            <div className="absolute bottom-6pxr left-0pxr z-10 flex w-full items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,#FFF_100%)]">
              <p className="text-14pxr font-normal text-[#49454F]">
                +{voteItems.length - MAX_VOTE_ITEMS}개의 선택지가 더 있어요
              </p>
            </div>
          )}
        </div>
      </Link>
      <div className="flex h-55pxr items-center justify-between">
        <div className="flex h-40pxr items-end pt-5pxr">
          <p
            className={`${isClosed ? 'flex h-full w-full items-center justify-center !text-[#999999]' : 'text-14pxr font-normal text-[#49454F]'}`}
          >
            {participantsCount}명 {isClosed ? '참여 완료' : '참여중'}
          </p>
        </div>
        {!isClosed && (
          <Link href={participateResultUrl}>
            <div className="z-20 flex items-end">
              <CirCleButton theme="small">결과보기</CirCleButton>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default VoteCard
