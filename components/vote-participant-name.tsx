import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '.'
import { IVoteForm } from './vote-form'

interface IVoteParticipantNameProps {
  register?: UseFormRegister<IVoteForm>
  errors?: FieldErrors<IVoteForm>
}

function VoteParticipantName({ register, errors }: IVoteParticipantNameProps) {
  const error = errors ? errors.participantName : undefined
  return (
    <div className="flex flex-col gap-10pxr">
      <Label htmlFor="participantName" theme="small">
        투표자 이름
      </Label>
      <div className="relative">
        <Input
          className={`w-full ${error ? 'border border-red-500' : ''}`}
          dataType="string"
          id="participantName"
          placeholder="닉네임을 입력해 주세요"
          hookFormId="participantName"
          hookFormRequired="닉네임을 입력해 주세요"
          register={register}
          errors={errors}
        />
        {errors && (
          <p className="absolute left-4pxr text-14pxr text-red-500">
            {errors.participantName?.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default VoteParticipantName
