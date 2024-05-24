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
  return (
    <div className="flex flex-col gap-10pxr">
      <Label
        htmlFor={type === 'voteHost' ? 'voteHost' : 'password'}
        theme="small"
      >
        {type === 'voteHost' ? '투표 제작자' : '비밀번호'}
      </Label>
      <Input
        className={
          errors && errors[type === 'voteHost' ? 'voteHost' : 'password']
            ? 'w-full border border-red-500'
            : 'w-full'
        }
        dataType="string"
        id={type === 'voteHost' ? 'voteHost' : 'password'}
        type={type === 'voteHost' ? 'text' : 'password'}
        hookFormId={type === 'voteHost' ? 'voteHost' : 'password'}
        register={register}
        errors={errors}
        hookFormRequired={
          type === 'voteHost'
            ? '이름을 입력해주세요'
            : '비밀번호를 입력해주세요'
        }
        placeholder={
          type === 'voteHost'
            ? '이름을 입력해주세요'
            : '비밀번호를 입력해주세요'
        }
        autoComplete={type === 'voteHost' ? 'name' : 'new-password'}
        value={value && value}
        disabled={!!value}
        data-cy={type === 'voteHost' ? 'nameInput' : 'passwordInput'}
      />
    </div>
  )
}

export default VoteSmallInput
