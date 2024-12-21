import React from 'react'

const CheckedIcon = ({ filled, className, strokeColor, ...rest }) => {
  return (
    <svg
      width='16'
      height='11'
      viewBox='0 0 16 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path d='M14.5 1L6.5 9.5L1.5 5' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default CheckedIcon
