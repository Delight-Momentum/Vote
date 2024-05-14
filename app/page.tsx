'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import LoadMore from '@/assets/svgs/load-more'
import useDebounce from '@/hooks/useDebounce'
import getVotelist from 'apis/getVotelist'
import { VoteList } from 'types/voteListType'
import { Header, SearchBar, VoteCardList } from '../components'

function Home() {
  const [query, setQuery] = useState('')
  const [voteList, setVoteList] = useState<VoteList[]>([])

  const debouncedValue = useDebounce({ value: query, delay: 1000 })

  const searchVoteList = async (value: string) => {
    const data = await getVotelist()
    return data.filter((vote: VoteList) =>
      vote.title.toLowerCase().includes(value.toLowerCase()),
    )
  }

  const searchVote = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    searchVoteList(debouncedValue).then((value) => setVoteList(value))
  }, [debouncedValue])

  return (
    <div className="mx-40pxr flex flex-col items-center">
      <Header />
      <div className="flex justify-center">
        <SearchBar
          placeholder="투표 타이틀을 검색해주세요"
          onChange={searchVote}
          value={query}
        />
      </div>
      <VoteCardList voteList={voteList} />
      <div className="mb-58pxr mt-64pxr flex items-center justify-center gap-4pxr">
        <button type="button" className="flex items-center ">
          더보기 <LoadMore />
        </button>
      </div>
    </div>
  )
}
export default Home
