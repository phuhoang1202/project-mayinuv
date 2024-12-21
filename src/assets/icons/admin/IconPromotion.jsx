import React from 'react'

const IconPromotion = ({ className, filled, strokeColor, ...rest }) => {
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
      {filled && (
        <>
          <path d='M19.5 8.5L12 12L12.5 20.5L20 16.5L19.5 8.5Z' fill='#5B4DFB' />
          <path d='M20 7.5L12.5 3L4 8L12 12L20 7.5Z' fill='#5B4DFB' />
          <path d='M12 21V12L4 8.5V16.5L12 21Z' fill='#5B4DFB' />
        </>
      )}

      <path
        d='M20 15.6007V8.39926C19.9997 8.08354 19.9174 7.77346 19.7614 7.50012C19.6054 7.22678 19.3811 6.9998 19.1111 6.84194L12.8889 3.2412C12.6186 3.08319 12.3121 3 12 3C11.6879 3 11.3814 3.08319 11.1111 3.2412L4.88889 6.84194C4.6189 6.9998 4.39465 7.22678 4.23863 7.50012C4.08262 7.77346 4.00032 8.08354 4 8.39926V15.6007C4.00032 15.9165 4.08262 16.2265 4.23863 16.4999C4.39465 16.7732 4.6189 17.0002 4.88889 17.1581L11.1111 20.7588C11.3814 20.9168 11.6879 21 12 21C12.3121 21 12.6186 20.9168 12.8889 20.7588L19.1111 17.1581C19.3811 17.0002 19.6054 16.7732 19.7614 16.4999C19.9174 16.2265 19.9997 15.9165 20 15.6007Z'
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4 8L12 12L20 8'
        stroke={filled ? 'white' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 21V12'
        stroke={filled ? 'white' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16 10L8 5'
        stroke={filled ? 'white' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconPromotion
