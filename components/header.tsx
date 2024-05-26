import Logo from '@/assets/svgs/logo'

interface HeaderProps {
  children?: string
}

function Header({ children }: HeaderProps) {
  return (
    <header className="header flex w-full items-center justify-between bg-white px-40pxr py-8pxr">
      <Logo />
      <h1 className="text-24pxr font-bold text-[#49454f]">{children}</h1>
    </header>
  )
}

export default Header
