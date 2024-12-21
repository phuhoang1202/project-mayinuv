import React from 'react'

import { formatPrice } from '@utils'

import noImg from '@assets/images/productImages/no_image.png'
import TagPromotion from '../tags/TagPromotion'
import { Link } from 'react-router-dom'
import { getColorTableAdmin } from '@utils/index'

const ProductCard = ({ name, discount, price, promotion, linkImg, id }) => {
  const discountValue = parseFloat(discount) / 100
  const discountedPrice = price * (1 - discountValue)
  return (
    <Link to={`/product/${id}`} className='hover:text-[#333333]'>
      <div className='cursor-pointer w-full h-[380px]'>
        <div className='w-full border border-gray-100 border-solid border-1 h-3/4 overflow-hidden'>
          <img src={linkImg ? linkImg : noImg} alt='product-img' className='object-cover w-full h-full' />
        </div>

        <div className='h-1/3'>
          <div className='my-4'>
            <p className='text-base sm:text-l lg:text-lg 2xl:text-2xl'>{name ? name : '클럽원두'}</p>
            {discount ? (
              <>
                <strong className='text-red-500 text-base sm:text-l lg:text-lg 2xl:text-2xl'>{discount}%</strong>{' '}
                <strong className='text-black-500 text-base sm:text-l lg:text-lg 2xl:text-2xl'>
                  {formatPrice(discountedPrice)}
                </strong>
                <br></br>
                <span className='line-through text-gray-500 sm:text-l lg:text-lg 2xl:text-2xl'>
                  {formatPrice(price)}
                </span>
              </>
            ) : (
              <span className='mt-2 sm:text-l lg:text-lg 2xl:text-2xl'>{formatPrice(price)}</span>
            )}
          </div>
          {promotion?.length > 0 ? (
            <div className='flex '>
              {promotion?.map((promotion, index) => (
                <TagPromotion key={index} text={promotion?.name} textColor={getColorTableAdmin(promotion?.type)} />
              ))}
            </div>
          ) : (
            <div className='flex justify-between'>
              <div className='w-full'></div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
