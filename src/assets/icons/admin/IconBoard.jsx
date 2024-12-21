import React from 'react'

const IconBoard = ({ className, filled, strokeColor, ...rest }) => {
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
        d='M10 4H4V10H10V4Z'
        fill={filled ? '#5B4DFB' : 'none'}
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20 4H14V10H20V4Z'
        fill={filled ? '#5B4DFB' : 'none'}
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20 14H14V20H20V14Z'
        fill={filled ? '#5B4DFB' : 'none'}
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10 14H4V20H10V14Z'
        fill={filled ? '#5B4DFB' : 'none'}
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconBoard
