import React, { useState } from 'react'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import IconTicketSale from '@assets/images/IconTicketSale.svg'
import IconError from '@assets/images/IconError.svg'

export default function RightCartProduct() {
  const [isDropdownOpenCoupo, setIsDropdownOpenCoupo] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSelectCoupo = (option) => {
    setSelectedOption(option)
    setIsDropdownOpen(false)
  }

  const handleSelect = (option) => {
    setSelectedOption(option)
    setIsDropdownOpen(false)
  }

  return (
    <div className='w-[405px] rounded-lg mt-16'>
      <div className='bg-[#F8F8F8] px-4'>
        <div>
          <div style={{ borderBottom: '1px solid #D3D2D2' }} className='pt-4'>
            <h3 className='font-semibold text-primaryPrdName'>제품</h3>
          </div>

          <div className='mt-4 flex flex-col gap-2'>
            <div className='flex justify-between items-center font-medium text-normal'>
              <div>계절 야채 - 녹색 야채</div>
              <div>17.000원</div>
            </div>
            <div className='flex justify-between items-center font-medium text-normal'>
              <div>계절 야채 - 녹색 야채</div>
              <div>50.000원</div>
            </div>
            <div className='flex justify-between items-center font-medium text-normal'>
              <div>계절 야채 - 녹색 야채</div>
              <div>30.000원</div>
            </div>
            <div className='flex justify-between items-center font-bold text-normal'>
              <div>총 (3개 제품) </div>
              <div>97.000원</div>
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <div style={{ borderBottom: '1px solid #D3D2D2' }}>
            <div className='flex justify-between items-center'>
              <h3 className='font-semibold text-primaryPrdName'>요금</h3>
              <div>
                {/* Tạo dropdown tùy chỉnh */}
                <div className='relative'>
                  <button
                    onClick={() => setIsDropdownOpenCoupo(!isDropdownOpenCoupo)}
                    className='flex items-center justify-between h-8 w-[60px] rounded-lg px-2'
                  >
                    <img src={IconTicketSale} alt='icon' />
                    <img src={IconArrowDownFill} alt='icon arrow' />
                  </button>

                  {isDropdownOpenCoupo && (
                    <ul className='absolute right-0 mt-1 w-[104px] bg-white border border-gray-200 rounded-md shadow-lg'>
                      <li
                        onClick={() => handleSelectCoupo('Option 1')}
                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                      >
                        Option 1
                      </li>
                      <li
                        onClick={() => handleSelectCoupo('Option 2')}
                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                      >
                        Option 2
                      </li>
                      <li
                        onClick={() => handleSelectCoupo('Option 3')}
                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                      >
                        Option 3
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='mt-4 flex flex-col gap-2'>
            <div className='flex justify-between items-center font-medium text-normal'>
              <div>계절 야채 - 녹색 야채</div>
              <div>17.000원</div>
            </div>
            <div className='flex justify-between items-center font-medium text-normal'>
              <div>계절 야채 - 녹색 야채</div>
              <div>50.000원</div>
            </div>
            <div className='flex justify-between items-center font-medium text-normal'>
              <div>계절 야채 - 녹색 야채</div>
              <div>30.000원</div>
            </div>
            <div className='flex justify-between items-center font-bold text-normal'>
              <div>총 (3개 제품)</div>
              <div>97.000원</div>
            </div>
          </div>
        </div>

        <div className='text-[#F14646] flex justify-end items-center gap-2 text-[10px] mt-2'>
          <img src={IconError} alt='icon' /> 150개 상품부터 무료배송해드립니다
        </div>

        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <div>지불 방식</div>
            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='flex items-center justify-between w-[104px] h-9 rounded-[4px] bg-[#D3D2D2] px-2'
              >
                <div className='font-medium text-normal'>착불택배</div>
                <img src={IconArrowDownFill} alt='icon arrow' className='h-6 w-6 p-1' />
              </button>

              {isDropdownOpen && (
                <ul className='absolute right-0 mt-1 w-[104px] bg-white border border-gray-200 rounded-md shadow-lg'>
                  <li onClick={() => handleSelect('착불택배')} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    착불택배
                  </li>
                  <li onClick={() => handleSelect('선불택배')} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    선불택배
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className='flex justify-end items-center font-medium text-min text-[#666666] mt-2'>
          상품에 세금이 포함되어 있습니다
        </div>
      </div>

      <div className='bg-[#3B3B3B] mt-2 flex justify-between items-center p-4 h-[100px] rounded-b-lg'>
        <div className='text-white font-bold text-textPrd'>총 (3개 제품) </div>
        <div className='flex flex-col items-end text-white'>
          <div className='font-bold text-textPrd'>99.000 원</div>
          <div className='font-medium text-small'>적립예정 237원 (1%)</div>
        </div>
      </div>
    </div>
  )
}
