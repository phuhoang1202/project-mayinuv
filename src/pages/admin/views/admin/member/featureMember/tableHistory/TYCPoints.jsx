import React, { useEffect, useState } from 'react'
import { Flex } from 'antd'
import TablleAdmin from '@pages/admin/components/common/TableAdmin'
import { getAllUsers } from '@services/admin/member'
import { Toast } from '@utils/toast'
const TYCPoints = () => {
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
      title: '일시',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '구분',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '거래 포인트',
      dataIndex: 'buyerID',
      key: 'buyerID',
    },
    {
      title: '현재 포인트',
      dataIndex: 'buyerName',
      key: 'buyerName',
    },
    {
      title: '거래번호',
      dataIndex: 'buyerPhoneNumber',
      key: 'buyerPhoneNumber',
    },
    {
      title: '상세내역보기',
      dataIndex: 'standardPrice',
      key: 'standardPrice',
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

export default TYCPoints
