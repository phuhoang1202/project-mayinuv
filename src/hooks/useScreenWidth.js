import { useState, useEffect } from 'react'

const IS_SERVER = typeof window === 'undefined'

const useScreenWidth = () => {
  const readScreenWidth = () => {
    if (IS_SERVER) {
      return undefined
    }
    return window.innerWidth
  }

  const [screenWidth, setScreenWidth] = useState(() => readScreenWidth())

  const handleResize = () => {
    const newScreenWidth = readScreenWidth()
    if (newScreenWidth !== undefined) {
      setScreenWidth(newScreenWidth)
    }
  }

  useEffect(() => {
    // Set initial width
    handleResize()

    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return screenWidth
}

export default useScreenWidth
