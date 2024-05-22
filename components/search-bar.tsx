import { ChangeEvent } from 'react'
import Input from './input'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string
}

function SearchBar({
  placeholder,
  value,
  onChange,
  defaultValue,
}: SearchBarProps) {
  return (
    <div className="relative mb-60pxr mt-40pxr flex w-320pxr flex-1 md:w-480pxr lg:w-560pxr 2xl:w-720pxr">
      <Input
        className="h-58pxr w-512pxr !rounded-full border border-primary300 bg-white"
        placeholder={placeholder}
        type="search"
        onChange={onChange}
        value={value}
        data-cy="searchInput"
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default SearchBar
