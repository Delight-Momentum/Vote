import { TValue } from '@/hooks/use-radio'
import { Label, RadioButton } from '.'

interface IVoteSelectRadio {
  type: 'voteMethod' | 'voteParticipantMethod'
  handleValueChange?: (value: TValue) => void
  value?: string
}

function VoteSelectRadio({ type, handleValueChange, value }: IVoteSelectRadio) {
  return (
    <div className="flex flex-col gap-10pxr">
      <Label htmlFor={type} theme="small">
        투표 방식
      </Label>
      <div className="flex gap-22pxr">
        <div className="flex items-center gap-4pxr">
          <RadioButton
            radioSize="sm"
            name={type}
            value={type === 'voteMethod' ? 'one' : 'public'}
            onValueChange={handleValueChange}
            disabled={value ? true : value === 'one' || value === 'public'}
            checked={value ? value === 'one' || value === 'public' : undefined}
            defaultChecked={!value}
            data-cy={type === 'voteMethod' ? 'radioOne' : 'radioPublic'}
          />
          <label
            className="text-16pxr font-medium"
            htmlFor={type === 'voteMethod' ? 'one' : 'public'}
          >
            {type === 'voteMethod' ? '1개만 선택' : '공개'}
          </label>
        </div>
        <div className="flex items-center gap-4pxr">
          <RadioButton
            radioSize="sm"
            name={type}
            value={type === 'voteMethod' ? 'multiple' : 'private'}
            onValueChange={handleValueChange}
            disabled={value ? true : value === 'multiple' || value === 'public'}
            checked={
              value ? value === 'multiple' || value === 'private' : undefined
            }
            data-cy={type === 'voteMethod' ? 'radioMultiple' : 'radioPrivate'}
          />
          <label
            className="text-16pxr font-medium"
            htmlFor={type === 'voteMethod' ? 'multiple' : 'private'}
          >
            {type === 'voteMethod' ? '여러개 선택' : '익명'}
          </label>
        </div>
      </div>
    </div>
  )
}

export default VoteSelectRadio
