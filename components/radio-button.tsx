import { ChangeEvent, InputHTMLAttributes } from 'react'

interface IRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  value: string
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void
  defaultChecked?: boolean
  disabled?: boolean
}

function RadioButton({
  name,
  value,
  onValueChange,
  defaultChecked,
  disabled,
  ...props
}: IRadioButtonProps) {
  return (
    <input
      id={value}
      name={name}
      className={`${disabled ? '' : " hover:bg-[#eee6fc] hover:bg-[url('../assets/svgs/check-hover.svg')] hover:bg-center hover:bg-no-repeat focus:shadow-[0_0_0_0.1875rem_rgba(164,135,255,0.5)] focus:outline-none"} visible h-28pxr w-28pxr appearance-none rounded-full bg-[#d9d9d9] checked:bg-[#eee6fc] checked:bg-[url('../assets/svgs/check.svg')] checked:bg-center checked:bg-no-repeat`}
      onChange={(e) => onValueChange && onValueChange(e)}
      type="radio"
      value={value}
      defaultChecked={defaultChecked}
      disabled={disabled}
      {...props}
    />
  )
}

export default RadioButton
