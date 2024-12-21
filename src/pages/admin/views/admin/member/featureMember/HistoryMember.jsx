import Card from '@pages/admin/components/card'
import React, { useState } from 'react'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import IconBack from '@assets/images/IconBack.svg'
import IconSearch from '@assets/icons/admin/IconSearch.svg'
import { Select, Input, Tabs } from 'antd'
import TransactionHistory from './tableHistory/TransactionHistory'
import TYCPoints from './tableHistory/TYCPoints'
import CouponHistory from './tableHistory/CouponHistory'

export default function HistoryMember({ setCurrentStep }) {
  const [activeTabKey, setActiveTabKey] = useState('1')

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleChange = (value) => {
    console.log(value)
  }

  // Tabs
  const items = [
    {
      key: '1',
      label: (
        <div
          className={`${
            activeTabKey === '1' ? 'text-[#5B4DFB] bg-[#EFEEFF] font-bold' : 'text-[#8C8C8C] font-medium'
          } font-bold text-textPrd px-8 py-1 rounded-full`}
        >
          거래내역
        </div>
      ),
      children: <TransactionHistory />,
    },
    {
      key: '2',
      label: (
        <div
          className={`${
            activeTabKey === '2' ? 'text-[#5B4DFB] bg-[#EFEEFF] font-bold' : 'text-[#8C8C8C] font-medium'
          } font-bold text-textPrd px-8 py-1 rounded-full`}
        >
          TYC 포인트
        </div>
      ),
      children: <TYCPoints />,
    },
    {
      key: '3',
      label: (
        <div
          className={`${
            activeTabKey === '3' ? 'text-[#5B4DFB] bg-[#EFEEFF] font-bold' : 'text-[#8C8C8C] font-medium'
          }  text-textPrd px-8 py-1 rounded-full`}
        >
          쿠폰
        </div>
      ),
      children: <CouponHistory />,
    },
  ]

  const onChangeTab = (key) => {
    setActiveTabKey(key)
  }

  return (
    <Card extra={'w-full h-full'}>
      <div className='absolute top-0 left-4 cursor-pointer' onClick={() => setCurrentStep(0)}>
        <img src={IconBack} alt='icon' />
      </div>

      <div className='h-full overflow-x-scroll xl:overflow-x-hidden mt-8 mb-20'>
        <div className='mx-4'>
          <div className='flex items-center justify-between ml-20'>
            <div className='flex items-center gap-3'>
              <div className='w-[60px] h-[60px] rounded-full'>
                <img src={DefaultAvatar} alt='image' className='w-full h-full object-cover' />
              </div>

              <div className='flex flex-col'>
                <div className='text-[#3B3B3B] font-bold text-textPrd'>진선미</div>
                <div className='text-[#8C8C8C] font-medium text-small'>회원등급</div>
              </div>
            </div>

            <div className='flex items-center flex-col lg:flex-row gap-4 lg:mt-0 mt-4'>
              <div className='flex flex-col md:flex-row items-center w-full md:w-auto relative'>
                <Input placeholder='찾다' onKeyPress={handleKeyPress} className='lg:w-[400px] w-full h-9' />
                <img
                  src={IconSearch}
                  alt='icon'
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                />
              </div>

              <div>
                <Select
                  labelInValue
                  defaultValue={{ value: '표시하다', label: '표시하다' }}
                  style={{ width: 147, height: 36 }}
                  onChange={handleChange}
                  options={[
                    { value: 'jack', label: 'Jack (100)' },
                    { value: '표시하다', label: '표시하다' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className='mt-6'>
            <Tabs defaultActiveKey='1' items={items} onChange={onChangeTab} />
          </div>
        </div>
      </div>
    </Card>
  )
}
