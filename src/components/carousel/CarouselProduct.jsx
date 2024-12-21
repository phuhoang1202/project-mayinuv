import React from 'react'
import IconLeft from '@assets/images/IconLeft.svg'
import IconRight from '@assets/images/IconRight.svg'

const CarouselProduct = ({ data, type, handlePrev, handleNext }) => {
  return (
    <div className='relative max-w-7xl mx-auto mb-10'>
      <div className='carousel-container mt-7 overflow-hidden'>
        <div className='flex transition-transform duration-300 gap-7 justify-center'>
          {data.map((item, index) => (
            <div
              key={item.id}
              className='flex-none'
              style={{
                width: 'auto',
                flexShrink: 0,
              }}
            >
              {/* Conditional rendering based on type */}
              {type === 'new' ? (
                <div className='relative w-full h-[280px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center'>
                  <img src={item.image} alt={item.text} className='object-cover w-full h-full' />
                  <div className='absolute top-4 right-4 w-[30px] h-[30px] bg-[#28282899] rounded-full flex justify-center items-center'>
                    <img src={item.iconHeartActive} alt='icon heart' />
                  </div>
                </div>
              ) : (
                <div className='relative'>
                  <img src={item.image} alt={`image of ${item.name}`} />
                  <div className='flex w-[30px] h-[30px] bg-[#28282899] rounded-full justify-center items-center absolute top-2 right-2 z-20'>
                    <img src={item.iconHeart} alt='icon heart' />
                  </div>
                </div>
              )}
              {/* Other item details */}
              <div className='flex flex-col gap-1 justify-between mt-2'>
                {type === 'new' ? (
                  <>
                    <div className='font-medium text-textPrd'>{item.text}</div>
                    {/* Additional details for new products */}
                  </>
                ) : (
                  <>
                    <div className='font-medium text-textPrd'>{item.name}</div>
                    <div className='text-normal text-[#8C8C8C]'>{item.description}</div>
                    {/* Additional details for suggested products */}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button className='carousel-button h-12 w-12 prev flex justify-center items-center' onClick={handlePrev}>
          <img src={IconLeft} alt='left arrow' className='w-6 h-6' />
        </button>
        <button className='carousel-button h-12 w-12 next flex justify-center items-center' onClick={handleNext}>
          <img src={IconRight} alt='right arrow' className='w-6 h-6' />
        </button>
      </div>
    </div>
  )
}

export default CarouselProduct
