import React from 'react'

const BackIcon = ({ className, ...rest }) => {
  return (
    <svg
      width='14'
      height='26'
      viewBox='0 0 8 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path d='M7 13L1 7L7 1' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default BackIcon
