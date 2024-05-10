import type { Metadata } from 'next'
import '@fontsource-variable/noto-sans-kr'
import '@/styles/globals.css'

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
      <body>
        {children}
        <div id="global-dialog" />
      </body>
    </html>
  )
}
