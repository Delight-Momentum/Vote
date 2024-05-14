import { ChangeEvent } from 'react'

interface IRadioButtonProps {
  name: string
  value: string
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void
  defaultChecked?: boolean
}

function RadioButton({
  name,
  value,
  onValueChange,
  defaultChecked,
}: IRadioButtonProps) {
  return (
    <input
      id={value}
      name={name}
      className="custom-radio"
      onChange={(e) => onValueChange(e)}
      type="radio"
      value={value}
      defaultChecked={defaultChecked}
    />
  )
}

export default RadioButton
