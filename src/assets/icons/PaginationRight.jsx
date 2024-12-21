import React from 'react'

const PaginationRight = ({ className, ...rest }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path d='M13 17L18 12L13 7' stroke='#282828' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M6 17L11 12L6 7' stroke='#282828' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default PaginationRight
