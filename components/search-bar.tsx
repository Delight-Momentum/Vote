import { ChangeEvent } from 'react'
import Input from './input'

interface SearchBarProps {
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <div className="relative mb-60pxr mt-40pxr flex max-w-621pxr flex-1">
      <Input
        className="h-58pxr w-512pxr !rounded-full border border-primary300 bg-white"
        placeholder={placeholder}
        type="search"
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default SearchBar
