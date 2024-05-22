interface HeaderProps {
  children?: string
}

function Header({ children }: HeaderProps) {
  return (
    <header className="header flex w-full items-center justify-between bg-white px-40pxr py-8pxr">
      <div className="flex h-40pxr w-80pxr items-center justify-center bg-[#e6e6e6]">
        로고
      </div>
      <h1 className="text-24pxr font-bold text-[#49454f]">{children}</h1>
    </header>
  )
}

export default Header
