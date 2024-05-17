import { useMemo, useState } from 'react'

function useIntersectionObserver() {
  const [isVisible, setIsVisible] = useState(true)

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          setIsVisible(entries[0].isIntersecting)
        },
        { threshold: 0.8 },
      ),
    [],
  )

  const observe = (element: HTMLDivElement) => {
    observer.observe(element)
  }

  const unobserve = (element: HTMLDivElement) => {
    observer.unobserve(element)
  }

  return { observe, unobserve, isVisible, setIsVisible }
}

export default useIntersectionObserver
