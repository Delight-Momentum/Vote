import { useRef, useState, useEffect } from 'react'

function useIntersectionObserver() {
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      setIsVisible(true)
      return
    }

    setIsVisible(false)
  }

  const observe = (target: Element) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(handleIntersect)
    observerRef.current.observe(target)
  }

  const unobserve = (target: Element) => {
    if (observerRef.current) {
      observerRef.current.unobserve(target)
    }
  }

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return { observe, unobserve, isVisible, setIsVisible }
}

export default useIntersectionObserver
