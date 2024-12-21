import React from 'react'
import { Space, Collapse } from 'antd'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import IconArrowUpFill from '@assets/images/IconArrowUpFill.svg'
import { useNavigate } from 'react-router-dom'

export default function TermsOfService() {
  const navigate = useNavigate()
  const dataConfirm = [
    {
      key: '1',
      label: '[필수] 이용약관',
      content:
        'Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis egestas erat urna interdum. Posuere non ac justo tortor. Et amet blandit feugiat mattis netus eu mauris suscipit amet. Purus pretium ut diam et netus venenatis ultricies pulvinar dignissim. In turpis congue eget sit. Tempus sit nam aliquet blandit in in leo tortor. Mattis sed a ut sed ipsum ut.',
    },
    {
      key: '2',
      label: '[선택] 마케팅 활용 동의',
      content:
        'Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis egestas erat urna interdum. Posuere non ac justo tortor. Et amet blandit feugiat mattis netus eu mauris suscipit amet. Purus pretium ut diam et netus venenatis ultricies pulvinar dignissim. In turpis congue eget sit. Tempus sit nam aliquet blandit in in leo tortor. Mattis sed a ut sed ipsum ut.',
    },
    {
      key: '3',
      label: '[필수] 개인정보 취급 방침',
      content:
        'Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis egestas erat urna interdum. Posuere non ac justo tortor. Et amet blandit feugiat mattis netus eu mauris suscipit amet. Purus pretium ut diam et netus venenatis ultricies pulvinar dignissim. In turpis congue eget sit. Tempus sit nam aliquet blandit in in leo tortor. Mattis sed a ut sed ipsum ut.',
    },
    {
      key: '3',
      label: '[필수] 개인정보 취급 방침',
      content:
        'Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis egestas erat urna interdum. Posuere non ac justo tortor. Et amet blandit feugiat mattis netus eu mauris suscipit amet. Purus pretium ut diam et netus venenatis ultricies pulvinar dignissim. In turpis congue eget sit. Tempus sit nam aliquet blandit in in leo tortor. Mattis sed a ut sed ipsum ut.',
    },
    {
      key: '3',
      label: '[필수] 개인정보 취급 방침',
      content:
        'Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis egestas erat urna interdum. Posuere non ac justo tortor. Et amet blandit feugiat mattis netus eu mauris suscipit amet. Purus pretium ut diam et netus venenatis ultricies pulvinar dignissim. In turpis congue eget sit. Tempus sit nam aliquet blandit in in leo tortor. Mattis sed a ut sed ipsum ut.',
    },
  ]

  return (
    <div className='max-w-7xl mx-auto mt-24'>
      <div className='flex justify-between gap-8'>
        <div className='flex-1'>
          <Space direction='vertical w-full'>
            {dataConfirm.map((item) => (
              <div key={item.key} className='mb-4 w-full'>
                <Collapse
                  collapsible='header'
                  defaultActiveKey={['1']}
                  expandIconPosition='end'
                  className='bg-[#F8F8F8]'
                  // style={{ border: 'none' }}
                  expandIcon={({ isActive }) => (
                    <div className='flex items-center font-medium text-small text-[#000000] font-nunito'>
                      전문보기
                      <img
                        src={isActive ? IconArrowDownFill : IconArrowUpFill}
                        alt='Arrow Icon'
                        style={{
                          transition: 'transform 0.2s ease-in-out',
                        }}
                      />
                    </div>
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
        </div>
      </div>
    </div>
  )
}
