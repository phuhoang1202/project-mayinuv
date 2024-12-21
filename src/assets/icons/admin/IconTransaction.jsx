import React from 'react'

const IconTransaction = ({ className, filled, strokeColor, ...rest }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path
        d='M19.3636 6H4.63636C3.73262 6 3 6.67157 3 7.5V16.5C3 17.3284 3.73262 18 4.63636 18H19.3636C20.2674 18 21 17.3284 21 16.5V7.5C21 6.67157 20.2674 6 19.3636 6Z'
        fill={filled ? '#5B4DFB' : 'none'}
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3 10L21 10'
        stroke={filled ? 'white' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5 13H10.6'
        stroke={filled ? 'white' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconTransaction
