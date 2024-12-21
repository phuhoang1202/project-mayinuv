import React, { useState } from 'react'
import { Collapse, Space } from 'antd'
import IconArrowUpFill from '@assets/images/IconArrowUpFill.svg'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import './CollapseComponent.css'
import { useTranslation } from 'react-i18next'

export default function CollapseComponent({ dataDescription }) {
  const { t } = useTranslation()

  const data = [
    {
      key: '1',
      label: `${t('collapseText')}`,
      text: `${dataDescription}`,
    },
    // {
    //   key: '2',
    //   label: `${t('collapseText2')}`,
    //   text: `Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim turpis.`,
    // },
    // {
    //   key: '3',
    //   label: `${t('collapseText3')}`,
    //   text: `Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim turpis.`,
    // },
  ]
  return (
    <Space direction='vertical lg:w-[733px] w-full'>
      {data.map((item) => (
        <div key={item.key} className='mb-4 lg:w-[733px] w-full '>
          <Collapse
            collapsible='header'
            defaultActiveKey={['1']}
            expandIconPosition='end'
            className='bg-[#F8F8F8]'
            expandIcon={({ isActive }) => (
              <img
                src={isActive ? IconArrowUpFill : IconArrowDownFill}
                alt='Arrow Icon'
                style={{
                  transition: 'transform 0.2s ease-in-out',
                }}
              />
            )}
            items={[
              {
                key: item.key,
                label: <div className='font-bold text-textPrd'>{item.label}</div>,
                children: (
                  <div
                    className='font-medium text-normal flex flex-col items-center'
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                ),
              },
            ]}
          />
        </div>
      ))}
    </Space>
  )
}
