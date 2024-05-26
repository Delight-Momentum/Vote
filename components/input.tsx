import { ChangeEvent, InputHTMLAttributes } from 'react'
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
  value?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
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
  value,
  onChange,
  ...props
}: InputProps) {
  const renderInput = () => {
    switch (type) {
      case 'search':
        return (
          <input
            type={type}
            className={`flex flex-1 items-center rounded-lg px-24pxr py-16pxr ${className}`}
            value={value || ''}
            onChange={onChange}
            {...props}
          />
        )

      default:
        return register ? (
          <input
            type={type}
            className={`flex flex-1 items-center rounded-lg px-24pxr py-16pxr ${className}`}
            {...(register &&
              hookFormId !== undefined && {
                ...(register as UseFormRegister<ICreateVoteForm | IVoteForm>)(
                  dataType === 'array'
                    ? `voteContents.${hookFormId}`
                    : hookFormId,
                  {
                    required: `${hookFormRequired}`,
                    ...(hookFormPattern ? { pattern: hookFormPattern } : {}),
                    ...(hookFormMaxLength
                      ? { maxLength: hookFormMaxLength }
                      : {}),
                  },
                ),
              })}
            value={value}
            {...props}
          />
        ) : (
          <div
            className={`flex min-h-56pxr flex-1 items-center rounded-lg bg-[#E6E6E7] px-24pxr py-16pxr ${className}`}
          >
            {value}
          </div>
        )
    }
  }

  return renderInput()
}

export default Input
