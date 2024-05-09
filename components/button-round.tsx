import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonRoundProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant: 'primary'
  size: 'sm' | 'lg'
  children: ReactNode
}

function ButtonRound({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonRoundProps) {
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

  return (
    <button
      type="button"
      aria-label="rounded button"
      className={`flex items-center justify-center gap-10pxr rounded-lg ${variantConfig()} ${sizeConfig()} ${className} disable:bg-white border border-black text-black`}
      {...props}
    >
      {children}
    </button>
  )
}

export default ButtonRound
