import React from 'react'

const IconMember = ({ className, filled, strokeColor, ...rest }) => {
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
        d='M16 18.5V17.0667C16 16.3594 15.6839 15.6811 15.1213 15.181C14.5587 14.6809 13.7956 14.4 13 14.4H7C6.20435 14.4 5.44129 14.6809 4.87868 15.181C4.31607 15.6811 4 16.3594 4 17.0667V18.5'
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {filled && <path d='M16 19H4V15.6667L5.5 14.5556L9 14H13L15 15.1111L16 16.7778V19Z' fill='#5B4DFB' />}

      <path
        d='M10.2 11.6C11.8568 11.6 13.2 10.2569 13.2 8.60001C13.2 6.94315 11.8568 5.60001 10.2 5.60001C8.5431 5.60001 7.19995 6.94315 7.19995 8.60001C7.19995 10.2569 8.5431 11.6 10.2 11.6Z'
        fill={filled ? '#5B4DFB' : 'none'}
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20 18V16.6371C19.9996 16.0332 19.8029 15.4465 19.4409 14.9692C19.0789 14.4919 18.5721 14.151 18 14'
        fill={filled ? '#5B4DFB' : 'none'}
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.2 5.60001C15.7721 5.77056 16.2792 6.15797 16.6413 6.70115C17.0034 7.24433 17.2 7.91239 17.2 8.60001C17.2 9.28762 17.0034 9.95568 16.6413 10.4989C16.2792 11.042 15.7721 11.4295 15.2 11.6'
        fill={filled ? '#5B4DFB' : 'none'}
        stroke={filled ? '#5B4DFB' : '#707070'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default IconMember
