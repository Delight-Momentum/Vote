import { RadioValue, TValue } from '@/hooks/use-radio'
import { Label, RadioButton } from '.'

interface IVoteSelectRadio {
  radioType: 'create' | 'edit'
  method: 'vote' | 'voteParticipant'
  handleValueChange?: (value: TValue) => void
  value?: RadioValue
}

function VoteSelectRadio({
  radioType,
  method,
  handleValueChange,
  value,
}: IVoteSelectRadio) {
  const options = {
    vote: [
      { value: 'one', label: '1개만 선택', dataCy: 'radioOne' },
      { value: 'multiple', label: '여러개 선택', dataCy: 'radioMultiple' },
    ],
    voteParticipant: [
      { value: 'public', label: '공개', dataCy: 'radioPublic' },
      { value: 'private', label: '익명', dataCy: 'radioPrivate' },
    ],
  }

  return (
    <div className="flex flex-col gap-10pxr">
      <Label htmlFor={method} theme="small">
        투표 방식
      </Label>
      <div className="flex gap-22pxr">
        {options[method].map((option) => (
          <div key={option.value} className="flex items-center gap-4pxr">
            <RadioButton
              radioType={radioType}
              radioSize="sm"
              name={method}
              value={option.value}
              onValueChange={handleValueChange}
              disabled={value ? true : value === option.value}
              checked={value ? value === option.value : undefined}
              defaultChecked={
                !value && (option.value === 'one' || option.value === 'public')
              }
              data-cy={option.dataCy}
            />
            <label className="text-16pxr font-medium" htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VoteSelectRadio
