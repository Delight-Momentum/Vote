'use client'

import Dialog from '@/components/dialog'
import DeleteDialog from '@/components/dialog-delete'
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
        삭제하기
      </button>
      <Dialog
        isOpen={isDialogOpen}
        dialogOutSideClick={dialogOutSideClick}
        dialogRef={dialogRef}
      >
        <DeleteDialog />
      </Dialog>
    </>
  )
}
export default Home
