import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonRoundProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant: 'primary' | 'secondary'
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
    switch (variant) {
      case 'primary':
        return 'bg-primary300 text-white'
      case 'secondary':
        return 'bg-white text-primary300 border-2 border-primary300'
      default:
        return ''
    }
  }

  const sizeConfig = () => {
    switch (size) {
      case 'lg':
        return 'py-16pxr px-24pxr w-465pxr h-56pxr'
      case 'sm':
        return 'py-16pxr px-24pxr w-[222.5px] h-56pxr'
      default:
        return ''
    }
  }

  const disabledStyle = 'disabled:bg-[#b18b8b] disalbed:text-white'

  return (
    <button
      type="button"
      aria-label="rounded button"
      className={`flex items-center justify-center gap-10pxr rounded-lg ${variantConfig()} ${sizeConfig()} ${className} ${disabledStyle}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default ButtonRound
