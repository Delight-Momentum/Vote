import { InputHTMLAttributes } from 'react'
import { FieldErrors, UseFormRegister, ValidationRule } from 'react-hook-form'
import { ICreateVoteForm } from './create-vote-form'
import { IVoteForm } from './vote-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  dataType?: 'array' | 'string'
  hookFormId?: string
  register?: UseFormRegister<ICreateVoteForm> | UseFormRegister<IVoteForm>
  errors?: FieldErrors<ICreateVoteForm> | FieldErrors<IVoteForm>
  hookFormRequired?: string
  hookFormPattern?: ValidationRule<RegExp>
  hookFormMaxLength?: ValidationRule<number>
  ref?: React.Ref<HTMLInputElement>
}

function Input({
  dataType,
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
          ...(register as UseFormRegister<ICreateVoteForm | IVoteForm>)(
            dataType === 'array' ? `voteContents.${hookFormId}` : hookFormId,
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
