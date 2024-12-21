import React, { useEffect, useState } from 'react'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import { cart } from '@services/user/cart'
import { Toast } from '@utils/toast'
import {
  formatOrderDate,
  formatPrice,
  formatPriceMultilingual,
  getColorStatusOrder,
  getStatusByName,
} from '@utils/index'
import { constants as c } from '@constants'
import CustomPagination from '@components/customPagination/CustomPagination'
import Loading from '@components/loading/Loading'
import { useNavigate } from 'react-router-dom'
import { message, Tooltip } from 'antd'
import ImageError from '@assets/images/ImageError.svg'
import { getUserInfor } from '@utils/auth'
import { useTranslation } from 'react-i18next'
import SettingsOutline from '@assets/images/SettingsOutline.svg'
import { Dropdown, Menu } from 'antd'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'

export default function OrderHistory() {
  const [dataOrder, setDataOrder] = useState([])
  const [statusOrder, setStatusOrder] = useState(null)
  const [dateRange, setDateRange] = useState('전체')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const getInfoUser = JSON.parse(getUserInfor() || null)
  const { t } = useTranslation()
  const [totalProduct, setTotalProduct] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSize, setCurrentSize] = useState(5)

  // Tiền tệ
  const [unit, setUnit] = useState('KRW')
  // const [language, setLanguage] = useState('ko')

  // useEffect to call the API on component mount
  const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
  // const getLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'
  useEffect(() => {
    // setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [unit])

  const handleStatusClick = (status) => {
    setStatusOrder(status)
  }

  const handleDateRangeClick = (range) => {
    const now = new Date()

    if (range === '1개월') {
      const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1))
      setFromDate(oneMonthAgo.toISOString())
    } else if (range === '3개월') {
      const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3))
      setFromDate(threeMonthsAgo.toISOString())
    } else if (range === '6개월') {
      const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6))
      setFromDate(sixMonthsAgo.toISOString())
    } else {
      setFromDate('')
    }

    setDateRange(range)
  }

  const getFindByConditionOrder = async () => {
    const bodyPayload = {
      currency: 'KRW',
      pageNumber: currentPage - 1,
      pageSize: currentSize,
      // fromDate: fromDate,
      // toDate: toDate,
      status: statusOrder === 'PENDING' ? 'PENDING' : statusOrder,
    }
    try {
      const response = await cart.orderFindByCondition(bodyPayload)
      setDataOrder(response.data.content)
      setIsLoading(true)
      setTotalProduct(response.data.totalElements)
    } catch (error) {
      Toast.error('주문을 불러오지 못했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFindByConditionOrder()
  }, [statusOrder, currentPage])

  const handleCancelOrder = async (id) => {
    try {
      setIsLoading(true)
      const response = await cart.cancelOrder(id)
      if (response.data) {
        Toast.success('주문이 취소되었습니다.')
      } else {
        Toast.error('주문 취소 실패')
      }
      getFindByConditionOrder()
    } catch (error) {
      Toast.error('주문 취소 실패')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleCopy = () => {
    const textToCopy = '079801-04-201422'
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        message.success('복사되었습니다!')
      })
      .catch((error) => {
        message.error('복사에 실패했습니다')
      })
  }

  const orderStatuses = [
    { key: null, label: t('allOrder') },
    { key: 'PENDING', label: t('pendingOrder') },
    { key: 'CONFIRM_PAYMENT', label: t('confirmPaymentOrder') },
    { key: 'PREPARING_DELIVERY', label: t('preparingDeliveryOrder') },
    { key: 'IN_DELIVERY', label: t('inDeliveryOrder') },
    { key: 'SUCCESS', label: t('successOrder') },
    { key: 'REQUEST_CANCEL', label: t('requestCancelOrder') },
    { key: 'CANCELLED', label: t('cancelledOrder') },
  ]

  const renderOrderList = orderStatuses.map((status) => (
    <li
      key={status.key}
      className={`p-[10px] h-11 cursor-pointer ${statusOrder === status.key ? 'bg-[#EFEFEF]' : ''}`}
      onClick={() => handleStatusClick(status.key)}
    >
      {status.label}
    </li>
  ))

  return (
    <div className='max-w-7xl mx-auto lg:mt-24 mt-20'>
      <div className='lg:hidden block w-full px-4'>
        <Dropdown
          overlay={
            <Menu>
              {orderStatuses.map((status) => (
                <Menu.Item key={status.key} onClick={() => handleStatusClick(status.key)}>
                  {status.label}
                </Menu.Item>
              ))}
            </Menu>
          }
          placement='bottomCenter'
          trigger={['click']}
        >
          <div className='flex items-center justify-center gap-2 px-4 py-2 bg-[#F8F8F8] rounded-md text-center text-normal font-semibold cursor-pointer'>
            {t('orderStatus')} <img src={IconArrowDownFill} alt='icon' />
          </div>
        </Dropdown>
      </div>
      <div className='flex items-start gap-8'>
        {/* Bên phải */}
        <div className='lg:block hidden'>
          {/* avatar */}
          {getInfoUser && (
            <div className='flex justify-between items-center pb-2 border-b border-gray-200 '>
              <div
                className='flex items-center gap-2 cursor-pointer '
                // onClick={() => navigate('account/change-information')}
              >
                <div className='w-10 h-10'>
                  <img
                    src={getInfoUser?.img ? `${c.DOMAIN_IMG}${getInfoUser.img}` : DefaultAvatar}
                    alt='icon'
                    loading='lazy'
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <div>
                  <div className='font-semibold'>{getInfoUser ? getInfoUser.name : `${t('memberName')}`}</div>
                  <div className='text-gray-500 text-min'>{t('membershipLevel')}</div>
                </div>
              </div>
            </div>
          )}

          {/* List  */}
          <div className='w-[187px]'>
            <ul>{renderOrderList}</ul>
          </div>
        </div>

        {/* Bên trái */}
        <div>
          {/* header */}
          <div className='flex items-center h-11'>
            <div
              className={`px-[14px] pt-[6px]  cursor-pointer ${
                dateRange === '전체' ? 'border-b-2 border-black text-[#3B3B3B]' : 'text-[#8C8C8C]'
              }`}
              onClick={() => handleDateRangeClick('전체')}
            >
              {t('allOrder')}
            </div>
            <div
              className={`px-[14px] pt-[6px] cursor-pointer ${
                dateRange === '1개월' ? 'border-b-2 border-black text-[#3B3B3B]' : 'text-[#8C8C8C]'
              }`}
              onClick={() => handleDateRangeClick('1개월')}
            >
              {t('1Month')}
            </div>
            <div
              className={`px-[14px] pt-[6px] cursor-pointer ${
                dateRange === '3개월' ? 'border-b-2 border-black text-[#3B3B3B]' : 'text-[#8C8C8C]'
              }`}
              onClick={() => handleDateRangeClick('3개월')}
            >
              {t('3Month')}
            </div>
            <div
              className={`px-[14px] pt-[6px] cursor-pointer ${
                dateRange === '6개월' ? 'border-b-2 border-black text-[#3B3B3B]' : 'text-[#8C8C8C]'
              }`}
              onClick={() => handleDateRangeClick('6개월')}
            >
              {t('6Month')}
            </div>
          </div>

          {/* body */}
          {isLoading && <Loading />}
          {dataOrder && dataOrder.length > 0 ? (
            dataOrder.map((order, index) => {
              const product = order.orderItems[0]?.product
              // const platformType = product?.platformType
              // const images = product?.productImages?.find((image) => image.main)?.imageUrl || ''
              // const imageUrl = platformType === 'tyc' ? `${c.DOMAIN_IMG}${images}` : images

              // Sử dụng logic để xác định URL ảnh
              const arrCheck = ['detail', 'product']
              const mainImage = product?.productImages?.find((image) => image.main)?.imageUrl
              const fallbackImage = product?.productImages?.[0]?.imageUrl
              const imageToCheck = mainImage || fallbackImage || 'URL_OF_DEFAULT_IMAGE'
              const isImageMatched = arrCheck.some((prefix) => imageToCheck?.startsWith(prefix))
              const imageUrl = isImageMatched ? `${c.DOMAIN_IMG}${imageToCheck}` : imageToCheck

              return (
                <div className='mt-6' key={index}>
                  <div className='bg-[#F8F8F8] flex lg:flex-row flex-col items-center justify-between lg:min-h-[199px] p-4 lg:gap-8 gap-4 rounded-t-lg'>
                    <div className='flex items-start gap-6 flex-1'>
                      <div className='w-40 h-40'>
                        <img
                          src={imageUrl}
                          alt='image'
                          className='w-full h-full object-contain  rounded-md'
                          loading='lazy'
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = ImageError
                          }}
                        />
                      </div>

                      <div className='flex flex-col gap-[10px] px-[10px] lg:w-[473px]'>
                        <div>
                          <h3 className='text-#3B3B3B font-semibold text-primaryPrdName'>
                            <Tooltip title={order?.orderItems[0]?.product.productName}>
                              <div>
                                {order?.orderItems[0]?.product.productName}
                                {/* {order?.orderItems[0]?.product.productName.length > 30
                                  ? `${order?.orderItems[0]?.product.productName.substring(0, 15)}...`
                                  : order?.orderItems[0]?.product.productName} */}
                              </div>
                            </Tooltip>
                            {/* {order?.orderItems[0]?.product.productName} */}
                          </h3>
                          <div className='text-normal font-semibold'>
                            {formatPrice(order.totalAmount)}
                            <span className='text-#3B3B3B font-bold text-small'>
                              {unit !== 'KRW'
                                ? '/' + ' ' + formatPriceMultilingual(order.totalAmount * order.exchangeRate, unit)
                                : null}
                            </span>
                          </div>
                        </div>

                        <div className='flex items-center gap-6 font-medium text-normal'>
                          {order.orderItems && order.orderItems.length > 0 ? (
                            <div className='font-medium lg:text-normal text-small'>
                              {order.orderItems.map((el, index) => {
                                return (
                                  <div key={index}>
                                    {el.orderItemAttributes.map((attribute, index) => {
                                      return (
                                        <div key={index}>
                                          {attribute.productSku.attributes.map((sku, index) => {
                                            return (
                                              <div key={index}>
                                                {sku.type}: {sku.attributeName}
                                              </div>
                                            )
                                          })}
                                        </div>
                                      )
                                    })}
                                  </div>
                                )
                              })}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>

                        {/* {order.coupons > 0 ? (
                          <div className='bg-[#EFEFEF] h-8 flex justify-center items-center w-[131px] text-normal'>
                            쿠폰: -15% 수송
                          </div>
                        ) : (
                          ''
                        )} */}
                      </div>
                    </div>

                    <div className=' flex flex-col items-end justify-between lg:gap-8 gap-4'>
                      <div
                        className='font-semibold lg:text-normal text-small h-9 flex justify-center items-center rounded px-4 capitalize'
                        style={{
                          color: getColorStatusOrder(order.status).color,
                          backgroundColor: getColorStatusOrder(order.status).bgColor,
                        }}
                      >
                        {getStatusByName(order.status)}
                      </div>

                      <div className='flex flex-col gap-2 items-end'>
                        <div>
                          {order.status === 'PENDING' && (
                            <div className='flex items-center gap-2'>
                              <div className='font-bold text-[#3B3B3B]'>079801-04-201422</div>
                              <button
                                className='min-w-14 border rounded-lg bg-[#EFEFEF] px-2 py-2 flex justify-center items-center h-7 lg:text-normal text-small'
                                onClick={handleCopy}
                              >
                                {t('copy')}
                              </button>
                            </div>
                          )}
                        </div>
                        <div className='flex items-center gap-1 text-small'>
                          <div className='font-bold text-[#3B3B3B]'>
                            {t('orderNumber')}: {order.orderCode}
                          </div>
                          <div className='bg-[#EFEFEF] w-9 h-[22px] flex justify-center items-center'>
                            {t('copyText')}
                          </div>
                        </div>
                        <div className='font-medium text-min text-[#8C8C8C]'>
                          {t('orderDate')}: {formatOrderDate(order.orderDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-[#F7F7F1] rounded-b-lg'>
                    <div className='flex items-center justify-between px-4 font-bold text-textPrd h-20'>
                      <div>
                        {t('totalBill')} ({order.orderItems.length} {' ' + t('product')})
                      </div>
                      <div className='flex flex-col gap-1 items-end'>
                        <div className='lg:text-largerPrdName text-textPrd'>{formatPrice(order.totalAmount)}</div>
                        <div className='lg:text-textPrd text-normal'>
                          {unit !== 'KRW'
                            ? formatPriceMultilingual(order.totalAmount * order.exchangeRate, unit)
                            : null}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-4 justify-end px-4 py-3'>
                      <button
                        className='px-4 rounded-lg h-9'
                        style={{ border: '1px solid black' }}
                        onClick={() => navigate(`/order-history-detail/${order.id}`)}
                      >
                        {t('viewDetails')}
                      </button>
                      {order.status === 'PENDING' ||
                      order.status === 'CONFIRM_PAYMENT' ||
                      order.status === 'PREPARING_DELIVERY' ? (
                        <button
                          className='px-4 rounded-lg h-9 bg-[#D3D2D2]'
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          {(order.status === 'PENDING') & (order?.orderItems[0].platformType == 'tyc')
                            ? t('btnCancel')
                            : t('requestCancelOrder')}
                        </button>
                      ) : (
                        <></>
                      )}

                      {/* <button className='w-[120px] rounded-lg h-9 bg-[#D1B584] text-white'>{t('buyAgain')}</button> */}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='text-[#3B3B3B] font-bold text-textPrd flex justify-center items-center h-80'>
              {t('noOrder')}
            </div>
          )}

          {dataOrder && dataOrder.length > 0 && (
            <div className='my-10'>
              <CustomPagination
                totalItems={totalProduct}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                currentSize={currentSize}
                align='center'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
