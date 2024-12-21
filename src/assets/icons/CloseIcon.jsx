import React from 'react'

const CloseIcon = ({ filled, className, strokeColor, ...rest }) => {
  return (
    <svg
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path d='M19.5 6.5L6.5 19.5' stroke='#282828' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M6.5 6.5L19.5 19.5' stroke='#282828' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default CloseIcon
