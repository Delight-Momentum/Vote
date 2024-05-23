'use client'

import { ReactNode, useEffect, useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { VoteContent } from 'apis/get-vote'
import { CircleButton, Input, Label } from '.'
import { ICreateVoteForm } from './create-vote-form'

interface IVoteContentsProps {
  register?: UseFormRegister<ICreateVoteForm>
  errors?: FieldErrors<ICreateVoteForm>
  values?: VoteContent[]
}
const MAX_CONTENTS = 10

function VoteContents({ register, errors, values }: IVoteContentsProps) {
  const [inputCount, setInputCount] = useState(2)
  const [inputs, setInputs] = useState<ReactNode[]>([])

  const handleAddClick = () => {
    if (inputCount > MAX_CONTENTS - 1) {
      return
    }

    setInputCount(inputCount + 1)
  }

  useEffect(() => {
    const updatedInputs: ReactNode[] = []

    for (let i = 0; i < inputCount; i += 1) {
      updatedInputs.push(
        <Input
          className={
            errors &&
            (errors.voteContents && errors.voteContents[i]
              ? 'border border-red-500'
              : '')
          }
          dataType="array"
          id={`voteContents${i}`}
          hookFormId={String(i)}
          register={register}
          errors={errors}
          hookFormRequired="항목을 입력해주세요"
          placeholder={`${i + 1}번 항목`}
          data-cy={`contentInput-${i + 1}`}
          value={values && values[i].content}
          disabled={!!values}
        />,
      )
    }

    setInputs(updatedInputs)
  }, [inputCount, register, errors, values])

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
      <ul className="flex flex-col gap-15pxr">
        {inputs.map((item, index) => (
          <li className="relative flex" key={`${item}${index + 1}`}>
            {item}
          </li>
        ))}
      </ul>
      <CircleButton
        theme="big"
        onClick={handleAddClick}
        disabled={inputCount === MAX_CONTENTS || !!values}
        data-cy="addContentButton"
      >
        추가하기
      </CircleButton>
    </div>
  )
}

export default VoteContents
