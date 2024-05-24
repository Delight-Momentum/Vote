import { CreateVoteForm, Header } from '@/components/index'

function CreateVotePage() {
  return (
    <>
      <Header>투표 만들기</Header>
      <div className="flex justify-center px-12pxr pb-89pxr pt-64pxr">
        <CreateVoteForm />
      </div>
    </>
  )
}

export default CreateVotePage
