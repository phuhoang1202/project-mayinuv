import React from 'react'
import Service1 from '@assets/images/serviceImage/Service1.png'
import Service2 from '@assets/images/serviceImage/Service2.png'
import Service3 from '@assets/images/serviceImage/Service3.png'
import Service4 from '@assets/images/serviceImage/Service4.png'
import { Tabs } from 'antd'

const onChange = (key) => {
  console.log(key)
}

// Hàm render ra giao diện cho nội dung các tab
const renderTabContent = () => {
  return (
    <div className='flex flex-col gap-6 lg:w-[843px] w-full font-nunito'>
      <h3 className='font-bold text-textPrd'>서비스 소개</h3>
      <div className='flex flex-col gap-4'>
        <div className='h-80'>
          <img src={Service1} alt='image' className='h-full w-full object-cover rounded-lg' />
        </div>
        <p className='leading-6 font-normal text-normal'>
          Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim
          turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis egestas
          erat urna interdum. Posuere non ac justo tortor. Et amet blandit feugiat mattis netus eu mauris suscipit amet.
          Purus pretium ut diam et netus venenatis ultricies pulvinar dignissim. In turpis congue eget sit. Tempus sit
          nam aliquet blandit in in leo tortor. Mattis sed a ut sed ipsum ut.
        </p>
        <p className='leading-6 font-normal text-normal'>
          Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim
          turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis egestas
          erat urna interdum. Posuere non ac justo tortor. Lorem ipsum dolor sit amet consectetur. Lobortis sagittis
          vulputate enim tincidunt vel pulvinar id enim turpis. Eget imperdiet pellentesque justo id ut tellus senectus
          auctor feugiat. Pellentesque convallis egestas erat urna interdum. Posuere non ac justo tortor.
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex items-center flex-col md:flex-row gap-8 justify-between'>
          <img src={Service2} alt='image' className='w-full h-[261px] object-cover rounded-lg' />
          <img src={Service3} alt='image' className='w-full h-[261px] object-cover rounded-lg' />
          <img src={Service4} alt='image' className='w-full h-[261px] object-cover rounded-lg' />
        </div>
        <p className='leading-6 font-normal text-normal'>
          Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim
          turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis egestas
          erat urna interdum. Posuere non ac justo tortor. Et amet blandit feugiat mattis netus eu mauris suscipit amet.
          Purus pretium ut diam et netus venenatis ultricies pulvinar dignissim. In turpis congue eget sit. Tempus sit
          nam aliquet blandit in in leo tortor. Mattis sed a ut sed ipsum ut.
        </p>

        <p className='leading-6 font-normal text-normal'>
          Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim
          turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis egestas
          erat urna interdum. Posuere non ac justo tortor.
        </p>
      </div>
    </div>
  )
}

const items = [
  {
    key: '1',
    label: <div className='font-semibold text-primaryPrdName text-[#3B3B3B]'>카테고리명A</div>,
    children: renderTabContent(),
  },
  {
    key: '2',
    label: <div className='font-semibold text-primaryPrdName text-[#3B3B3B]'>카테고리명B</div>,
    children: renderTabContent(),
  },
  {
    key: '3',
    label: <div className='font-semibold text-primaryPrdName text-[#3B3B3B]'>카테고리명C</div>,
    children: renderTabContent(),
  },
]

export default function Service() {
  return (
    <div className='lg:max-w-7xl w-full mx-auto mt-20 text-[#3B3B3B] lg:px-0 px-5'>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
    </div>
  )
}
