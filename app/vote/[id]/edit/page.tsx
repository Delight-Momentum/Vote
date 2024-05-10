import { EditVoteForm, Header } from '@/components/index'
import React from 'react'

function VoteEditPage() {
  return (
    <>
      <Header>투표 수정하기</Header>
      <div className="flex justify-center pb-89pxr pt-64pxr">
        <EditVoteForm />
      </div>
    </>
  )
}

export default VoteEditPage
