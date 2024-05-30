import Logo from '@/assets/svgs/logo'
import Link from 'next/link'
import CreateVoteButton from './create-vote-button'

interface HeaderProps {
  children?: string
}

function Header({ children }: HeaderProps) {
  return (
    <header className="flex justify-center bg-white px-40pxr py-8pxr">
      <div className="flex w-full max-w-1361pxr items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <h1 className="text-24pxr font-bold text-[#49454f]">{children}</h1>
        {children ? <div className="w-99pxr" /> : <CreateVoteButton />}
      </div>
    </header>
  )
}

export default Header
