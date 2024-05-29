'use client'

import { useEffect, useState } from 'react'

function useMount() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}

export default useMount
