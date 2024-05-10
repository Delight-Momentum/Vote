import { Header, VoteForm } from '@/components/index'
import React from 'react'

function VotePage() {
  return (
    <>
      <Header>투표하기</Header>
      <div className="flex justify-center pb-89pxr pt-62pxr">
        <VoteForm />
      </div>
    </>
  )
}

export default VotePage
