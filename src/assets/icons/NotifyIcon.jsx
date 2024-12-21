import React from 'react'

const NotifyIcon = ({ className, ...rest }) => {
  return (
    <svg
      width='7'
      height='6'
      viewBox='0 0 7 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
      {...rest}
    >
      <circle cx='3.5' cy='3' r='3' fill='#F14646' />
    </svg>
  )
}

export default NotifyIcon
