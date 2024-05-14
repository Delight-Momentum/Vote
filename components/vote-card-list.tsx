import { VoteList } from 'types/voteListType'
import VoteCard from './vote-card'

interface Props {
  voteList: VoteList[]
}

function VoteCardList({ voteList }: Props) {
  return (
    <div className=" grid grid-cols-4 place-items-center gap-27pxr">
      {voteList.map(({ id, title, isClosed, participantCounts, contents }) => (
        <VoteCard
          key={id}
          isClosed={isClosed}
          voteTitle={title}
          voteItems={contents}
          participantsCount={participantCounts}
          participateUrl={`/vote/${id}`}
          participateResultUrl={`/vote/${id}/result`}
        />
      ))}
    </div>
  )
}

export default VoteCardList
