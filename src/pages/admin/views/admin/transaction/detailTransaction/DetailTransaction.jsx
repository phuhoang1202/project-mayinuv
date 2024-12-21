import React, { useEffect, useState } from 'react'
import Card from '@pages/admin/components/card'
import IconBack from '@assets/images/IconBack.svg'
import { Dropdown, Menu, Radio, DatePicker, Select, Space, Form, Input } from 'antd'
import { getDetailTransaction, updateStatus } from '@services/admin/transaction'
import { useNavigate, useParams } from 'react-router-dom'
import { Toast } from '@utils/toast'
import Loading from '@components/loadingCommon/Loading'

export default function DetailTransaction() {
  const STATUS_OPTIONS = [
    { code: 0, label: 'Pending', value: 'PENDING' },
    { code: 1, label: 'Confirm payment', value: 'CONFIRM_PAYMENT' },
    { code: 2, label: 'Preparing delivery', value: 'PREPARING_DELIVERY' },
    { code: 3, label: 'In delivery', value: 'IN_DELIVERY' },
    { code: 4, label: 'Request cancel', value: 'REQUEST_CANCEL' },
    { code: 5, label: 'Cancelled', value: 'CANCELLED' },
    { code: 6, label: 'Success', value: 'SUCCESS' },
    { code: 7, label: 'Paid', value: 'PAID' },
  ]
  const param = useParams()
  const { id } = param

  const navagite = useNavigate()
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(false)
  const [idfilteredData, setIdfilteredData] = useState(0)

  const formatDateTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
      .getDate()
      .toString()
      .padStart(2, '0')} ${date.toLocaleTimeString('en-GB', { hour12: false })}`
  }

  const fetchDetailTransaction = async () => {
    setLoading(true)
    try {
      const response = await getDetailTransaction(id)
      setFilteredData(response.data)
      setSelectedStatus(response.data.status)
    } catch (error) {
      Toast.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }
  console.log('setSelectedStatus', selectedStatus)
  useEffect(() => {
    if (id) {
      fetchDetailTransaction()
    }
  }, [id])

  useEffect(() => {
    // Set selectedStatus based on filteredData.status when it changes
    if (filteredData.status !== undefined) {
      setSelectedStatus(getStatusLabel(filteredData.status))
    }
  }, [filteredData])

  const getStatusLabel = (statusCode) => {
    const status = STATUS_OPTIONS.find((option) => option.code == statusCode)
    return status ? status.label : null
  }

  const handleStatusChange = (value) => {
    setSelectedStatus(value)
  }

  const handleCheck = async () => {
    try {
      const status = STATUS_OPTIONS.find((option) => option.code === selectedStatus)

      if (!status) {
        Toast.error('Selected status not found in STATUS_OPTIONS')
        return
      }

      const bodyPayload = {
        orderId: Number(id),
        statusOrder: status.value,
      }

      await updateStatus(bodyPayload)
      Toast.success('Status updated successfully')
    } catch (error) {
      Toast.error('Failed to change status')
    }
  }

  return (
    <div className='flex gap-8'>
      <Card extra={'w-1/3 h-[87vh] py-6 px-4'}>
        {loading && <Loading />}
        <div className='relative'>
          <div className='absolute top-0 left-2 cursor-pointer' onClick={() => navagite(-1)}>
            <img src={IconBack} alt='icon' />
          </div>
          <div className='mt-10 mx-10'>
            <div>
              <div className='flex flex-col gap-4 border-b pb-2'>
                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Order Number</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>{filteredData.orderNumber}</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Buy Date</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>{formatDateTime(filteredData.buyDate)}</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Cancel Date</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>
                    {formatDateTime(filteredData.cancelDate)}
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Status</div>
                  <div>
                    <Select
                      placeholder='Select Status'
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      style={{ width: 147, height: 36 }}
                      options={STATUS_OPTIONS.map((status) => ({
                        value: status.code,
                        label: status.label,
                        disabled: selectedStatus ? status.code <= +selectedStatus : false,
                      }))}
                    />
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>
                    {filteredData?.status == '0' ? 'Payment Confirm' : 'Update Status'}
                  </div>
                  <div>
                    <button
                      className='h-9 bg-[#D9D6FF] text-[#5B4DFB] w-[147px] rounded-md font-medium text-normal'
                      onClick={handleCheck}
                    >
                      {filteredData?.status == '0' ? 'Check' : 'Update'}
                    </button>
                  </div>
                </div>
              </div>

              <div className='mt-8 flex flex-col gap-4'>
                <h3 className='font-bold text-[#3B3B3B] text-textPrd'>Buyer Info</h3>

                <div className='flex items-center justify-between'>
                  <div>
                    <div className='font-semibold text-normal text-[#3B3B3B]'>ID</div>
                    <div className='font-medium text-normal text-[#5B4DFB] underline decoration-solid'>
                      {filteredData.username}
                    </div>
                  </div>

                  <div className='font-medium text-min text-[#AFAEAE]'>누르면 회원정보로 이동</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Name</div>
                  <div className='font-medium text-normal text-[#8C8C8C]'>{filteredData.buyerName}</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Phone Number</div>
                  <div className='font-medium text-small text-[#8C8C8C]'>{filteredData.phoneNumber}</div>
                </div>

                <div>
                  <div className='font-semibold text-normal text-[#3B3B3B]'>Member Key</div>
                  <div className='font-medium text-small text-[#8C8C8C]'>{filteredData?.userDTO?.keyMember}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card extra={'w-2/3 h-[87vh] py-6 px-4'}>
        <div className='mt-10 mx-20'>
          <div>
            <h3 className='font-bold text-textPrd text-[#3B3B3B]'>Transaction Detail</h3>

            <div className='mt-3 bg-[#F8F8F8] p-4 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg'>
              <div>
                <div className='font-semibold text-normal text-[#3B3B3B]'>Standard Price (KRW)</div>
                <div className='font-medium text-normal text-[#8C8C8C]'>{filteredData.standardPrice}</div>
              </div>

              <div>
                <div className='font-semibold text-normal text-[#3B3B3B]'>Total Price</div>
                <div className='font-medium text-normal text-[#8C8C8C]'>{filteredData.totalPrice} </div>
              </div>

              <div>
                <div className='font-semibold text-normal text-[#3B3B3B]'>Payment Currency</div>
                <div className='font-medium text-normal text-[#8C8C8C]'>{filteredData.paymentCurrency}</div>
              </div>

              <div>
                <div className='font-semibold text-normal text-[#3B3B3B]'>Payment Method</div>
                <div className='font-medium text-normal text-[#8C8C8C]'>{filteredData.paymentMethod}</div>
              </div>

              <div>
                <div className='font-semibold text-normal text-[#3B3B3B]'>Coupon Y/N</div>
                <div className='font-medium text-normal text-[#8C8C8C]'>{filteredData.coupon === 0 ? 'N' : 'Y'}</div>
              </div>

              <div>
                <div className='font-semibold text-normal text-[#3B3B3B]'>Coupon Value (Discount)</div>
                <div className='font-medium text-normal text-[#8C8C8C]'>10,000 KRW</div>
              </div>
            </div>
          </div>

          <div className='mt-10'>
            <div class='overflow-hidden border rounded-lg'>
              <table class='w-full'>
                <thead class='bg-[#EFEFEF] h-[60px]'>
                  <tr>
                    <th class='p-3 text-left text-small font-bold'>상품명</th>
                    <th class='p-3 text-left text-small font-bold'>수량</th>
                    <th class='p-3 text-left text-small font-bold'>가격</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.orderItemDTOs && filteredData.orderItemDTOs.length > 0 && (
                    <>
                      {filteredData.orderItemDTOs.map((item, index) => (
                        <tr class='border-b hover:bg-gray-100' key={index}>
                          <td class='p-3 text-small'>{item.product.productName}</td>
                          <td class='p-3 text-small'>{item.quantity}</td>
                          <td class='p-3 text-small'>{item.product.salePrice}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
