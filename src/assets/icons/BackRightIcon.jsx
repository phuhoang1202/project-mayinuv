import React from 'react'

const BackRightIcon = ({ className, ...rest }) => {
  return (
    <svg
      width='10'
      height='16'
      viewBox='0 0 10 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path d='M1.5 1L8.5 8L1.5 15' stroke='#333333' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  )
}

export default BackRightIcon
