import { ChangeEvent, useState } from 'react'

function useRadio() {
  const [radioValues, setRadioValues] = useState({
    voteMethod: 'one',
    participant: 'public',
  })

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.value) {
      case 'one':
        setRadioValues({ ...radioValues, voteMethod: 'one' })
        break
      case 'multiple':
        setRadioValues({ ...radioValues, voteMethod: 'multiple' })
        break
      case 'public':
        setRadioValues({ ...radioValues, participant: 'public' })
        break
      case 'private':
        setRadioValues({ ...radioValues, participant: 'private' })
        break
      default:
        break
    }
  }

  return {
    radioValues,
    handleValueChange,
  }
}

export default useRadio
