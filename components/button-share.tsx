'use client'

import useModal from '@/hooks/use-modal'
import handleShareToKakao from 'utils/share-kakao'
import { VoteContent } from 'apis/get-vote'
import useMount from '@/hooks/use-mount'
import ButtonRound from './button-round'
import Dialog from './dialog'
import DialogShare from './dialog-share'

interface Props {
  id: string | string[]
  title: string | undefined
  contents: VoteContent[] | undefined
}

function ButtonShare({ id, title, contents }: Props) {
  const { isDialogOpen, setIsDialogOpen, dialogOutSideClick, dialogRef } =
    useModal()
  const isMounted = useMount()
  if (!isMounted) return
  const kakaoShareArgs = {
    id,
    title,
    contents,
    url: window.location.href,
  }
  const handleClickShare = () => {
    const isMobile = /Mobi/i.test(window.navigator.userAgent)
    if (isMobile) {
      window.navigator.share({
        title: '투표 공유하기',
        text: '투표내용을 확인해보세요',
        url: window.location.href,
      })
    } else {
      setIsDialogOpen(true)
    }
  }
  // eslint-disable-next-line consistent-return
  return (
    <>
      {isMounted && (
        <ButtonRound
          variant="primary"
          size="lg"
          onClick={handleClickShare}
          data-cy="shareButton"
        >
          투표 공유하기
        </ButtonRound>
      )}

      <Dialog
        isOpen={isDialogOpen}
        dialogOutSideClick={dialogOutSideClick}
        dialogRef={dialogRef}
      >
        <DialogShare onKakaoShare={() => handleShareToKakao(kakaoShareArgs)} />
      </Dialog>
    </>
  )
}

export default ButtonShare
