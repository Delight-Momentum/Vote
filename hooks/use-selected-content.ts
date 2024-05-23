import { useState } from 'react'

interface IUseSelectedContent {
  method: 'one' | 'multiple' | undefined
}

function useSelectedContent({ method }: IUseSelectedContent) {
  const [selectedContent, setSelectedContent] = useState<string[]>([])

  const handleChangeSelectedContent = (value: string) => {
    switch (method) {
      case 'one':
        setSelectedContent([value])
        break

      case 'multiple':
        if (selectedContent.includes(value)) {
          setSelectedContent(
            selectedContent.filter((content) => content !== value),
          )
          break
        }
        setSelectedContent([...selectedContent, value])
        break

      default:
        break
    }
  }

  return { selectedContent, handleChangeSelectedContent }
}

export default useSelectedContent
