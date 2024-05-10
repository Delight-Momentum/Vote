import React from 'react'
import VoteCard from './vote-card'

function VoteCardList() {
  return (
    <div className="row-gap-27pxr grid grid-cols-4 gap-27pxr">
      <VoteCard
        isClosed={false}
        voteTitle="최고의 음식은?"
        voteItems={['물냉면', '비빔냉면']}
        participantsCount={242}
        participateUrl="/vote/1"
        participateResultUrl="/vote/1/result"
      />
      <VoteCard
        isClosed
        voteTitle="가장 최고의 아이돌은?"
        voteItems={['물냉면', '비빔냉면']}
        participantsCount={35}
        participateUrl="/vote/1"
        participateResultUrl="/vote/1/result"
      />
      <VoteCard
        isClosed
        voteTitle="가장 최고의 아이돌은?"
        voteItems={['물냉면', '비빔냉면']}
        participantsCount={35}
        participateUrl="/vote/1"
        participateResultUrl="/vote/1/result"
      />
      <VoteCard
        isClosed
        voteTitle="가장 최고의 아이돌은?"
        voteItems={['물냉면', '비빔냉면']}
        participantsCount={35}
        participateUrl="/vote/1"
        participateResultUrl="/vote/1/result"
      />
      <VoteCard
        isClosed
        voteTitle="가장 최고의 아이돌은?"
        voteItems={['물냉면', '비빔냉면']}
        participantsCount={35}
        participateUrl="/vote/1"
        participateResultUrl="/vote/1/result"
      />
      <VoteCard
        isClosed
        voteTitle="가장 최고의 아이돌은?"
        voteItems={['물냉면', '비빔냉면']}
        participantsCount={35}
        participateUrl="/vote/1"
        participateResultUrl="/vote/1/result"
      />
      <VoteCard
        isClosed
        voteTitle="가장 최고의 아이돌은?"
        voteItems={['물냉면', '비빔냉면']}
        participantsCount={35}
        participateUrl="/vote/1"
        participateResultUrl="/vote/1/result"
      />
      <VoteCard
        isClosed
        voteTitle="가장 최고의 아이돌은?"
        voteItems={['물냉면', '비빔냉면']}
        participantsCount={35}
        participateUrl="/vote/1"
        participateResultUrl="/vote/1/result"
      />
    </div>
  )
}

export default VoteCardList
