import React from 'react'

const CartIcon = ({ filled, className, strokeColor, ...rest }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill={filled ? '#000000' : 'none'}
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path
        d='M8 23C8.55228 23 9 22.5523 9 22C9 21.4477 8.55228 21 8 21C7.44772 21 7 21.4477 7 22C7 22.5523 7.44772 23 8 23Z'
        fill={filled ? '#000000' : '#D1B584'}
      />
      <path
        d='M17 23C17.5523 23 18 22.5523 18 22C18 21.4477 17.5523 21 17 21C16.4477 21 16 21.4477 16 22C16 22.5523 16.4477 23 17 23Z'
        fill={filled ? '#000000' : '#D1B584'}
      />
      <path d='M20.5 10H6L7.5 18L8 19H17.5L19 18.5L20.5 10Z' fill={filled ? '#000000' : 'none'} />
      <path
        d='M1 5H4.63636L7.07273 17.497C7.15586 17.9267 7.38355 18.3127 7.71595 18.5874C8.04835 18.8621 8.46427 19.0081 8.89091 18.9997H17.7273C18.1539 19.0081 18.5698 18.8621 18.9022 18.5874C19.2346 18.3127 19.4623 17.9267 19.5455 17.497L21 9.66655H5.54545'
        stroke={filled ? '#000000' : '#D1B584'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default CartIcon
