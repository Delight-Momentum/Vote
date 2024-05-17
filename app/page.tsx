'use client'

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import getVotelist from 'apis/getVotelist'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { IVote } from 'types/voteListType'
import { Header, SearchBar, VoteCardList } from '../components'

function Home() {
  const [voteList, setVoteList] = useState<IVote[]>([])
  const [offset, setOffset] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState<string | undefined>(undefined)
  const limit = 8
  const itemCounts = voteList.length
  const targetRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { observe, unobserve, isVisible, setIsVisible } =
    useIntersectionObserver()

  const fetchVoteList = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    const result = await getVotelist(offset, limit, query)
    const { votes } = result
    setVoteList((prev) => [...prev, ...votes])
    setTotalCount(result.total)
    setOffset((prev) => prev + limit)
    setIsVisible(false)
    setIsLoading(false)
  }, [isLoading, offset, query, setIsVisible])

  const searchVoteList = () => {
    setOffset(1)
    setVoteList([])
  }

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setQuery(value)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      searchVoteList()
    }, 500)
  }

  useEffect(() => {
    const currentTarget = targetRef.current
    if (currentTarget && totalCount >= itemCounts && !isVisible) {
      observe(currentTarget)
    }
  }, [itemCounts, totalCount, isVisible, observe, unobserve])

  useEffect(() => {
    if (totalCount <= offset && totalCount !== 0) return
    if (isVisible) {
      fetchVoteList()
    }
  }, [isVisible, query, totalCount, setIsVisible, offset, fetchVoteList])

  useEffect(() => {
    if (query === '') {
      setQuery('')
      fetchVoteList()
    }
  }, [query, fetchVoteList])

  return (
    <div>
      <Header />
      <div className="mx-40pxr flex flex-col items-center">
        <div className="flex justify-center">
          <SearchBar
            placeholder="투표 타이틀을 검색해주세요"
            onChange={handleQueryChange}
            value={query}
          />
        </div>
        <VoteCardList voteList={voteList} />
        <div className="h-1pxr w-1pxr" ref={targetRef} />
      </div>
    </div>
  )
}
export default Home
