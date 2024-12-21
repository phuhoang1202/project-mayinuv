import React, { useEffect, useState } from 'react'
import { Flex } from 'antd'
import TablleAdmin from '@pages/admin/components/common/TableAdmin'
import { getAllUsers } from '@services/admin/member'
import { Toast } from '@utils/toast'
const TransactionHistory = () => {
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
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Buyer ID',
      dataIndex: 'buyerID',
      key: 'buyerID',
    },
    {
      title: 'Buyer Name',
      dataIndex: 'buyerName',
      key: 'buyerName',
    },
    {
      title: 'Buyer Phone Number',
      dataIndex: 'buyerPhoneNumber',
      key: 'buyerPhoneNumber',
    },
    {
      title: 'Standard Price(KRW)',
      dataIndex: 'standardPrice',
      key: 'standardPrice',
    },
    {
      title: 'Number of purchases',
      dataIndex: 'numberOfPurchases',
      key: 'numberOfPurchases',
      width: '90px',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Payment Currency',
      dataIndex: 'paymentCurrency',
      key: 'paymentCurrency',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Coupon Y/N',
      dataIndex: 'coupon',
      key: 'coupon',
    },
    {
      title: 'Main Product Name',
      dataIndex: 'mainProductName',
      key: 'mainProductName',
    },
    {
      title: 'Buy Date',
      dataIndex: 'buyDate',
      key: 'buyDate',
    },
    {
      title: 'Cancel Date',
      dataIndex: 'cancelDate',
      key: 'cancelDate',
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
    },
    {
      title: 'Payment Confirm',
      key: 'Payment Confirm',
      render: (text, record) => (
        <div>
          <button type='button' className='rounded-lg bg-[#5B4DFB] text-white font-medium text-small px-2 h-[26px]'>
            Check
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

export default TransactionHistory
