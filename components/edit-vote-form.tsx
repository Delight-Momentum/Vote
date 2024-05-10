'use client'

import { ButtonRound, Input, Label } from '@/components/index'
import useRadio from '@/hooks/useRadio'
import RadioButton from './radio-button'

function EditVoteForm() {
  const { radioValues, handleValueChange } = useRadio()
  console.log(radioValues)
  return (
    <form className="flex w-465pxr flex-col gap-48pxr">
      <div className="flex flex-col gap-40pxr">
        <div className="flex flex-col gap-10pxr">
          <Label htmlFor="voteTitle" theme="small">
            투표 제목
          </Label>
          <Input id="voteTitle" placeholder="제목을 입력해 주세요" />
        </div>
        <div className="flex flex-col gap-10pxr">
          <Label htmlFor="voteContent" theme="small">
            투표 내용
          </Label>
          <div className="flex flex-col gap-15pxr">
            <Input id="voteContent" placeholder="1번 항목" />
            <Input placeholder="2번 항목" />
          </div>
        </div>
        <div className="flex flex-col gap-10pxr">
          <Label htmlFor="votePeriod" theme="small">
            투표 기간
          </Label>
          <Input id="votePeriod" type="date" />
        </div>
        <div className="flex flex-col gap-10pxr">
          <Label htmlFor="voteMethod" theme="small">
            투표 방식
          </Label>
          <div className="flex gap-22pxr">
            <div className="flex items-center gap-4pxr">
              <RadioButton
                name="voteMethod"
                value="one"
                handleValueChange={handleValueChange}
                defaultChecked
              />
              <label className="text-16pxr font-medium" htmlFor="one">
                1개만 선택
              </label>
            </div>
            <div className="flex items-center gap-4pxr">
              <RadioButton
                name="voteMethod"
                value="multiple"
                handleValueChange={handleValueChange}
              />
              <label className="text-16pxr font-medium" htmlFor="multiple">
                여러개 선택
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10pxr">
          <Label htmlFor="voteParticipant" theme="small">
            참여자 이름
          </Label>
          <div className="flex gap-22pxr">
            <div className="flex items-center gap-4pxr">
              <RadioButton
                name="voteParticipant"
                value="public"
                handleValueChange={handleValueChange}
                defaultChecked
              />
              <label className="text-16pxr font-medium" htmlFor="public">
                공개
              </label>
            </div>
            <div className="flex items-center gap-4pxr">
              <RadioButton
                name="voteParticipant"
                value="private"
                handleValueChange={handleValueChange}
              />
              <label className="text-16pxr font-medium" htmlFor="private">
                익명
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-20pxr">
          <div className="flex flex-col gap-10pxr">
            <Label htmlFor="voteHostName" theme="small">
              투표 제작자
            </Label>
            <Input
              id="voteHostName"
              className="w-full"
              placeholder="닉네임을 입력해 주세요"
            />
          </div>
          <div className="flex flex-col gap-10pxr">
            <Label htmlFor="password" theme="small">
              비밀번호
            </Label>
            <Input
              id="password"
              className="w-full"
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-20pxr">
        <ButtonRound variant="primary" size="sm">
          재투표 하기
        </ButtonRound>
        <ButtonRound variant="primary" size="sm">
          수정완료
        </ButtonRound>
      </div>
    </form>
  )
}

export default EditVoteForm
