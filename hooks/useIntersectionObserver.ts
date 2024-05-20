import { useRef, useState, useEffect } from 'react'

function useIntersectionObserver() {
  const [isVisible, setIsVisible] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting)
      },
      { threshold: 0.8 },
    )
  }, [])

  const observe = (element: HTMLDivElement) => {
    if (observerRef.current && element) {
      observerRef.current.observe(element)
    }
  }

  const unobserve = (element: HTMLDivElement) => {
    if (observerRef.current && element) {
      observerRef.current.unobserve(element)
    }
  }

  return { observe, unobserve, isVisible, setIsVisible }
}

export default useIntersectionObserver
