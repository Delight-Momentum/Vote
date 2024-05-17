import { IVote } from 'types/voteListType'
import VoteCard from './vote-card'

interface Props {
  voteList: IVote[]
  isLoading?: boolean
}

function VoteCardList({ voteList, isLoading }: Props) {
  return (
    <div className="grid grid-cols-1 place-items-center gap-27pxr md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {isLoading ? (
        <h1>로딩중입니다!</h1>
      ) : (
        voteList?.map(
          ({ id, title, isClosed, participantCounts, contents }) => (
            <VoteCard
              key={id}
              isClosed={isClosed}
              voteTitle={title}
              voteItems={contents}
              participantsCount={participantCounts}
              participateUrl={`/vote/${id}`}
              participateResultUrl={`/vote/${id}/result`}
            />
          ),
        )
      )}
    </div>
  )
}

export default VoteCardList
