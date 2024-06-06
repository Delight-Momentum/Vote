'use client'

import { ReactNode, useEffect, useState } from 'react'
import { VoteContent } from 'apis/get-vote'
import { CircleButton, Input, Label } from '.'

interface IVoteContentsProps {
  values?: VoteContent[]
}
const MAX_CONTENTS = 10

function VoteContents({ values }: IVoteContentsProps) {
  const [inputCount, setInputCount] = useState(2)
  const [inputs, setInputs] = useState<ReactNode[]>([])

  useEffect(() => {
    const updatedInputs: ReactNode[] = []

    for (let i = 0; i < inputCount; i += 1) {
      updatedInputs.push(
        <Input
          dataType="array"
          id={`voteContents${i}`}
          data-cy={`contentInput-${i + 1}`}
          value={values && values[i].content}
          disabled={!!values}
        />,
      )
    }

    setInputs(updatedInputs)
  }, [inputCount, values])

  useEffect(() => {
    if (values) {
      setInputCount(values.length)
    }
  }, [values])

  return (
    <div className="flex flex-col gap-10pxr">
      <Label htmlFor="voteContents0" theme="small">
        투표 내용
      </Label>
      <div className="flex flex-col gap-20pxr">
        <ul className="flex flex-col gap-20pxr">
          {inputs.map((item, index) => (
            <li className="relative flex" key={`${item}${index + 1}`}>
              {item}
            </li>
          ))}
        </ul>
        <CircleButton
          theme="big"
          disabled={inputCount === MAX_CONTENTS || !!values}
          data-cy="addContentButton"
        >
          추가하기
        </CircleButton>
      </div>
    </div>
  )
}

export default VoteContents
