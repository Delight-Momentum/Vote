'use client'

import React, { useEffect, useRef, useState } from 'react'
import getVotelist from 'apis/getVotelist'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { IVote } from 'types/voteListType'
import { Header, SearchBar, VoteCardList } from '../components'

function Home() {
  const [voteList, setVoteList] = useState<IVote[]>([])
  const [offset, setOffset] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const limit = 8
  const itemCounts = voteList.length

  const { observe, unobserve, isVisible, setIsVisible } =
    useIntersectionObserver(() => setOffset((prev) => prev + limit))

  const fetchVoteList = async (offsetValue: number) => {
    if (isLoading) return
    setIsLoading(true)
    const result = await getVotelist(offsetValue)
    const { votes } = result
    if (Array.isArray(votes)) {
      setVoteList((prev) => [...prev, ...votes])
      setTotalCount(result.total)
      setIsVisible(false)
      setIsLoading(false)
    }
  }

  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentTarget = targetRef.current
    if (currentTarget && totalCount > itemCounts && !isVisible) {
      observe(currentTarget)
    }

    return () => {
      if (currentTarget && totalCount > itemCounts && !isVisible) {
        unobserve(currentTarget)
      }
    }
  }, [itemCounts, totalCount, isVisible, observe, unobserve])

  useEffect(() => {
    if (isVisible) {
      fetchVoteList(offset)
    }
  }, [isVisible])

  return (
    <div className="mx-40pxr flex flex-col items-center">
      <Header />
      <div className="flex justify-center">
        <SearchBar
          placeholder="투표 타이틀을 검색해주세요"
          onChange={() => console.log('온체인지 실행됨')}
          value="구현 예정입니다."
        />
      </div>
      <VoteCardList voteList={voteList} />
      <div className="h-1pxr w-1pxr" ref={targetRef} />
    </div>
  )
}
export default Home
