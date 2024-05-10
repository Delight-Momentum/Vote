import { ChangeEvent } from 'react'

interface IRadioButtonProps {
  size: 'sm' | 'lg'
  name: string
  value: string
  handleValueChange: (e: ChangeEvent<HTMLInputElement>) => void
  defaultChecked?: boolean
}

function RadioButton({
  size,
  name,
  value,
  handleValueChange,
  defaultChecked,
}: IRadioButtonProps) {
  return (
    <input
      id={value}
      name={name}
      className={`custom-radio ${size === 'sm' ? 'custom-radio-sm' : 'custom-radio-lg'}`}
      onChange={(e) => handleValueChange(e)}
      type="radio"
      value={value}
      defaultChecked={defaultChecked}
    />
  )
}

export default RadioButton
