import React, { ReactNode } from 'react'

interface Props {
  className?: string
  variant: 'primary'
  size: 'sm' | 'lg'
  children: ReactNode
  onClick?: () => void
  isDisabled?: boolean
}

function ButtonRound({
  className,
  variant,
  size,
  children,
  onClick,
  isDisabled = false,
}: Props) {
  const variantConfig = () => {
    let style = ''
    switch (variant) {
      case 'primary':
        style = 'bg-black text-white'
        break
      default:
        style = ''
    }
    return style
  }

  const sizeConfig = () => {
    let style = ''
    switch (size) {
      case 'lg':
        style = 'py-16pxr px-24pxr w-465pxr h-56pxr'
        break
      case 'sm':
        style = 'py-16pxr px-24pxr w-[222.5px] h-56pxr'
        break
      default:
        style = ''
    }
    return style
  }

  const disabledStyle = isDisabled
    ? 'bg-white !text-black border border-black'
    : ''

  return (
    <button
      type="button"
      aria-label="rounded button"
      className={`flex items-center justify-center gap-10pxr rounded-lg ${variantConfig()} ${sizeConfig()} ${className} ${disabledStyle}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default ButtonRound
