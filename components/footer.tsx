import Logo from '@/assets/svgs/logo'

function Footer() {
  return (
    <div className="flex h-200pxr flex-col items-center justify-center gap-10pxr bg-[linear-gradient(180deg,rgba(247,245,250,0.20)_0%,rgba(126,71,225,0.20)_100%)] py-40pxr">
      <Logo fill="#9E9E9E" />
      <p className="text-12pxr font-medium text-[#9E9E9E]">
        Copyright by 2024. Delight Momentum. All Rights Reserved
      </p>
    </div>
  )
}

export default Footer
