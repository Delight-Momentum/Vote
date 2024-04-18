import ModeEdit from '@/assets/svgs/mode-edit'
import Input from './input'

interface SearchBarProps {
  placeholder?: string
}

function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className="relative flex max-w-621pxr flex-1">
      <Input
        className="h-58pxr rounded-[28px] bg-white"
        placeholder={placeholder}
        data-cy="searchBarInput"
      />
      <button
        type="button"
        data-cy="searchBarButton"
        className="absolute bottom-5pxr right-5pxr top-5pxr flex h-48pxr w-48pxr items-center justify-center rounded-full bg-gray p-8pxr
        "
        aria-label={placeholder}
      >
        <ModeEdit />
      </button>
    </div>
  )
}

export default SearchBar
