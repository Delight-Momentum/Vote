import Logo from '@/assets/svgs/logo'
import Link from 'next/link'
import CreateVoteButton from './create-vote-button'

interface HeaderProps {
  onLogoClick: () => void
  children?: string
}

function Header({ onLogoClick, children }: HeaderProps) {
  return (
    <header className="flex justify-center bg-white px-12pxr py-8pxr sm:px-40pxr">
      <div className="flex w-full max-w-1361pxr items-center justify-between">
        <Link href="/" onClick={onLogoClick}>
          <Logo />
        </Link>
        <h1 className="text-nowrap text-22pxr font-bold text-[#49454f] sm:text-24pxr">
          {children}
        </h1>
        {children ? (
          <div className="shrink-1 flex w-full max-w-99pxr" />
        ) : (
          <CreateVoteButton />
        )}
      </div>
    </header>
  )
}

export default Header
