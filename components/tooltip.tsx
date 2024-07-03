/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode, forwardRef } from 'react'

interface ITooltipProps {
  arrowPosition: 'top' | 'left'
  children: ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

const Tooltip = forwardRef<HTMLDivElement, ITooltipProps>(function Tooltip(
  { arrowPosition, children, className, onClick },
  ref,
) {
  const arrowClassName = `absolute ${
    arrowPosition === 'top'
      ? '-top-5pxr left-1/2 -translate-x-1/2'
      : '-left-5pxr top-1/2 -translate-y-1/2'
  } h-10pxr w-10pxr rotate-45 bg-primary100`

  return (
    <div
      className={`tooltipScrollbar absolute left-[25%] z-[999] flex max-h-350pxr max-w-215pxr rounded-lg bg-primary100 p-8pxr shadow-lg ${className}`}
      onClick={onClick}
      ref={ref}
    >
      <div className={arrowClassName} />
      <p className="text-13pxr text-black">{children}</p>
    </div>
  )
})

export default Tooltip
