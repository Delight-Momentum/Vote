import LoadMore from '@/assets/svgs/load-more'
import VoteCardList from '@/components/vote-card-list'
import { Header, SearchBar } from '../components'

function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <SearchBar placeholder="투표 타이틀을 검색해주세요" />
      </div>
      <VoteCardList />
      <div className="mb-58pxr mt-64pxr flex items-center justify-center gap-4pxr">
        <span>더보기</span>
        <LoadMore />
      </div>
    </>
  )
}
export default Home
