import type { Metadata } from 'next'
import '@fontsource-variable/noto-sans-kr'
import '@/styles/globals.css'
import '@/styles/custom-datepicker.css'
import 'react-datepicker/dist/react-datepicker.css'
import KakaoScript from '@/components/kakao-script'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce, ToastContainer } from 'react-toastify'
import { GoogleAnalytics } from '../components'

export const metadata: Metadata = {
  title: 'Vote',
  description: '쉽게 투표하기',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <KakaoScript />
      <body className="bg-[#F7F5FA]">
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics />
        ) : (
          <div>GA환경변수값필요</div>
        )}
        {children}
        <div id="global-dialog" />
        <div id="portal-datepicker" />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  )
}
