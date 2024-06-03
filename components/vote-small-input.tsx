import React from 'react'
import { FieldErrors, UseFormRegister, ValidationRule } from 'react-hook-form'
import { Input, Label } from '.'
import { ICreateVoteForm } from './create-vote-form'

interface IVoteSmallInputProps {
  type: 'voteHost' | 'password'
  register?: UseFormRegister<ICreateVoteForm>
  errors?: FieldErrors<ICreateVoteForm>
  value?: string
  pattern?: ValidationRule<RegExp>
}

function VoteSmallInput({
  type,
  register,
  errors,
  value,
  pattern,
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
      <div className="relative">
        <Input
          className={`max-h-58pxr w-full ${error ? 'border border-red-500' : ''}`}
          dataType="string"
          id={type}
          type={options[type].inputTypes}
          hookFormId={type}
          register={register}
          hookFormPattern={pattern}
          errors={errors}
          hookFormRequired={options[type].placeholderTexts}
          placeholder={options[type].placeholderTexts}
          autoComplete={options[type].autoCompleteTypes}
          value={value}
          disabled={!!value}
          data-cy={options[type].dataCy}
        />
        {errors && (
          <p className="absolute left-4pxr text-14pxr text-red-500">
            {errors[type]?.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default VoteSmallInput
