import React from 'react'

const ReduceIcon = ({ className, strokeColor, ...rest }) => {
  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <rect x='0.5' width='24' height='24' rx='4' fill='#EFEFEF' />
      <path
        d='M6.5 12L18.5 12'
        stroke={strokeColor ? strokeColor : '#D3D2D2'}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  )
}

export default ReduceIcon
