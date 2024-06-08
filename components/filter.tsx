import FilterMenu from '@/assets/svgs/filter-menu'

interface IFilterProps {
  order: 'popular' | 'open' | undefined
  onFilterClick: (value: 'popular' | 'open' | undefined) => void
}

function Filter({ order, onFilterClick }: IFilterProps) {
  const filterOptions: {
    name: string
    value: 'popular' | 'open' | undefined
  }[] = [
    { name: '인기순', value: 'popular' },
    { name: '최신순', value: undefined },
    { name: '진행중', value: 'open' },
  ]

  return (
    <ul className="flex overflow-hidden rounded-md border border-gray-300 bg-white font-medium text-gray-700 shadow-sm">
      <div className="flex items-center border-r px-8pxr">
        <FilterMenu />
      </div>
      {filterOptions.map((option, index) => {
        const isLastOption = filterOptions.length - 1 === index
        return (
          <li
            className={`px-12pxr py-8pxr hover:bg-primary200 ${order === option.value ? 'bg-primary300 text-white' : ''} ${isLastOption ? '' : 'border-r'}`}
            key={option.name}
          >
            <button
              type="button"
              onClick={() => {
                onFilterClick(option.value)
              }}
            >
              {option.name}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default Filter
