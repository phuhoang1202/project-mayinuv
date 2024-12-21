import React from 'react'

const ChevronDownIcon = ({ filled, className, strokeColor, ...rest }) => {
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
      <path d='M8 10L12 14L16 10' fill='#282828' />
    </svg>
  )
}

export default ChevronDownIcon
