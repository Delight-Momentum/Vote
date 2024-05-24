'use client'

import deleteVote from 'apis/delete-vote'
import { useState } from 'react'

interface IDeleteDialog {
  voteId?: string
  onClose?: () => void
}

function DeleteDialog({ voteId, onClose }: IDeleteDialog) {
  const [isError, setIsError] = useState(false)
  const [password, setPassword] = useState('')

  const handleDeleteVote = async () => {
    try {
      if (!voteId) return
      if (!password || password === '') {
        setIsError(true)
        return
      }
      const response = await deleteVote({
        id: voteId,
        body: { password },
      })

      if (response.status === 401) {
        setIsError(true)
        alert('비밀번호가 일치하지않아요')
        return
      }

      if (response.status === 500) {
        alert('서버 오류입니다. 다시 시도해주세요.')
        return
      }

      alert('투표가 삭제되었습니다.')
    } catch (error) {
      console.error('Error deleting vote:', error)
    }
  }

  const handlePasswordChange = (passwordValue: string) => {
    setPassword(passwordValue)

    if (isError) {
      setIsError(false)
    }
  }

  return (
    <div className="flex flex-col justify-center gap-25pxr">
      <div className="flex flex-col gap-15pxr">
        <h1 className="text-22pxr font-semibold">투표를 삭제할까요?</h1>
        <h2 className="text-14pxr font-semibold text-[#6E6E6E]">
          투표를 삭제하면 다시 되돌릴 수 없어요. <br /> 그래도 삭제할까요?
        </h2>
      </div>
      <input
        type="password"
        className={`flex flex-1 items-center rounded-lg bg-[#f2f2f2] px-24pxr py-16pxr ${isError ? 'border border-red-500' : ''}`}
        placeholder="비밀번호를 입력해주세요"
        onChange={(e) => handlePasswordChange(e.target.value)}
        data-cy="deleteDialogInput"
      />
      <div className="flex justify-end gap-10pxr">
        <button
          type="button"
          className="p-10pxr font-semibold text-[#6e6e6e] hover:font-bold"
          onClick={() => handleDeleteVote()}
          data-cy="deleteDialogButton"
        >
          삭제
        </button>
        <button
          className="p-10pxr font-semibold text-primary300 hover:font-bold"
          type="button"
          onClick={() => onClose && onClose()}
        >
          투표 유지
        </button>
      </div>
    </div>
  )
}

export default DeleteDialog
