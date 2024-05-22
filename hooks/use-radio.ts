'use client'

import { useState } from 'react'

export type RadioValue = 'one' | 'multiple' | 'public' | 'private'

function useRadio() {
  const [radioValues, setRadioValues] = useState({
    voteMethod: 'one',
    participantNameMethod: 'public',
  })

  const handleValueChange = (value: RadioValue) => {
    switch (value) {
      case 'one':
        setRadioValues({ ...radioValues, voteMethod: 'one' })
        break

      case 'multiple':
        setRadioValues({ ...radioValues, voteMethod: 'multiple' })
        break

      case 'public':
        setRadioValues({ ...radioValues, participantNameMethod: 'public' })
        break

      case 'private':
        setRadioValues({ ...radioValues, participantNameMethod: 'private' })
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
