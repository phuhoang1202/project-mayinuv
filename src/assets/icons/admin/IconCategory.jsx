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
        d='M13.75 3H6.75C6.28587 3 5.84075 3.18964 5.51256 3.52721C5.18437 3.86477 5 4.32261 5 4.8V19.2C5 19.6774 5.18437 20.1352 5.51256 20.4728C5.84075 20.8104 6.28587 21 6.75 21H17.25C17.7141 21 18.1592 20.8104 18.4874 20.4728C18.8156 20.1352 19 19.6774 19 19.2V8.4L13.75 3Z'
        fill={filled ? '#5B4DFB' : 'none'}
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14 4V9H19'
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16 13H8'
        stroke={filled ? 'white' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16 17H8'
        stroke={filled ? 'white' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10 9H9H8'
        stroke={filled ? 'white' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconBoard
