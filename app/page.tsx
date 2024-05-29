'use client'

import {
  ChangeEvent,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import getVotelist from 'apis/get-votelist'
import useIntersectionObserver from '@/hooks/use-intersection-observer'
import { IVote, IVoteList } from 'types/voteListType'
import { Header, SearchBar } from '../components'

const VoteCardList = lazy(() => import('@/components/vote-card-list'))

function Home() {
  const [voteList, setVoteList] = useState<IVote[]>([])
  const [offset, setOffset] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState<string | undefined>(undefined)
  const [hasNext, setHasNext] = useState(true)
  const targetRef = useRef<HTMLDivElement>(null)
  const timeoutQueryRef = useRef<NodeJS.Timeout | null>(null)

  const limit = 8
  const itemCounts = voteList.length

  const { observe, unobserve, isVisible, setIsVisible } =
    useIntersectionObserver()

  const fetchVoteList = useCallback(async () => {
    if (isLoading || !hasNext) return
    setIsLoading(true)
    const response = await getVotelist(offset, limit, query)
    const result: IVoteList = await response.json()
    const { votes, total, hasNext: hasMoreItems } = result

    setHasNext(hasMoreItems)
    setVoteList((prev) => [...prev, ...votes])
    setTotalCount(total)
    setOffset((prev) => prev + limit)
    setIsVisible(false)
    setIsLoading(false)
  }, [hasNext, isLoading, offset, query, setIsVisible])

  const initializeVoteList = () => {
    setOffset(1)
    setVoteList([])
    setHasNext(true)
  }

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setQuery(value)
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
    if (isVisible && hasNext) {
      fetchVoteList()
    }
  }, [fetchVoteList, hasNext, isVisible])

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
