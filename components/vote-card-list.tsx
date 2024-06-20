'use client'

import { IVote } from 'types/voteListType'
import { RefObject, useEffect, useState } from 'react'
import Link from 'next/link'
import VoteCard from './vote-card'

interface Props {
  observerRef: RefObject<HTMLDivElement>
  voteList: IVote[]
  isLoading?: boolean
}

function VoteCardList({ observerRef, voteList, isLoading }: Props) {
  const [showNoVotesMessage, setShowNoVotesMessage] = useState(false)

  useEffect(() => {
    if (voteList.length === 0 && !isLoading) {
      const timer = setTimeout(() => {
        setShowNoVotesMessage(true)
      }, 500)

      return () => clearTimeout(timer)
    }

    setShowNoVotesMessage(false)
    return undefined
  }, [voteList, isLoading])

  return (
    <div
      data-cy="voteCardList"
      className="grid min-h-[50vh] grid-cols-1 place-items-center gap-27pxr md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      {showNoVotesMessage && (
        <div className="col-span-4 text-center">
          <h1 className="text-32pxr">투표가 없어요.</h1>
          <Link className="mt-4pxr" href="/create-vote">
            <button className="text-18pxr underline" type="button">
              투표 등록하러가기
            </button>
          </Link>
        </div>
      )}
      {isLoading ? (
        <h1>로딩중입니다!</h1>
      ) : (
        voteList?.map(
          ({ id, title, isClosed, participantCounts, contents }, index) => {
            return (
              <VoteCard
                // eslint-disable-next-line react/no-array-index-key
                key={index + title}
                isClosed={isClosed}
                voteTitle={title}
                voteItems={contents}
                participantsCount={participantCounts}
                participateUrl={`/vote/${id}`}
                participateResultUrl={`/vote/${id}/result`}
              />
            )
          },
        )
      )}
      <div className="h-1pxr w-1pxr" ref={observerRef} />
    </div>
  )
}

export default VoteCardList
