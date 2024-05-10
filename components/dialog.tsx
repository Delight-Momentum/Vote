import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface Props {
  isOpen: boolean
  children: ReactNode
  dialogRef?: React.ForwardedRef<HTMLDivElement>
  dialogOutSideClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

function Dialog({ isOpen, children, dialogRef, dialogOutSideClick }: Props) {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div>
      <div
        role="presentation"
        ref={dialogRef}
        onClick={dialogOutSideClick}
        className="z-5 fixed bottom-0pxr left-0pxr right-0pxr top-0pxr bg-black bg-opacity-50"
      />
      <div className="z-5 fixed left-1/2 top-1/2 flex w-312pxr -translate-x-1/2 -translate-y-1/2 flex-col rounded-[28px] bg-white p-25pxr">
        {children}
      </div>
    </div>,
    document.getElementById('global-dialog') as HTMLElement,
  )
}

export default Dialog
