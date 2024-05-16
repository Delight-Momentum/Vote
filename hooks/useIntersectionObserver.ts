import { useState } from 'react'

function useIntersectionObserver(callback: () => void) {
  const [isVisible, setIsVisible] = useState(true)
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true)
        callback()
      }
    },
    { threshold: 0.8 },
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
