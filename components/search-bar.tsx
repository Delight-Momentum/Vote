import Input from './input'

interface SearchBarProps {
  placeholder?: string
}

function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className="relative mb-60pxr mt-40pxr flex max-w-621pxr flex-1">
      <Input
        className="h-58pxr !rounded-full border border-primary300 bg-white"
        placeholder={placeholder}
        data-cy="searchBarInput"
      />
    </div>
  )
}

export default SearchBar
