'use client'

import deleteVote from 'apis/delete-vote'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface IDeleteDialog {
  voteId?: string
  onClose?: () => void
}

function DeleteDialog({ voteId, onClose }: IDeleteDialog) {
  const router = useRouter()
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
        toast.error('비밀번호가 일치하지않아요.')
        return
      }

      if (response.status === 500) {
        toast.error(
          <div>
            서버 오류에요.
            <br />
            계속해서 문제가 발생하면 관리자에게 문의해주세요.
          </div>,
        )
        return
      }

      toast.success(
        <div data-cy="voteDeletedSuccessMessage">
          투표가 삭제되었어요.
          <br />
          홈으로 이동할게요.
        </div>,
      )

      router.push('/')
    } catch (error) {
      toast.error(
        <div>
          투표를 삭제하는데 실패했어요.
          <br />
          계속해서 문제가 발생하면 관리자에게 문의해주세요.
          <p>{String(error)}</p>
        </div>,
      )
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
      <div className="relative">
        <input
          type="password"
          className={`flex flex-1 items-center rounded-lg bg-[#f2f2f2] px-24pxr py-16pxr ${isError ? 'border border-red-500' : ''}`}
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => handlePasswordChange(e.target.value)}
          data-cy="deleteDialogInput"
        />
        {isError && (
          <p className="absolute left-4pxr text-14pxr text-red-500">
            비밀번호를 입력해주세요.
          </p>
        )}
      </div>
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
