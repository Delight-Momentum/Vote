import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface Props {
  isOpen: boolean
  children?: ReactNode
  dialogRef?: React.ForwardedRef<HTMLDivElement>
  dialogOutSideClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  className?: string
}

function Dialog({
  isOpen,
  children,
  dialogRef,
  dialogOutSideClick,
  className,
}: Props) {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div>
      <div
        role="presentation"
        ref={dialogRef}
        onClick={dialogOutSideClick}
        className="fixed bottom-0pxr left-0pxr right-0pxr top-0pxr z-20 bg-black bg-opacity-50"
      />
      <div
        className={`fixed left-1/2 top-1/2 z-20 flex w-full max-w-312pxr -translate-x-1/2 -translate-y-1/2 flex-col rounded-[28px] bg-white p-25pxr ${className}`}
        data-cy="dialog"
      >
        {children}
      </div>
    </div>,
    document.getElementById('global-dialog') as HTMLElement,
  )
}

export default Dialog
