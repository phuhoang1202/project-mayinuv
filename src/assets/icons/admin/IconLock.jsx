import React from 'react'

const IconLock = ({ className, filled, strokeColor, ...rest }) => {
  return (
    <>
      {filled ? (
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
            d='M15.1851 9.16667H4.81473C3.99653 9.16667 3.33325 9.91286 3.33325 10.8333V16.6667C3.33325 17.5871 3.99653 18.3333 4.81473 18.3333H15.1851C16.0033 18.3333 16.6666 17.5871 16.6666 16.6667V10.8333C16.6666 9.91286 16.0033 9.16667 15.1851 9.16667Z'
            stroke='#707070'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M5.83325 9.16667V5.83334C5.83325 4.72827 6.27224 3.66846 7.05364 2.88706C7.83504 2.10566 8.89485 1.66667 9.99992 1.66667C11.105 1.66667 12.1648 2.10566 12.9462 2.88706C13.7276 3.66846 14.1666 4.72827 14.1666 5.83334V9.16667'
            stroke='#707070'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <ellipse cx='10.0001' cy='14.1667' rx='0.833333' ry='0.833333' fill='#707070' />
        </svg>
      ) : (
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
            d='M15.1851 9.16666H4.81473C3.99653 9.16666 3.33325 9.91285 3.33325 10.8333V16.6667C3.33325 17.5871 3.99653 18.3333 4.81473 18.3333H15.1851C16.0033 18.3333 16.6666 17.5871 16.6666 16.6667V10.8333C16.6666 9.91285 16.0033 9.16666 15.1851 9.16666Z'
            stroke='#ED8559'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <ellipse cx='10.0001' cy='14.1667' rx='0.833333' ry='0.833333' fill='#ED8559' />
          <path
            d='M5.83325 9.16667V5.83334C5.83222 4.80005 6.21515 3.80323 6.90773 3.03639C7.60031 2.26956 8.55311 1.78742 9.58117 1.68358C10.6092 1.57974 11.6392 1.86159 12.4711 2.47443C13.3031 3.08728 13.8776 3.98738 14.0833 5.00001'
            stroke='#ED8559'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </>
  )
}

export default IconLock
