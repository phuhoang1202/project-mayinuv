import React, { useEffect, useState } from 'react'
import { Flex } from 'antd'
import TablleAdmin from '@pages/admin/components/common/TableAdmin'
import { getAllUsers } from '@services/admin/member'
import { Toast } from '@utils/toast'
const CouponHistory = () => {
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAllUser = async () => {
    setLoading(true)
    try {
      const bodyPayload = {
        enable: true,
        pageNumber: 0,
        pageSize: 8,
      }
      const response = await getAllUsers(bodyPayload)

      console.log(response.data.content)

      setFilteredData(response.data.content)
    } catch (error) {
      Toast.error('Failed to fetch promotions:', error)
    } finally {
      setLoading(false)
    }
  }

  //   useEffect(() => {
  //     fetchAllUser()
  //   }, [])

  const columns = [
    {
      title: '구분',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '쿠폰번호',
      dataIndex: 'buyerID',
      key: 'buyerID',
    },
    {
      title: '쿠폰명',
      dataIndex: 'buyerName',
      key: 'buyerName',
    },
    {
      title: '쿠폰발행일',
      dataIndex: 'buyerPhoneNumber',
      key: 'buyerPhoneNumber',
    },
    {
      title: '쿠폰만료일',
      dataIndex: 'standardPrice',
      key: 'standardPrice',
    },
    {
      title: '쿠폰사용일',
      dataIndex: 'numberOfPurchases',
      key: 'numberOfPurchases',
      width: '90px',
    },
    {
      title: '쿠폰사용취소일',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: '거래번호',
      dataIndex: 'paymentCurrency',
      key: 'paymentCurrency',
    },
    {
      title: '상세내역보기',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: '쿠폰상태조정',
      key: 'Payment Confirm',
      render: (text, record) => (
        <div>
          <button type='button' className='text-[#5B4DFB] font-medium text-small px-2 h-[26px]'>
            조정하기
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className='h-full overflow-x-scroll xl:overflow-x-hidden mt-4'>
        <Flex gap='middle' vertical>
          <TablleAdmin
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            pagination={false}
            // onTableChange={handleTableChange}
          />
          {/* <Pagination
              className='mt-6'
              align='end'
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={(page, pageSize) => setPagination({ ...pagination, current: page, pageSize })}
              itemRender={itemRender}
            /> */}
        </Flex>
      </div>
    </div>
  )
}

export default CouponHistory
