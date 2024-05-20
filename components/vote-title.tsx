import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '.'
import { ICreateVoteForm } from './create-vote-form'

interface IVoteTitleProps {
  register?: UseFormRegister<ICreateVoteForm>
  errors?: FieldErrors<ICreateVoteForm>
  value?: string
}

function VoteTitle({ register, errors, value }: IVoteTitleProps) {
  return (
    <div className="relative flex flex-col gap-10pxr">
      <Label htmlFor="voteTitle" theme="small">
        투표 제목
      </Label>
      <Input
        className={errors && (errors.voteTitle ? 'border border-red-500' : '')}
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
    </div>
  )
}

export default VoteTitle
