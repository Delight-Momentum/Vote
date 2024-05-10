import React, { useRef, useState } from 'react'

function useModal() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  const dialogOutSideClick = (e: React.MouseEvent) => {
    if (dialogRef.current === e.target) {
      setIsDialogOpen(false)
    }
  }
  return {
    isDialogOpen,
    dialogOutSideClick,
    setIsDialogOpen,
    dialogRef,
  }
}

export default useModal
