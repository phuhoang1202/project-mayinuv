import React from 'react'

const PlusIcon = ({ className, ...rest }) => {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path d='M7 1V13' stroke='white' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M1 7L13 7' stroke='white' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  )
}

export default PlusIcon
