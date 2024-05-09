import { ButtonHTMLAttributes } from 'react'

type ButtonTheme = 'small' | 'normal' | 'big'

interface ICirCleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  theme: ButtonTheme
}

const small =
  'bg-primary100 px-24pxr border-0 h-40pxr w-100pxr inline-block text-14pxr font-medium hover:bg-primary300 hover:text-white'
const normal =
  'bg-primary100 border-0 px-24pxr h-42pxr w-108pxr inline-block text-16pxr font-bold hover:bg-primary300 hover:text-white'
const big =
  'border border-[#B0B0B0] px-24pxr h-56pxr inline-block w-full text-16pxr font-medium hover:bg-primary300 hover:text-white'
const disabledStyle = 'disabled:text-[#B0B0B0] disabled:bg-[#999999]'

const buttonStyle: Record<ButtonTheme, string> = {
  small,
  normal,
  big,
}

export default function CirCleButton({
  children,
  theme,
  ...props
}: ICirCleButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full ${buttonStyle[theme]} ${disabledStyle}`}
      {...props}
    >
      {children}
    </button>
  )
}
