import React, { useState } from 'react'
import { Tabs } from 'antd'
import CustomPagination from '@components/customPagination/CustomPagination'

export default function NewsPage() {
  // State để lưu trữ tab đang được active
  const [activeKey, setActiveKey] = useState('1')

  const onChange = (key) => {
    setActiveKey(key) // Cập nhật key của tab đang active
    console.log(key)
  }

  const items = [
    {
      key: '1',
      label: (
        <div className={`font-semibold text-primaryPrdName ${activeKey === '1' ? 'text-[#3B3B3B]' : 'text-[#8C8C8C]'}`}>
          전체
        </div>
      ),
      children: (
        <div className='lg:w-[952px] w-full'>
          <div className='w-full border sm:rounded-lg max-h-[400px] overflow-y-auto'>
            <table className='w-full text-left'>
              <thead className='text-small font-bold text-[#3B3B3B] bg-[#F8F8F8] '>
                <tr>
                  <th className='px-3 h-[60px] lg:w-[109px]'>구분</th>
                  <th className='px-3 h-[60px]'>제목</th>
                  <th className='px-3 h-[60px] lg:w-[147px]'>게시일자</th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-white border-b'>
                  <td className='px-3 py-5'>
                    <div className='bg-[#EFEFEF] text-[#36BDF7] h-[22px] font-medium text-small w-20 px-2 rounded-sm flex justify-center items-center'>
                      공지사항
                    </div>
                  </td>
                  <td>
                    <div className='text-[#3B3B3B] font-bold text-small'>개인정보 보호 정책 변경 안내</div>
                  </td>
                  <td>
                    <div className='text-[#3B3B3B] font-medium text-small'>2024/10/28</div>
                  </td>
                </tr>

                <tr className='bg-white border-b'>
                  <td className='px-3 py-5'>
                    <div className='bg-[#EFEFEF] text-[#ED8559] h-[22px] w-20 px-2 rounded-sm flex justify-center items-center'>
                      이벤트
                    </div>
                  </td>
                  <td>
                    <div className='text-[#3B3B3B] font-bold text-small'>타임어택! 무조건 5% 할인</div>
                  </td>
                  <td>
                    <div className='text-[#3B3B3B] font-medium text-small'>2024/10/23</div>
                  </td>
                </tr>

                <tr className='bg-white border-b'>
                  <td className='px-3 py-5'>
                    <div className='bg-[#EFEFEF] text-[#36BDF7] h-[22px] w-20 px-2 rounded-sm flex justify-center items-center'>
                      공지사항
                    </div>
                  </td>
                  <td>
                    <div className='text-[#3B3B3B] font-bold text-small'>개인정보 보호 정책 변경 안내</div>
                  </td>
                  <td>
                    <div className='text-[#3B3B3B] font-medium text-small'>2024/10/28</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {/* <CustomPagination totalItems={10} align='center' /> */}
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className={`font-semibold text-primaryPrdName ${activeKey === '2' ? 'text-[#3B3B3B]' : 'text-[#8C8C8C]'}`}>
          공지사항
        </div>
      ),
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: (
        <div className={`font-semibold text-primaryPrdName ${activeKey === '3' ? 'text-[#3B3B3B]' : 'text-[#8C8C8C]'}`}>
          이벤트
        </div>
      ),
      children: 'Content of Tab Pane 3',
    },
  ]

  return (
    <div className='max-w-7xl mx-auto mt-20 lg:px-0 px-4'>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} animated={false} />
    </div>
  )
}
