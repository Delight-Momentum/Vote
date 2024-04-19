function DeleteDialog() {
  return (
    <div className="flex flex-col justify-center gap-25pxr">
      <div className="flex flex-col gap-15pxr">
        <h1 className="text-22pxr font-semibold">투표를 삭제할까요?</h1>
        <h2 className="text-14pxr font-semibold text-[#6E6E6E]">
          투표를 삭제하면 다시 되돌릴 수 없어요. <br /> 그래도 삭제할까요?
        </h2>
      </div>
      <div className="flex justify-end gap-10pxr">
        <button
          type="button"
          className="p-10pxr font-semibold text-[#6e6e6e] hover:font-bold"
        >
          삭제
        </button>
        <button
          className="p-10pxr font-semibold text-[#6e6e6e] hover:font-bold"
          type="button"
        >
          투표 유지
        </button>
      </div>
    </div>
  )
}

export default DeleteDialog
