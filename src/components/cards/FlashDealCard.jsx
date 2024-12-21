import React from 'react'
import { formatPrice } from '@utils'
import CardIcon from '@assets/icons/CardIcon'
import CardIconActive from '@assets/icons/CardIconActive'

const FlashDealCard = ({ linkImg, name, desc, discount, price }) => {
  const discountValue = parseFloat(discount) / 100
  const discountedPrice = price * (1 - discountValue)
  return (
    <div className=''>
      <div className='w-full relative'>
        <img src={linkImg} alt='product image' className='w-full h-full object-cover' />
        <button className='absolute bottom-2 right-2 bg-gray-500 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer'>
          <CardIconActive />
        </button>
      </div>

      <div className='mt-2 sm:mt-4'>
        <p className='text-xl sm:text-primaryPrdName lg:text-2xl font-bold'>{name}</p>
        <div className='flex justify-between items-center'>
          <p className='text-normal sm:text-primaryPrdName lg:text-2xl'>{desc}</p>
          <div className='border border-solid border-l-1 border-black border-y-0 border-r-0 sm:border-l-0'>
            <p className='text-normal font-bold'>
              <span className='text-red-500 text-normal sm:text-primaryPrdName lg:text-2xl mr-2 sm:mr-4'>
                {discount}
              </span>
              <span className='text-black text-normal sm:text-primaryPrdName lg:text-2xl'>
                {formatPrice(discountedPrice)}
              </span>
            </p>
            <p className='line-through font-bold text-priceColor'>{formatPrice(price)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashDealCard
