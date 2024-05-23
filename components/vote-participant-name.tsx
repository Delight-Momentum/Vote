import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '.'
import { IVoteForm } from './vote-form'

interface IVoteParticipantNameProps {
  register?: UseFormRegister<IVoteForm>
  errors?: FieldErrors<IVoteForm>
}

function VoteParticipantName({ register, errors }: IVoteParticipantNameProps) {
  return (
    <div className="flex flex-col gap-10pxr">
      <Label htmlFor="participantName" theme="small">
        투표자 이름
      </Label>
      <Input
        dataType="string"
        id="participantName"
        placeholder="닉네임을 입력해 주세요"
        hookFormId="participantName"
        register={register}
        errors={errors}
      />
    </div>
  )
}

export default VoteParticipantName
