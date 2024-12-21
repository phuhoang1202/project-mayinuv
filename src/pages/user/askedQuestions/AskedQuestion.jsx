import React, { useState } from 'react'
import { Space, Collapse, Tabs } from 'antd'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import IconArrowUpFill from '@assets/images/IconArrowUpFill.svg'
import { useTranslation } from 'react-i18next'

export default function AskedQuestion() {
  // State để lưu trữ tab đang được active
  const [activeKey, setActiveKey] = useState('1')
  const { t } = useTranslation()

  const onChange = (key) => {
    setActiveKey(key)
  }

  const dataConfirm1 = [
    {
      key: '1',
      label: `${t('labelFAQ1-1')}`,
      content: `${t('contentFAQ1-1')}`,
    },
    {
      key: '2',
      label: `${t('labelFAQ1-2')}`,
      content: `${t('contentFAQ1-2')}`,
    },
  ]

  const dataConfirm2 = [
    {
      key: '1',
      label: `${t('labelFAQ2-1')}`,
      content: `${t('contentFAQ2-1')}`,
    },
    {
      key: '2',
      label: `${t('labelFAQ2-2')}`,
      content: `${t('contentFAQ2-2')}`,
    },
    {
      key: '3',
      label: `${t('labelFAQ2-3')}`,
      content: `${t('contentFAQ2-3')}`,
    },
    {
      key: '4',
      label: `${t('labelFAQ2-4')}`,
      content: `${t('contentFAQ2-4')}`,
    },
  ]

  const dataConfirm3 = [
    {
      key: '1',
      label: `${t('labelFAQ3-1')}`,
      content: `${t('contentFAQ3-1')}`,
    },
  ]

  const items = [
    {
      key: '1',
      label: (
        <div className={`font-semibold text-primaryPrdName ${activeKey === '1' ? 'text-[#3B3B3B]' : 'text-[#8C8C8C]'}`}>
          {t('titleFAQ1')}
        </div>
      ),
      children: (
        <Space direction='vertical w-full'>
          {dataConfirm1.map((item) => (
            <div key={item.key} className='mb-4 w-full'>
              <Collapse
                collapsible='header'
                defaultActiveKey={['1']}
                expandIconPosition='end'
                className='bg-[#F8F8F8]'
                expandIcon={({ isActive }) => (
                  <img
                    src={isActive ? IconArrowDownFill : IconArrowUpFill}
                    alt='Arrow Icon'
                    style={{
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  />
                )}
                items={[
                  {
                    key: item.key,
                    label: <div className='font-bold text-primaryPrdName'>{item.label}</div>,
                    children: (
                      <div className='text-[#3B3B3B] font-medium text-normal leading-6'>
                        <p>{item.content}</p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          ))}
        </Space>
      ),
    },
    {
      key: '2',
      label: (
        <div
          className={`font-semibold  text-primaryPrdName ${activeKey === '2' ? 'text-[#3B3B3B]' : 'text-[#8C8C8C]'}`}
        >
          {t('titleFAQ2')}
        </div>
      ),
      children: (
        <Space direction='vertical w-full'>
          {dataConfirm2.map((item) => (
            <div key={item.key} className='mb-4 w-full'>
              <Collapse
                collapsible='header'
                defaultActiveKey={['1']}
                expandIconPosition='end'
                className='bg-[#F8F8F8]'
                expandIcon={({ isActive }) => (
                  <img
                    src={isActive ? IconArrowDownFill : IconArrowUpFill}
                    alt='Arrow Icon'
                    style={{
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  />
                )}
                items={[
                  {
                    key: item.key,
                    label: <div className='font-bold text-primaryPrdName'>{item.label}</div>,
                    children: (
                      <div className='text-[#3B3B3B] font-medium text-normal leading-6'>
                        <p>{item.content}</p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          ))}
        </Space>
      ),
    },
    {
      key: '3',
      label: (
        <div className={`font-semibold text-primaryPrdName ${activeKey === '3' ? 'text-[#3B3B3B]' : 'text-[#8C8C8C]'}`}>
          {t('titleFAQ3')}
        </div>
      ),
      children: (
        <Space direction='vertical w-full'>
          {dataConfirm3.map((item) => (
            <div key={item.key} className='mb-4 w-full'>
              <Collapse
                collapsible='header'
                defaultActiveKey={['1']}
                expandIconPosition='end'
                className='bg-[#F8F8F8]'
                expandIcon={({ isActive }) => (
                  <img
                    src={isActive ? IconArrowDownFill : IconArrowUpFill}
                    alt='Arrow Icon'
                    style={{
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  />
                )}
                items={[
                  {
                    key: item.key,
                    label: <div className='font-bold text-primaryPrdName'>{item.label}</div>,
                    children: (
                      <div className='text-[#3B3B3B] font-medium text-normal leading-6'>
                        <p>{item.content}</p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          ))}
        </Space>
      ),
    },
  ]

  return (
    <div className='w-full'>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
    </div>
  )
}
