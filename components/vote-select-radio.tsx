import { ChangeEvent } from 'react'
import { Label, RadioButton } from '.'

interface IVoteSelectRadio {
  type: 'voteMethed' | 'voteParticipant'
  handleValueChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function VoteSelectRadio({ type, handleValueChange }: IVoteSelectRadio) {
  return (
    <div className="flex flex-col gap-10pxr">
      <Label htmlFor={type} theme="small">
        투표 방식
      </Label>
      <div className="flex gap-22pxr">
        <div className="flex items-center gap-4pxr">
          <RadioButton
            name={type}
            value={type === 'voteMethed' ? 'one' : 'public'}
            onValueChange={handleValueChange}
            defaultChecked
          />
          <label
            className="text-16pxr font-medium"
            htmlFor={type === 'voteMethed' ? 'one' : 'public'}
          >
            {type === 'voteMethed' ? '1개만 선택' : '공개'}
          </label>
        </div>
        <div className="flex items-center gap-4pxr">
          <RadioButton
            name={type}
            value={type === 'voteMethed' ? 'multiple' : 'private'}
            onValueChange={handleValueChange}
          />
          <label
            className="text-16pxr font-medium"
            htmlFor={type === 'voteMethed' ? 'multiple' : 'private'}
          >
            {type === 'voteMethed' ? '여러개 선택' : '익명'}
          </label>
        </div>
      </div>
    </div>
  )
}

export default VoteSelectRadio
