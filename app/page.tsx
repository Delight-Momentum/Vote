'use client'

import Dialog from '@/components/dialog'
import DialogRevote from '@/components/dialog-revote'
import { useRef, useState } from 'react'

function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  const dialogOutSideClick = (e: React.MouseEvent) => {
    if (dialogRef.current === e.target) {
      setIsDialogOpen(false)
    }
  }
  return (
    <>
      <button
        type="button"
        className="bg-white p-20pxr text-black"
        onClick={() => setIsDialogOpen(true)}
      >
        재투표하기
      </button>
      <Dialog
        isOpen={isDialogOpen}
        dialogOutSideClick={dialogOutSideClick}
        dialogRef={dialogRef}
        className="h-291pxr max-w-488pxr p-12pxr"
      >
        <DialogRevote voteId="74" onClose={() => setIsDialogOpen(false)} />
      </Dialog>
    </>
  )
}
export default Home
