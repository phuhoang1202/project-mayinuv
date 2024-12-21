import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import IconLeft from '@assets/images/IconLeft.svg'
import IconRight from '@assets/images/IconRight.svg'
import { useTranslation } from 'react-i18next'

// Custom arrow components
const CustomPrevArrow = (props) => {
  const { onClick } = props
  return (
    <button className='carousel-button h-12 w-12 prev flex justify-center items-center' onClick={onClick}>
      <img src={IconLeft} alt='icon arrow' />
    </button>
  )
}

const CustomNextArrow = (props) => {
  const { onClick } = props
  return (
    <button className='carousel-button h-12 w-12 next flex justify-center items-center' onClick={onClick}>
      <img src={IconRight} alt='icon arrow' />
    </button>
  )
}

function CarouselCommon({ items }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const { t } = useTranslation()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    prevArrow: !isMobile ? <CustomPrevArrow /> : null,
    nextArrow: !isMobile ? <CustomNextArrow /> : null,
    ...(isMobile
      ? {} // Mobile settings (No centerMode or className)
      : {
          className: 'center',
          centerMode: true,
        }),
  }

  // const items = [
  //   {
  //     image: Banner1,
  //     tag: 'tag',
  //     title1: 'Title 교황청 성직자부 장관',
  //     title2: '라자로 유흥식',
  //     text: 'Title 교황청 성직자부 장관라자로 유흥식',
  //   },
  //   {
  //     image: Banner2,
  //     tag: 'tag',
  //     title1: 'Title 교황청 성직자부 장관',
  //     title2: '라자로 유흥식',
  //     text: 'Title 교황청 성직자부 장관라자로 유흥식',
  //   },
  //   {
  //     image: Banner3,
  //     tag: 'tag',
  //     title1: 'Title 교황청 성직자부 장관',
  //     title2: '라자로 유흥식',
  //     text: 'Title 교황청 성직자부 장관라자로 유흥식',
  //   },
  //   {
  //     image: Banner4,
  //     tag: 'tag',
  //     title1: 'Title 교황청 성직자부 장관',
  //     title2: '라자로 유흥식',
  //     text: 'Title 교황청 성직자부 장관라자로 유흥식',
  //   },
  //   {
  //     image: Banner5,
  //     tag: 'tag',
  //     title1: 'Title 교황청 성직자부 장관',
  //     title2: '라자로 유흥식',
  //     text: 'Title 교황청 성직자부 장관라자로 유흥식',
  //   },
  // ]

  return (
    <div className='slider-container lg:max-w-7xl mx-auto w-full overflow-x-hidden lg:mt-10 mt-4'>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className='relative lg:h-auto h-[300px] lg:w-auto w-[372px]'>
            <img src={item.image} alt={`Banner ${index + 1}`} className='w-full h-full object-cover rounded-lg' />
            <div className='absolute inset-0 lg:h-[161px] h-[250px] lg:left-10 lg:top-24 left-5 top-8 flex flex-col lg:justify-start justify-between items-start text-white font-bold gap-4'>
              {/* <div className='w-[60px] h-[25px] bg-[#B7B7B74D] flex justify-center items-center rounded-full py-2 text-small'>
                {item.tag}
              </div> */}
              <div>
                <div className='lg:text-biggerName text-textPrd font-bold'>{item.title1}</div>
                <div className='font-medium lg:text-normal text-small'>{item.text}</div>
              </div>
            </div>

            <div className='w-[57px] h-[30px] bg-[#6C6C6C4D] text-[#FFFFFF66] flex justify-center items-center rounded-full font-medium text-small absolute bottom-5 right-8'>
              <span className='text-white'>{index + 1}</span> / {items.length}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CarouselCommon
