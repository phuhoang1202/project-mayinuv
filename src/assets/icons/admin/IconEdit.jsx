import React from 'react'

const IconEdit = ({ className, filled, strokeColor, ...rest }) => {
  return (
    <svg
      width={20}
      height={20}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path
        d='M9.87231 16.3207H17.3723'
        stroke={filled ? '#707070' : '#6E89E7'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.6223 2.57068C13.9538 2.23916 14.4035 2.05292 14.8723 2.05292C15.1045 2.05292 15.3343 2.09864 15.5488 2.18748C15.7633 2.27632 15.9582 2.40653 16.1223 2.57068C16.2865 2.73484 16.4167 2.92971 16.5055 3.14419C16.5944 3.35866 16.6401 3.58854 16.6401 3.82068C16.6401 4.05283 16.5944 4.2827 16.5055 4.49718C16.4167 4.71165 16.2865 4.90653 16.1223 5.07068L5.70565 15.4874L2.37231 16.3207L3.20565 12.9874L13.6223 2.57068Z'
        stroke={filled ? '#707070' : '#6E89E7'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconEdit
