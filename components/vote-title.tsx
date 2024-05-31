import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '.'
import { ICreateVoteForm } from './create-vote-form'

interface IVoteTitleProps {
  register?: UseFormRegister<ICreateVoteForm>
  errors?: FieldErrors<ICreateVoteForm>
  value?: string
}

function VoteTitle({ register, errors, value }: IVoteTitleProps) {
  const error = errors ? errors.voteTitle : undefined

  return (
    <div className="relative flex flex-col gap-10pxr">
      <Label htmlFor="voteTitle" theme="small">
        투표 제목
      </Label>
      <div className="relative">
        <Input
          className={`w-full ${error ? 'border border-red-500' : ''}`}
          dataType="string"
          id="voteTitle"
          hookFormId="voteTitle"
          register={register}
          errors={errors}
          hookFormRequired="제목을 입력해 주세요"
          placeholder="제목을 입력해 주세요"
          data-cy="titleInput"
          value={value}
          disabled={!!value}
        />
        {errors && (
          <p className="absolute left-4pxr text-14pxr text-red-500">
            {errors.voteTitle?.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default VoteTitle
