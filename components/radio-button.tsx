import { RadioValue, TValue } from '@/hooks/use-radio'
import { InputHTMLAttributes } from 'react'

interface IRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  radioType: 'create' | 'edit' | 'vote'
  radioSize: 'sm' | 'lg'
  name: string
  value?: RadioValue | string
  onValueChange?: (value: TValue) => void
  defaultChecked?: boolean
  disabled?: boolean
  checked?: boolean
}

function RadioButton({
  radioType,
  radioSize,
  name,
  value,
  onValueChange,
  defaultChecked,
  disabled,
  checked,
  ...props
}: IRadioButtonProps) {
  const commonClassNames = `cursor-pointer hover:bg-[#eee6fc] hover:bg-[url('../assets/svgs/check-hover.svg')] hover:bg-center hover:bg-no-repeat focus:shadow-[0_0_0_0.1875rem_rgba(164,135,255,0.5)] focus:outline-none shrink-0 visible appearance-none rounded-full bg-[#d9d9d9] checked:bg-[#eee6fc] checked:bg-[url('../assets/svgs/check.svg')] checked:bg-center checked:bg-no-repeat ${radioSize === 'sm' ? 'h-28pxr w-28pxr' : 'h-32pxr w-32pxr'}`
  const disabledClassNames = `shrink-0 visible appearance-none rounded-full bg-[#d9d9d9] ${radioSize === 'sm' ? 'h-28pxr w-28pxr' : 'h-32pxr w-32pxr'} ${checked ? "bg-[#eee6fc] bg-[url('../assets/svgs/check.svg')] bg-center bg-no-repeat" : ''}`

  return radioType === 'create' || radioType === 'vote' ? (
    <input
      name={name}
      className={commonClassNames}
      onChange={(e) => onValueChange && onValueChange(e.target.value)}
      type="radio"
      value={value}
      defaultChecked={defaultChecked}
      disabled={disabled}
      checked={checked}
      {...props}
    />
  ) : (
    <div className={disabledClassNames} {...props} />
  )
}

export default RadioButton
