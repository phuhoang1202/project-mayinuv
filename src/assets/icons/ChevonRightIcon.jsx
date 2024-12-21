import React from 'react'

const ChevonRightIcon = ({ className, ...rest }) => {
  return (
    <svg
      width='9'
      height='14'
      viewBox='0 0 9 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path d='M1.5 13L7.5 7L1.5 1' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default ChevonRightIcon
