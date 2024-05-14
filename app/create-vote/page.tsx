import CreateVoteForm from '@/components/create-vote-form'
import Header from '@/components/header'

function page() {
  return (
    <>
      <Header>투표 만들기</Header>
      <div className="flex justify-center pb-89pxr pt-64pxr">
        <CreateVoteForm />
      </div>
    </>
  )
}

export default page
