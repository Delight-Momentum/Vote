import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '.'
import { ICreateVoteForm } from './create-vote-form'

interface IVoteSmallInputProps {
  type: 'voteHost' | 'password'
  register?: UseFormRegister<ICreateVoteForm>
  errors?: FieldErrors<ICreateVoteForm>
  value?: string
}

function VoteSmallInput({
  type,
  register,
  errors,
  value,
}: IVoteSmallInputProps) {
  const options = {
    voteHost: {
      labelTexts: '투표 제작자',
      placeholderTexts: '이름을 입력해주세요',
      autoCompleteTypes: 'name',
      inputTypes: 'text',
      dataCy: 'nameInput',
    },
    password: {
      labelTexts: '비밀번호',
      placeholderTexts: '비밀번호를 입력해주세요',
      autoCompleteTypes: 'new-password',
      inputTypes: 'password',
      dataCy: 'passwordInput',
    },
  }

  const error = errors ? errors[type] : undefined

  return (
    <div className="flex w-full flex-col gap-10pxr">
      <Label htmlFor={type} theme="small">
        {options[type].labelTexts}
      </Label>
      <Input
        className={`w-full ${error ? 'border border-red-500' : ''}`}
        dataType="string"
        id={type}
        type={options[type].inputTypes}
        hookFormId={type}
        register={register}
        errors={errors}
        hookFormRequired={options[type].placeholderTexts}
        placeholder={options[type].placeholderTexts}
        autoComplete={options[type].autoCompleteTypes}
        value={value}
        disabled={!!value}
        data-cy={options[type].dataCy}
      />
    </div>
  )
}

export default VoteSmallInput
