import { VoteContent } from 'apis/get-vote'
import { CheckboxButton, Label, RadioButton } from '.'

interface IVoteSelectContentProps {
  title: string | undefined
  contents: VoteContent[] | undefined
  onValueChange: (value: string) => void
  voteMethod: 'one' | 'multiple' | undefined
}

function VoteSelectContent({
  title,
  contents,
  onValueChange,
  voteMethod,
}: IVoteSelectContentProps) {
  return (
    <div className="flex flex-col gap-20pxr">
      <Label className="break-all" htmlFor="vote" theme="normal">
        {title || '투표 제목'}
      </Label>
      <div className="flex flex-col gap-16pxr">
        <ul className="flex flex-col gap-10pxr">
          {contents &&
            contents.map((content, index) => (
              <li key={`${content}${index + 1}`}>
                <div
                  className="flex w-full items-center justify-between gap-10pxr rounded-lg bg-white py-12pxr pl-24pxr pr-10pxr"
                  data-cy={`voteContent${index + 1}`}
                >
                  <label
                    className="w-full overflow-hidden text-ellipsis break-all text-16pxr"
                    htmlFor={content.id.toString()}
                  >
                    {content.content}
                  </label>
                  {voteMethod === 'one' ? (
                    <RadioButton
                      id={content.id.toString()}
                      radioType="create"
                      radioSize="lg"
                      name="voteContent"
                      value={content.id.toString()}
                      onValueChange={onValueChange}
                    />
                  ) : (
                    <CheckboxButton
                      name="voteContent"
                      value={content.id.toString()}
                      onValueChange={onValueChange}
                    />
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default VoteSelectContent
