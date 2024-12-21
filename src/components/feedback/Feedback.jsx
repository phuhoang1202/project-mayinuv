import { Image, Rate } from 'antd'
import React from 'react'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import ProductNew1 from '@assets/images/ProductNew1.svg'
import ProductNew2 from '@assets/images/ProductNew2.svg'

export default function Feedback() {
  return (
    <div className='w-[733px]'>
      {/* Title */}
      <div className='h-11 bg-[#F8F8F8] flex justify-between items-center px-3 mt-2 rounded-lg'>
        <div className='font-bold text-textPrd'>평가하다</div>
        <div className='font-medium text-small'>모두 읽어보세요</div>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <div className='font-semibold text-primaryPrdName'>고객 리뷰 (160 평가하다 )</div>
        <div className='flex items-center gap-2'>
          <Rate disabled defaultValue={4.8} style={{ color: '#F14646', fontSize: '16px' }} />
          <div className='font-medium text-normal'>
            4.8 <span className='text-[#8C8C8C]'>(1.230 Review)</span>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className='mt-4'>
        {/* 1 */}
        <div className='border-b pb-4 mt-4'>
          <div className='flex items-center gap-3 mb-3'>
            <img src={DefaultAvatar} alt='icon avatar' className='w-10 h-10' />
            <div>
              <div className='font-bold text-small'>이름이름이름</div>
              <div className='font-medium text-min text-[#8C8C8C]'>도시</div>
            </div>
          </div>
          {/* Rate */}
          <div className='flex items-center gap-2'>
            <Rate disabled defaultValue={4.8} style={{ color: '#F14646', fontSize: '16px' }} />
            <div className='font-medium text-normal'>
              4.8 <span className='text-[#8C8C8C]'>(1.230 Review)</span>
            </div>
          </div>
          <div className='mt-3'>
            <div className='flex items-center gap-4'>
              <Image width={174} src={ProductNew1} />
              <Image width={174} src={ProductNew2} />
            </div>
            <div className='font-medium text-normal mt-3'>
              정사이즈. 셔츠 모양도 좋고, 핑크색도 너무 예쁘고, 나무랄 데가 없어서 자주 입는 셔츠입니다 정사이즈. 셔츠
              모양도 좋고, 핑크색도 너무 예쁘고, 나무랄 데가 없어서 자주 입는 셔츠입니다 정사이즈. 셔츠 모양도 좋고,
              핑크색도 너무 예쁘고, 나무랄 데가 없어서 자주 입는 셔츠입니다
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className='border-b pb-4 mt-4'>
          <div className='flex items-center gap-3 mb-3'>
            <img src={DefaultAvatar} alt='icon avatar' className='w-10 h-10' />
            <div>
              <div className='font-bold text-small'>이름이름이름</div>
              <div className='font-medium text-min text-[#8C8C8C]'>도시</div>
            </div>
          </div>
          {/* Rate */}
          <div className='flex items-center gap-2'>
            <Rate disabled defaultValue={4.8} style={{ color: '#F14646', fontSize: '16px' }} />
            <div className='font-medium text-normal'>
              4.8 <span className='text-[#8C8C8C]'>(1.230 Review)</span>
            </div>
          </div>
          <div className='mt-3'>
            <div className='flex items-center gap-4'>
              <Image width={174} src={ProductNew1} />
              <Image width={174} src={ProductNew2} />
            </div>
            <div className='font-medium text-normal mt-3'>
              정사이즈. 셔츠 모양도 좋고, 핑크색도 너무 예쁘고, 나무랄 데가 없어서 자주 입는 셔츠입니다 정사이즈. 셔츠
              모양도 좋고, 핑크색도 너무 예쁘고, 나무랄 데가 없어서 자주 입는 셔츠입니다 정사이즈. 셔츠 모양도 좋고,
              핑크색도 너무 예쁘고, 나무랄 데가 없어서 자주 입는 셔츠입니다
            </div>
          </div>
        </div>
      </div>

      {/* Comment */}
      <div className='flex flex-col gap-2 mt-4'>
        <div className='font-semibold text-primaryPrdName'>리뷰 작성</div>
        <textarea
          className='rounded-lg'
          placeholder='입력하다'
          style={{
            border: '1px solid #D3D2D2',
            width: '733px',
            height: '120px',
            resize: 'vertical',
            padding: '10px',
          }}
        ></textarea>
        <div className='w-[733px] flex justify-end'>
          <button className='bg-[#D3D2D2] rounded-lg w-[186px] h-11 flex justify-center items-center mt-1'>논평</button>
        </div>
      </div>
    </div>
  )
}
