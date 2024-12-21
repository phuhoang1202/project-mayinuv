import { ArrowUpOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Function to handle scroll
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Function to scroll to top
  const ScrollToTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div>
      {isVisible && (
        <button
          onClick={ScrollToTopButton}
          className='fixed bottom-20 right-10 flex justify-center items-center rounded-full z-50 bg-white h-14 w-14 duration-300 ease-in-out'
          style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 5px 10px' }}
        >
          <ArrowUpOutlined style={{ color: 'black' }} />
        </button>
      )}
    </div>
  )
}
