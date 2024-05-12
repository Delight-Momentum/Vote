'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { Cards, fetchCards } from '@/components/vote-card-list'
import LoadMore from '@/assets/svgs/load-more'
import useDebounce from '@/hooks/useDebounce'
import { Header, SearchBar, VoteCardList } from '../components'

function Home() {
  const [query, setQuery] = useState('')
  const [cards, setCards] = useState<Cards[]>([])
  const [searching, setSearching] = useState(false)

  const debouncedValue = useDebounce({ value: query, delay: 1000 })

  const searchVote = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    setSearching(true)
    fetchCards(debouncedValue).then((value) => setCards(value))
    setSearching(false)
  }, [debouncedValue])

  return (
    <div className="mx-40pxr">
      <Header />
      <div className="flex justify-center">
        <SearchBar
          placeholder="투표 타이틀을 검색해주세요"
          onChange={searchVote}
          value={query}
        />
      </div>
      <VoteCardList cards={cards} searching={searching} />
      <div className="mb-58pxr mt-64pxr flex items-center justify-center gap-4pxr">
        <button type="button" className="flex items-center ">
          더보기 <LoadMore />
        </button>
      </div>
    </div>
  )
}
export default Home
