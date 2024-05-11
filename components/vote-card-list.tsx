import React from 'react'
import VoteCard from './vote-card'

const cardsDummy = [
  { id: 1, title: '최고의 음식은?', isClosed: false },
  { id: 2, title: '최고의 아이돌은?', isClosed: true },
  { id: 3, title: '최고의 운동은?', isClosed: true },
  { id: 4, title: '최고의 여행지는?', isClosed: true },
  { id: 5, title: '최고의 영화는?', isClosed: true },
  { id: 6, title: '최고의 책은?', isClosed: true },
  { id: 7, title: '최고의 스포츠는?', isClosed: true },
  { id: 8, title: '최고의 음악은?', isClosed: true },
]

export const fetchCards = async (query: string) => {
  await new Promise((r) => {
    setTimeout(r, 2000)
  })
  return cardsDummy.filter((card) =>
    card.title.toLowerCase().includes(query.toLowerCase()),
  )
}

export interface Cards {
  id: number
  title: string
  isClosed: boolean
}
interface Props {
  cards: Cards[]
}

function VoteCardList({ cards }: Props) {
  return (
    <div className="row-gap-27pxr grid grid-cols-4 place-items-center justify-center gap-27pxr">
      {cards.map(({ id, title, isClosed }) => (
        <VoteCard
          key={id}
          isClosed={isClosed}
          voteTitle={title}
          voteItems={['물냉면', '비빔냉면']}
          participantsCount={242}
          participateUrl="/vote/1"
          participateResultUrl="/vote/1/result"
        />
      ))}
    </div>
  )
}

export default VoteCardList
