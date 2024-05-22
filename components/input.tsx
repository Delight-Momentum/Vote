import { InputHTMLAttributes } from 'react'
import { FieldErrors, UseFormRegister, ValidationRule } from 'react-hook-form'
import { ICreateVoteForm } from './create-vote-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hookFormId?: number | string
  register?: UseFormRegister<ICreateVoteForm>
  errors?: FieldErrors<ICreateVoteForm>
  hookFormRequired?: string
  hookFormPattern?: ValidationRule<RegExp>
  hookFormMaxLength?: ValidationRule<number>
}

function Input({
  type,
  className,
  hookFormId,
  register,
  errors,
  hookFormRequired,
  hookFormPattern,
  hookFormMaxLength,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={`flex flex-1 items-center rounded-lg px-24pxr py-16pxr ${className}`}
      {...(register &&
        hookFormId !== undefined && {
          ...register(
            typeof hookFormId === 'number'
              ? `voteContents.${hookFormId}`
              : hookFormId,
            {
              required: `${hookFormRequired}`,
              ...(hookFormPattern ? { pattern: hookFormPattern } : {}),
              ...(hookFormMaxLength ? { maxLength: hookFormMaxLength } : {}),
            },
          ),
        })}
      {...props}
    />
  )
}

export default Input
