import Pen from '@/assets/svgs/pen'
import Link from 'next/link'

function CreateVoteButton() {
  return (
    <Link href="/create-vote" className="rounded-full">
      <button
        className="flex items-center gap-8pxr rounded-full bg-[#f3eefc] py-8pxr pl-16pxr pr-14pxr text-16pxr font-medium text-[#49454f] hover:bg-[#efe7ff]"
        type="button"
      >
        투표 생성하기
        <Pen />
      </button>
    </Link>
  )
}

export default CreateVoteButton
