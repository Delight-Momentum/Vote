import { VoteContent } from 'apis/get-vote'

interface KakaoShareArgs {
  id?: string | string[]
  title: string | undefined
  contents: VoteContent[] | undefined
  url: string
}

const handleShareToKakao = (kakaoShareArgs: KakaoShareArgs) => {
  const { Kakao } = window
  const { contents, title, url } = kakaoShareArgs
  if (!contents) return
  Kakao.Share.sendCustom({
    templateId: 108158,
    templateArgs: {
      description: title,
      content1: contents[0].content,
      content2: contents[1].content,
      url,
    },
  })
}

export default handleShareToKakao
