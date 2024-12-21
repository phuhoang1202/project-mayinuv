import React from 'react'

const IconDashboard = ({ className, filled, strokeColor, ...rest }) => {
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
        d='M5 9.6L12 4L19 9.6V18.4C19 18.8243 18.8361 19.2313 18.5444 19.5314C18.2527 19.8314 17.857 20 17.4444 20H6.55556C6.143 20 5.74733 19.8314 5.45561 19.5314C5.16389 19.2313 5 18.8243 5 18.4V9.6Z'
        fill={filled ? '#5B4DFB' : 'none'}
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10 20V16H14V20'
        stroke={filled ? 'none' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill={filled ? 'white' : 'none'}
      />
    </svg>
  )
}

export default IconDashboard
