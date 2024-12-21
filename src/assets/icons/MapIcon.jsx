import React from 'react'

const MapIcon = ({ className, ...rest }) => {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path
        d='M11.25 22.5L2.5 27.5V7.5L11.25 2.5M11.25 22.5L20 27.5M11.25 22.5V2.5M20 27.5L27.5 22.5V2.5L20 7.5M20 27.5V7.5M20 7.5L11.25 2.5'
        stroke='#333333'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default MapIcon
