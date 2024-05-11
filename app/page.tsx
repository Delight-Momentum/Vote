'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { Cards, fetchCards } from '@/components/vote-card-list'
import LoadMore from '@/assets/svgs/load-more'
import { Header, SearchBar, VoteCardList } from '../components'

function Home() {
  const [query, setQuery] = useState('')
  const [cards, setCards] = useState<Cards[]>([])

  const searchVote = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    fetchCards(query).then((value) => setCards(value))
  }, [query])

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
      <VoteCardList cards={cards} />
      <div className="mb-58pxr mt-64pxr flex items-center justify-center gap-4pxr">
        <button type="button" className="flex items-center ">
          더보기 <LoadMore />
        </button>
      </div>
    </div>
  )
}
export default Home
