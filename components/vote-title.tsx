import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '.'
import { ICreateVoteForm } from './create-vote-form'

interface IVoteTitleProps {
  register: UseFormRegister<ICreateVoteForm>
  errors: FieldErrors<ICreateVoteForm>
}

function VoteTitle({ register, errors }: IVoteTitleProps) {
  return (
    <div className="relative flex flex-col gap-10pxr">
      <Label htmlFor="voteTitle" theme="small">
        투표 제목
      </Label>
      <Input
        className={errors.voteTitle ? 'border border-red-500' : ''}
        id="voteTitle"
        hookFormId="voteTitle"
        register={register}
        errors={errors}
        hookFormRequired="제목을 입력해 주세요"
        placeholder="제목을 입력해 주세요"
      />
    </div>
  )
}

export default VoteTitle
