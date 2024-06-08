'use client'

import { useEffect, useState } from 'react'
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form'
import { VoteContent } from 'apis/get-vote'
import { CircleButton, Input, Label } from '.'
import { ICreateVoteForm } from './create-vote-form'

interface IVoteContentsProps {
  register?: UseFormRegister<ICreateVoteForm>
  errors?: FieldErrors<ICreateVoteForm>
  control?: Control<ICreateVoteForm>
  values?: VoteContent[]
}

const MAX_CONTENTS = 10
const INITIAL_CONTENTS_LENGTH = 2

function CreateVoteContents({
  register,
  errors,
  control,
  values,
}: IVoteContentsProps) {
  const [inputCount, setInputCount] = useState(2)
  const { fields, append, remove } = useFieldArray<
    ICreateVoteForm,
    'voteContents',
    'id'
  >({
    control,
    name: 'voteContents',
  })

  const handleAddClick = () => {
    append({ content: '' })
  }

  const handleDeleteClick = (index: number) => {
    remove(index)
  }

  useEffect(() => {
    if (values) {
      setInputCount(values.length)
    }
  }, [values])

  const renderInput = ({
    index,
    value,
    key,
  }: {
    index: number
    value?: string
    key?: string
  }) => (
    <li className="relative flex" key={key}>
      <div className="relative flex w-full">
        <Input
          className={
            errors && errors.voteContents?.[index]
              ? 'border border-red-500'
              : ''
          }
          dataType="array"
          id={`voteContents${index}`}
          hookFormId={String(index)}
          register={register}
          errors={errors}
          hookFormRequired={`${index + 1} 항목을 입력해주세요`}
          placeholder={`${index + 1}번 항목`}
          data-cy={`contentInput-${index + 1}`}
          value={value}
          disabled={!!values}
        />
        {index >= INITIAL_CONTENTS_LENGTH && (
          <button
            className="absolute right-12pxr top-1/2 -translate-y-1/2 text-red-400"
            type="button"
            onClick={() => handleDeleteClick(index)}
          >
            삭제
          </button>
        )}
      </div>
      {errors && (
        <p className="absolute -bottom-20pxr left-4pxr text-14pxr text-red-500">
          {errors.voteContents?.[index]?.message}
        </p>
      )}
    </li>
  )

  return (
    <div className="flex flex-col gap-10pxr">
      <Label htmlFor="voteContents0" theme="small">
        투표 내용
      </Label>
      <div className="flex flex-col gap-20pxr">
        <ul className="flex flex-col gap-20pxr">
          {Array.from({ length: 2 }).map((_, index) =>
            renderInput({ index, key: `default${index}` }),
          )}
          {fields.map(
            (item, index) => index >= 2 && renderInput({ index, key: item.id }),
          )}
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
    </div>
  )
}

export default CreateVoteContents
