'use client'

import Script from 'next/script'

function KakaoScript() {
  const onLoad = () => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
      }
    }
  }

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
      async
      onLoad={onLoad}
    />
  )
}

export default KakaoScript
