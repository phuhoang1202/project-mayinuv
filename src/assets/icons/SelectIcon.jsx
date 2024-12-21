import React from 'react'

const SelectIcon = ({ className, ...rest }) => {
  return (
    <svg
      width='14'
      height='7'
      viewBox='0 0 14 7'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path d='M0 0L7 7L14 0' fill='#282828' />
    </svg>
  )
}

export default SelectIcon
