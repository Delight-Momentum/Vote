import { Suspense } from 'react'
import { MainPageContent } from '../components'

function Home() {
  return (
    <Suspense>
      <MainPageContent />
    </Suspense>
  )
}
export default Home
