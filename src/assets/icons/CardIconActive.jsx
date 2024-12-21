import React from 'react'

const CardIconActive = ({ className, strokeColor, ...rest }) => {
  return (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <path
        d='M4.00014 13H17.1359C18.1487 13 18.6551 13 19.0582 12.8112C19.4134 12.6448 19.7118 12.3777 19.9163 12.0432C20.1485 11.6633 20.2044 11.16 20.3163 10.1534L20.9013 4.88835C20.9355 4.58088 20.9525 4.42715 20.9031 4.30816C20.8597 4.20366 20.7821 4.11697 20.683 4.06228C20.5702 4 20.4155 4 20.1062 4H3.50014M1 1H2.24844C2.51306 1 2.64537 1 2.74889 1.05032C2.84002 1.09463 2.91554 1.16557 2.96544 1.25376C3.02212 1.35394 3.03037 1.48599 3.04688 1.7501L3.95312 16.2499C3.96963 16.514 3.97788 16.6461 4.03456 16.7462C4.08446 16.8344 4.15998 16.9054 4.25111 16.9497C4.35463 17 4.48694 17 4.75156 17H18M6.5 20.5H6.51M15.5 20.5H15.51M7 20.5C7 20.7761 6.77614 21 6.5 21C6.22386 21 6 20.7761 6 20.5C6 20.2239 6.22386 20 6.5 20C6.77614 20 7 20.2239 7 20.5ZM16 20.5C16 20.7761 15.7761 21 15.5 21C15.2239 21 15 20.7761 15 20.5C15 20.2239 15.2239 20 15.5 20C15.7761 20 16 20.2239 16 20.5Z'
        stroke={strokeColor ? strokeColor : '#000000'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default CardIconActive
