'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import getVotelist from 'apis/get-votelist'
import useIntersectionObserver from '@/hooks/use-intersection-observer'
import { IVote, IVoteList } from 'types/voteListType'
import { useSearchParams } from 'next/navigation'
import {
  Filter,
  FloatingButton,
  Footer,
  Header,
  SearchBar,
  VoteCardList,
} from '.'

function MainPageContent() {
  const params = useSearchParams()
  const [voteList, setVoteList] = useState<IVote[]>([])
  const [offset, setOffset] = useState(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState<string | undefined>(
    params.get('query') || '',
  )
  const [hasNext, setHasNext] = useState(true)
  const [order, setOrder] = useState<'popular' | 'open' | undefined>(
    (params.get('order') as 'popular' | 'open') || 'popular',
  )
  const targetRef = useRef<HTMLDivElement>(null)
  const timeoutQueryRef = useRef<NodeJS.Timeout | null>(null)

  const limit = 8
  const itemCounts = voteList.length
  const { observe, unobserve, isVisible, setIsVisible } =
    useIntersectionObserver()

  const initializeVoteList = () => {
    setOffset(1)
    setVoteList([])
    setHasNext(true)
  }

  const handleResetSearchValue = () => {
    setQuery(undefined)
    initializeVoteList()
  }

  const handleOrderChange = (value: 'popular' | 'open' | undefined) => {
    setOrder(value)
    window.history.replaceState(
      null,
      '',
      query ? `?query=${query}&order=${value}` : `?query=&order=${value || ''}`,
    )
  }

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setQuery(value)
    window.history.replaceState(
      null,
      '',
      value ? `?query=${value}&order=${order}` : `?query=&order=${order}`,
    )

    if (timeoutQueryRef.current) {
      clearTimeout(timeoutQueryRef.current)
    }
    timeoutQueryRef.current = setTimeout(() => {
      initializeVoteList()
    }, 500)
  }

  useEffect(() => {
    const currentTarget = targetRef.current
    if (currentTarget && totalCount >= itemCounts && !isVisible) {
      observe(currentTarget)
    }
  }, [itemCounts, totalCount, isVisible, observe, unobserve])

  useEffect(() => {
    const fetchVoteList = async () => {
      setIsLoading(true)
      const response = await getVotelist({
        offset,
        limit,
        search: query,
        order,
      })
      const result: IVoteList = await response.json()
      const { votes, total, hasNext: hasMoreItems } = result

      setHasNext(hasMoreItems)
      setVoteList((prev) => [...prev, ...votes])
      setTotalCount(total)
      setOffset((prev) => prev + limit)
      setIsVisible(false)
      setIsLoading(false)
    }

    if (isVisible && hasNext && !isLoading) {
      fetchVoteList()
    }
  }, [hasNext, isLoading, isVisible, offset, order, query, setIsVisible])

  useEffect(() => {
    initializeVoteList()
  }, [order, query])

  return (
    <div className="relative">
      <Header onLogoClick={handleResetSearchValue} />
      <div className="mx-40pxr flex flex-col items-center">
        <div className="flex justify-center">
          <SearchBar
            placeholder="투표 타이틀을 검색해주세요"
            onChange={handleQueryChange}
            value={query}
          />
        </div>
        <div className="flex w-full justify-center py-18pxr">
          <div className="flex w-320pxr justify-end md:w-667pxr lg:w-1014pxr 2xl:w-1361pxr">
            <Filter order={order} onFilterClick={handleOrderChange} />
          </div>
        </div>
        <VoteCardList observerRef={targetRef} voteList={voteList} />
      </div>
      <div className="mt-60pxr">
        <Footer />
      </div>
      <FloatingButton />
    </div>
  )
}
export default MainPageContent
