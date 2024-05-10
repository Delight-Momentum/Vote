'use client'

import { ButtonRound, Input, Label, RadioButton } from '@/components/index'

function VoteForm() {
  return (
    <form className="flex w-465pxr flex-col gap-48pxr">
      <div className="flex flex-col gap-40pxr">
        <div className="flex flex-col gap-20pxr">
          <Label htmlFor="vote" theme="normal">
            가장 최고의 아이돌은?
          </Label>
          <div className="flex flex-col gap-16pxr">
            <div className="flex flex-col gap-10pxr">
              <div className="flex justify-between bg-white py-12pxr pl-24pxr pr-10pxr">
                <label className="text-16pxr" htmlFor="private">
                  빅뱅
                </label>
                <RadioButton
                  size="lg"
                  name="vote"
                  value="private"
                  handleValueChange={() => {}}
                />
              </div>
              <div className="flex justify-between bg-white py-12pxr pl-24pxr pr-10pxr">
                <label className="text-16pxr" htmlFor="private">
                  빅뱅
                </label>
                <RadioButton
                  size="lg"
                  name="vote"
                  value="private"
                  handleValueChange={() => {}}
                />
              </div>
            </div>
            <ul className="flex list-inside list-disc flex-col gap-5pxr">
              <li className="text-[#616161]">
                이 투표는 1개만 선택이 가능해요.
              </li>
              <li className="text-[#616161]">
                12월 30일 12:00pm에 투표가 종료됩니다.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-10pxr">
          <Label htmlFor="voteParticipantName" theme="small">
            투표자 이름
          </Label>
          <Input
            id="voteParticipantName"
            placeholder="닉네임을 입력해 주세요"
          />
        </div>
      </div>
      <ButtonRound variant="primary" size="lg">
        투표 하기
      </ButtonRound>
      <div className="flex gap-20pxr">
        <ButtonRound variant="primary" size="sm">
          삭제하기
        </ButtonRound>
        <ButtonRound variant="primary" size="sm">
          수정하기
        </ButtonRound>
      </div>
    </form>
  )
}

export default VoteForm
