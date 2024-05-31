import NavigateTop from '@/assets/svgs/navigate-top'

function FloatingButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className=" fixed bottom-20pxr right-1/2 z-50 flex h-50pxr w-200pxr translate-x-1/2 items-center justify-center rounded-full bg-primary300 sm:bottom-40pxr sm:right-40pxr sm:w-50pxr"
      aria-label="floatingButton"
      onClick={handleClick}
    >
      <NavigateTop />
    </button>
  )
}

export default FloatingButton
