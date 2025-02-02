import { EditVoteForm, Header } from '@/components/index'

function VoteEditPage() {
  return (
    <>
      <Header>투표 수정하기</Header>
      <div className="flex justify-center px-12pxr pb-89pxr pt-64pxr">
        <EditVoteForm />
      </div>
    </>
  )
}

export default VoteEditPage
