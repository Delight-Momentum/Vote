import Image from 'next/image'
import { toast } from 'react-toastify'

interface Props {
  onKakaoShare: () => void
}

function DialogShare({ onKakaoShare }: Props) {
  const handleCopyClipBoard = async () => {
    try {
      if (typeof window !== 'undefined') {
        const currentURL = window.location.href
        navigator.clipboard.writeText(currentURL)
        toast.success(<div>현재 링크를 복사했어요!</div>)
      }
    } catch (error) {
      toast.error(<div>링크 복사를 실패했어요.</div>)
    }
  }
  return (
    <div className="flex flex-col justify-center gap-25pxr">
      <div className="flex flex-col gap-15pxr">
        <h1 className="text-center text-22pxr font-semibold">공유 하기</h1>
        <h2 className="text-center text-14pxr font-semibold text-[#6E6E6E]">
          다양한 방법으로 공유 해보세요.
        </h2>
        <hr className="border-primary border" />
      </div>
      <div className="flex items-center justify-evenly gap-10pxr pb-20pxr">
        <div className="flex h-50pxr flex-col items-center justify-center">
          <button
            type="button"
            className="p-10pxr font-semibold text-[#6e6e6e] hover:font-bold"
            data-cy="deleteDialogButton"
            onClick={handleCopyClipBoard}
          >
            <Image
              alt="링크 아이콘"
              src="/icon-link.png"
              width={40}
              height={40}
            />
          </button>
          <span className="mt-4pxr text-11pxr font-semibold text-gray-500">
            링크 복사
          </span>
        </div>
        <div className="flex h-50pxr flex-col items-center justify-center">
          <button
            className="p-10pxr font-semibold text-primary300 hover:font-bold"
            type="button"
            onClick={onKakaoShare}
          >
            <Image
              alt="카카오 아이콘"
              src="/kakao-logo.png"
              width={48}
              height={48}
            />
          </button>
          <span className="text-11pxr font-semibold text-gray-500">
            카카오톡
          </span>
        </div>
      </div>
    </div>
  )
}

export default DialogShare
