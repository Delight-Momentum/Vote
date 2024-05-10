import { ChangeEvent } from 'react'

interface IRadioButtonProps {
  name: string
  value: string
  handleValueChange: (e: ChangeEvent<HTMLInputElement>) => void
  defaultChecked?: boolean
}

function RadioButton({
  name,
  value,
  handleValueChange,
  defaultChecked,
}: IRadioButtonProps) {
  return (
    <input
      id={value}
      name={name}
      className="custom-radio"
      onChange={(e) => handleValueChange(e)}
      type="radio"
      value={value}
      defaultChecked={defaultChecked}
    />
  )
}

export default RadioButton
