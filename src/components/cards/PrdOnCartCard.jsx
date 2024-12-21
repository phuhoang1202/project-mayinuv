import React, { useState } from 'react'
import { Checkbox } from 'antd'

import BellIcon from '@assets/icons/BellIcon'
import noImg from '@assets/images/productImages/no_image.png'
import PrimaryButton from '../buttons/PrimaryButton'

import { formatPrice } from '@utils'

const PrdOnCartCard = ({ name, properties, discount, price, linkImg, soldOut }) => {
  const [amount, setAmount] = useState(1)
  const discountValue = parseFloat(discount) / 100
  const discountedPrice = price * (1 - discountValue)
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }

  const onClose = (e) => {
    e.preventDefault()
  }

  return (
    <div className='p-[4px] sm:p-4 w-full relative'>
      <Checkbox onChange={onChange}>
        {/* top */}
        <div className='flex justify-between ml-2 w-full'>
          <div className='relative h-[50%] w-[35%]'>
            <img src={linkImg ? linkImg : noImg} alt='image prd' className='object-cover w-full h-full' />
            {soldOut && (
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-70'>
                <span className='text-white text-normal font-medium'>품절</span>
              </div>
            )}
          </div>
          <div className={`flex justify-between ${soldOut ? 'opacity-50' : ''} ml-3 w-[65%]`}>
            <div className='w-[90%] sm:pl-8'>
              <p className='text-primaryPrdName lg:text-2xl  font-bold'>{name ? name : '심미안'}</p>
              <p className='text-primaryPrdName text-priceColor lg:text-2xl font-medium text-'>
                {properties ? properties : '100g, 에스프레소'}
              </p>
            </div>
          </div>
        </div>
      </Checkbox>
      {/* bottom */}
      <div className='flex justify-between mt-2 sm:mt-4 items-center align-middle max-w-[500px]'>
        {/* change option product */}
        <div
          className={`text-black font-semibold px-2 py-1 border-[#999999] border-solid border-1 border rounded-[50px] ${
            soldOut ? 'opacity-0' : ''
          }`}
        >
          옵션변경
        </div>

        {!soldOut ? (
          <>
            <strong className='text-black-500 text-normal sm:text-l lg:text-2xl'>{formatPrice(discountedPrice)}</strong>
            <span className='line-through text-gray-500 text-mini sm:text-normal lg:text-2lx text-mini'>
              {formatPrice(price)}
            </span>
            <div className='flex align-middle text-center items-center'>
              {amount === 0 ? null : (
                <div
                  className='w-6 h-6 border-[#999999] border-solid border-1 border'
                  onClick={() => setAmount(amount - 1)}
                >
                  -
                </div>
              )}
              <span className='mx-2'>{amount}</span>
              <div
                className='w-6 h-6 border-[#999999] border-solid border-1 border'
                onClick={() => setAmount(amount + 1)}
              >
                +
              </div>
            </div>
          </>
        ) : (
          <div className='align-middle flex justify-between sm:justify-evenly w-full'>
            <strong className='text-black-500 text-normal sm:text-l lg:text-2xl opacity-50'>
              {formatPrice(price)}
            </strong>
            <PrimaryButton children='재입고알림' leftIcon={BellIcon} />
          </div>
        )}
      </div>
      <div className='absolute top-0 right-0 cursor-pointer text-lg p-2' onClick={onClose}>
        X
      </div>
    </div>
  )
}

export default PrdOnCartCard
