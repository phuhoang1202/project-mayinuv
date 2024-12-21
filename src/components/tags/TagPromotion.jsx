import React from 'react'

const TagPromotion = ({ text, textColor }) => {
  return (
    <div className='bg-[#F0F0F0] w-fit px-[3px] mr-[2px] sm:px-[5px] sm:mr-2 sm:py-0.5 2xl:px-[8px] 2xl:mr-3'>
      <span style={{ color: textColor }} className='font-semibold text-xs cursor-default  2xl:text-l'>
        {text}
      </span>
    </div>
  )
}

export default TagPromotion
