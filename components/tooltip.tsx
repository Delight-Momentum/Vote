import { ReactNode } from 'react'

interface ITooltipProps {
  arrowPosition: 'top' | 'left'
  children: ReactNode
}

function Tooltip({ arrowPosition, children }: ITooltipProps) {
  const arrowClassName = `absolute  ${arrowPosition === 'top' ? '-top-5pxr left-1/2 -translate-x-1/2' : '-left-5pxr top-1/2 -translate-y-1/2'} h-10pxr w-10pxr rotate-45 bg-primary100`

  return (
    <div className="absolute left-[25%] z-[999] flex max-h-350pxr max-w-215pxr rounded-lg bg-primary100 p-8pxr shadow-lg">
      <div className={arrowClassName} />
      <p className="text-13pxr text-black">{children}</p>
    </div>
  )
}

export default Tooltip
