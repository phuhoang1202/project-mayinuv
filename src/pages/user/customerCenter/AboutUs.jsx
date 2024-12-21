import React from 'react'
import AboutUs1 from '@assets/images/aboutUs/AboutUs1.png'
import AboutUs2 from '@assets/images/aboutUs/AboutUs2.png'
import AboutUs3 from '@assets/images/aboutUs/AboutUs3.png'
import AboutUs4 from '@assets/images/aboutUs/AboutUs4.png'
import AboutUs5 from '@assets/images/aboutUs/AboutUs5.png'

export default function AboutUs() {
  return (
    <div className='lg:max-w-7xl w-full mx-auto mt-20 text-[#3B3B3B] lg:px-0 px-5'>
      <div className='flex flex-col gap-6 lg:w-[843px] w-full'>
        <h3 className='font-bold text-textPrd'>회사 소개</h3>
        <div className='flex flex-col gap-4'>
          <div className='h-80'>
            <img src={AboutUs1} alt='image' className='h-full w-full object-cover rounded-lg' />
          </div>
          <p className='leading-6'>
            Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim
            turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis
            egestas erat urna interdum. Posuere non ac justo tortor. Et amet blandit feugiat mattis netus eu mauris
            suscipit amet. Purus pretium ut diam et netus venenatis ultricies pulvinar dignissim. In turpis congue eget
            sit. Tempus sit nam aliquet blandit in in leo tortor. Mattis sed a ut sed ipsum ut.
          </p>
          <p className='leading-6'>
            Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim
            turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis
            egestas erat urna interdum. Posuere non ac justo tortor. Lorem ipsum dolor sit amet consectetur. Lobortis
            sagittis vulputate enim tincidunt vel pulvinar id enim turpis. Eget imperdiet pellentesque justo id ut
            tellus senectus auctor feugiat. Pellentesque convallis egestas erat urna interdum. Posuere non ac justo
            tortor.
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex items-center flex-col md:flex-row gap-8 justify-between'>
            <img src={AboutUs2} alt='image' className='w-full h-[261px] object-cover rounded-lg' />
            <img src={AboutUs3} alt='image' className='w-full h-[261px] object-cover rounded-lg' />
          </div>
          <p className='leading-6'>
            Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim
            turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis
            egestas erat urna interdum. Posuere non ac justo tortor. Et amet blandit feugiat mattis netus eu mauris
            suscipit amet. Purus pretium ut diam et netus venenatis ultricies pulvinar dignissim. In turpis congue eget
            sit. Tempus sit nam aliquet blandit in in leo tortor. Mattis sed a ut sed ipsum ut.
          </p>

          <p className='leading-6'>
            Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim
            turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis
            egestas erat urna interdum. Posuere non ac justo tortor.
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col md:flex-row  items-center gap-8 justify-between'>
            <img src={AboutUs4} alt='image' className='w-full h-[261px] object-cover rounded-lg' />
            <img src={AboutUs5} alt='image' className='w-full h-[261px] object-cover rounded-lg' />
          </div>
          <p className='leading-6'>
            Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim
            turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis
            egestas erat urna interdum. Posuere non ac justo tortor. Et amet blandit feugiat mattis netus eu mauris
            suscipit amet. Purus pretium ut diam et netus venenatis ultricies pulvinar dignissim. In turpis congue eget
            sit.
          </p>
        </div>
      </div>
    </div>
  )
}
