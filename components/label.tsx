type LabelTheme = 'small' | 'normal' | 'big'

interface ILabelProps {
  children: string
  htmlFor?: string
  theme: LabelTheme
  className?: string
}

const small = 'text-20pxr font-semibold'
const normal = 'text-24pxr font-semibold'
const big = 'text-30pxr font-semibold'

const labelStyle: Record<LabelTheme, string> = {
  small,
  normal,
  big,
}

export default function Label({
  children,
  htmlFor,
  theme,
  className,
}: ILabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-[#000] ${labelStyle[theme]} ${className || ''}`}
      data-cy="label"
    >
      {children}
    </label>
  )
}
