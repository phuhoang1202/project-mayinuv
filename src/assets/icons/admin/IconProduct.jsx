import React from 'react'

const IconProduct = ({ className, filled, strokeColor, ...rest }) => {
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
        d='M10 22C10.5523 22 11 21.5523 11 21C11 20.4477 10.5523 20 10 20C9.44772 20 9 20.4477 9 21C9 21.5523 9.44772 22 10 22Z'
        fill={filled ? '#5B4DFB' : '#707070'}
      />
      <path
        d='M17 22C17.5523 22 18 21.5523 18 21C18 20.4477 17.5523 20 17 20C16.4477 20 16 20.4477 16 21C16 21.5523 16.4477 22 17 22Z'
        fill={filled ? '#5B4DFB' : '#707070'}
      />
      {filled && <path d='M20 10H7L8.34483 17.1111L8.7931 18H17.3103L18.6552 17.5556L20 10Z' fill='#5B4DFB' />}

      <path
        d='M3 6H6.11688L8.20519 16.7117C8.27645 17.08 8.47162 17.4109 8.75653 17.6464C9.04144 17.8818 9.39795 18.0069 9.76364 17.9997H17.3377C17.7034 18.0069 18.0599 17.8818 18.3448 17.6464C18.6297 17.4109 18.8248 17.08 18.8961 16.7117L20.1429 9.9999H6.8961'
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconProduct
