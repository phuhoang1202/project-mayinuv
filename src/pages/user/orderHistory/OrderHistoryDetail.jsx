import React, { useEffect, useState } from 'react'
import IconInvoice from '@assets/images/IconInvoice.svg'
import IconTruck from '@assets/images/IconTruck.svg'
import IconUserOrder from '@assets/images/IconUserOrder.svg'
import IconShippingArrow from '@assets/images/IconShippingArrow.svg'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import IconArrowUpFill from '@assets/images/IconArrowUpFill.svg'
import IconTicketSale from '@assets/images/IconTicketSale.svg'
import { constants as c } from '@constants'
import { useParams } from 'react-router-dom'
import { cart } from '@services/user/cart'
import { Toast } from '@utils/toast'
import { formatOrderDate, formatOrderDateExpected, formatPrice, formatPriceMultilingual } from '@utils/index'
import { useTranslation } from 'react-i18next'
import { Tooltip, message } from 'antd'
import ImageError from '@assets/images/ImageError.svg'

export default function OrderHistoryDetail() {
  const [orderDetail, setOrderDetail] = useState({})
  const param = useParams()
  const { id } = param
  const { t } = useTranslation()
  const [total, setTotal] = useState(0)

  // Tiền tệ
  const [unit, setUnit] = useState('CNH')
  // const [language, setLanguage] = useState('ko')

  // useEffect to call the API on component mount

  const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'CNH'
  // const getLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'

  useEffect(() => {
    // setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [unit])

  const getOrderDetail = async () => {
    try {
      const bodyPayload = {
        orderId: Number(id),
        currency: unit,
      }
      const response = await cart.orderDetail(bodyPayload)
      const data = response.data

      // Tính tổng giá trị sản phẩm
      const totalValue = data.orderItems.reduce((total, item) => {
        return total + item.quantity * item.price
      }, 0)
      setTotal(totalValue)

      setOrderDetail(response.data)
      // Toast.success('주문 데이터를 성공적으로 검색했습니다.')
    } catch (error) {
      Toast.error('주문 데이터 검색에 실패했습니다.')
    }
  }

  useEffect(() => {
    getOrderDetail()
  }, [])

  const handleCopyOrder = (numberOrder) => {
    navigator.clipboard
      .writeText(numberOrder)
      .then(() => {
        message.success('복사되었습니다!')
      })
      .catch((error) => {
        message.error('복사에 실패했습니다')
      })
  }

  return (
    <div className='max-w-7xl mx-auto lg:mt-24 mt-20 lg:px-0 px-2'>
      <div className='lg:w-[952px] w-full mt-6'>
        <div>
          <div className='flex items-center justify-between'>
            <div className='font-semibold text-primaryPrdName text-[#3B3B3B]'>{t('successfullyDelivered')}</div>
            <div className='flex items-center gap-1 font-medium text-normal'>
              <img src={IconInvoice} alt='icon' /> {t('invoiceIssuance')}
            </div>
          </div>
        </div>

        <div className='mt-4'>
          {orderDetail?.orderItems && orderDetail?.orderItems?.length > 0 ? (
            <div className='bg-[#F8F8F8] rounded-lg'>
              {orderDetail.orderItems.map((order, index) => {
                const image = order.product?.productImages.find((image) => image.main)?.imageUrl
                return (
                  <div style={{ borderBottom: '1px solid #EFEFEF' }} key={index}>
                    <div className='flex lg:flex-row flex-col lg:gap-8 gap-4 mt-4 p-4 '>
                      <div className='flex items-start gap-4'>
                        <div className='lg:w-[170px] lg:h-[146px] w-[140px] h-[116px]'>
                          <img
                            src={`${c.DOMAIN_IMG}${image}`}
                            alt={`image`}
                            className='w-full h-full object-cover rounded-lg'
                            loading='lazy'
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = ImageError
                            }}
                          />
                        </div>

                        <div className='font-medium text-normal text-[#3B3B3B] flex flex-col gap-2 w-full px-[10px]'>
                          <div className='flex flex-col gap-1'>
                            <h3 className='font-semibold text-primaryPrdName'>
                              <Tooltip title={order.product.productName}>
                                <div>
                                  {order.product.productName.length > 40
                                    ? `${order.product.productName.substring(0, 40)}...`
                                    : order.product.productName}
                                </div>
                              </Tooltip>
                            </h3>
                            {/* <div>
                            <div className='text-normal font-medium flex items-center gap-2'>
                              {order.product.promotions && order.product.promotions.some((e) => e.type === 'sale') ? (
                                order.product.promotions.map((e) => {
                                  if (e.type === 'sale') {
                                    const discountedPrice = Math.floor(
                                      order.product.price * (1 - e.discountPercent / 100),
                                    )

                                    return (
                                      <div key={e.id} className='flex items-center gap-2'>
                                        <span>{discountedPrice}</span>
                                        <span className='text-[#8C8C8C] text-small line-through'>
                                          {formatPrice(order.product.price)}
                                        </span>
                                        <div className='w-[48px] h-[22px] bg-[#2DC033] text-white text-small rounded-full flex justify-center items-center'>
                                          -{e.discountPercent}%
                                        </div>
                                      </div>
                                    )
                                  }
                                  return null
                                })
                              ) : (
                                <div>
                                  <span>{formatPrice(order?.price)}</span>
                                </div>
                              )}
                            </div>
                          </div> */}
                            <div className='font-bold text-primaryPrdName'>
                              {unit !== 'KRW'
                                ? formatPriceMultilingual(order?.price * orderDetail.exchangeRate, unit)
                                : null}
                            </div>
                          </div>

                          <div>
                            {orderDetail.orderItems[index].orderItemAttributes &&
                            orderDetail.orderItems[index].orderItemAttributes.length > 0 ? (
                              <div className='flex flex-col gap-4'>
                                {orderDetail.orderItems[index].orderItemAttributes.map((attributes, index) => {
                                  return (
                                    <div>
                                      {attributes.productSku.attributes.map((el, index) => (
                                        <div key={index} className='lg:text-normal text-small'>
                                          {el.type} : {el.attributeName}
                                        </div>
                                      ))}
                                      {/* <div>옵션 1: 검은색</div>
                                    <div>옵션 2: 0038</div>
                                    <div>수량: 100</div> */}
                                    </div>
                                  )
                                })}
                              </div>
                            ) : (
                              <div>
                                {t('quantity')}: {orderDetail.orderItems[index].quantity}
                              </div>
                            )}
                          </div>

                          {/* <div className='bg-[#EFEFEF] w-[131px] h-8 flex justify-center items-center'>
                          쿠폰: -15% 수송
                        </div> */}
                        </div>
                      </div>

                      {index === 0 && (
                        <div className='flex flex-col items-end lg:gap-8 gap-4'>
                          <div className='bg-[#EFEFEF] text-[#F14646] px-3 py-1 font-semibold h-9 flex justify-center items-center rounded'>
                            {orderDetail.status}
                          </div>

                          <div className='flex flex-col items-end'>
                            <div className='flex items-center gap-1 w-full'>
                              <div className='font-bold text-small '>
                                {t('orderNumber')}: {orderDetail.orderCode}
                              </div>
                              <button
                                className='bg-[#EFEFEF] flex justify-center items-center text-min px-1 w-10'
                                onClick={() => handleCopyOrder(orderDetail.orderCode)}
                              >
                                {t('copyText')}
                              </button>
                            </div>
                            <div className='text-[#8C8C8C] text-min'>
                              {t('orderDate')}: {formatOrderDate(orderDetail.orderDate)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            ''
          )}
          <div>
            {/* Bill */}
            {orderDetail?.orderItems && orderDetail?.orderItems?.length > 0 && (
              <>
                <div className='bg-[#F7F7F1] px-4'>
                  <div className='py-3' style={{ borderBottom: '1px solid #EFEFEF' }}>
                    <div>
                      <h3 className='font-bold text-normal text-[#282828]'>{t('productBillText')} </h3>
                      {orderDetail.orderItems.map((order, index) => {
                        return (
                          <div
                            className='flex items-center justify-between mt-2 font-medium text-normal text-[#3B3B3B]'
                            key={index}
                          >
                            <div>
                              <Tooltip title={order.product.productName}>
                                <div className='block truncate lg:w-60 w-52'>{order.product.productName}</div>
                              </Tooltip>
                            </div>

                            <div className='font-semibold text-normal text-[#3B3B3B]'>
                              {formatPrice(order?.price)}
                              <span className='font-semibold text-small'>
                                {unit !== 'KRW'
                                  ? ' ' +
                                    '/' +
                                    ' ' +
                                    formatPriceMultilingual(order?.price * orderDetail.exchangeRate, unit)
                                  : null}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className='mt-2'>
                      <div className='flex items-center justify-between mt-2 font-bold text-normal text-[#333333]'>
                        <div>
                          {t('totalBill')} ({orderDetail?.orderItems.length} {t('product')})
                        </div>
                        <div className='font-bold text-normal text-[#3B3B3B]'>
                          {formatPrice(total)}
                          <span className='font-bold text-small'>
                            {unit !== 'KRW'
                              ? ' ' + '/' + ' ' + formatPriceMultilingual(total * orderDetail.exchangeRate, unit)
                              : null}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center justify-between py-4 font-bold lg:text-textPrd text-primaryPrdName text-[#3B3B3B]'>
                    <div>
                      {t('totalBill')} ({orderDetail?.orderItems.length}
                      {t('product')})
                    </div>
                    <div className='flex flex-col items-end'>
                      <div className='lg:text-largerPrdName text-textPrd'>
                        {formatPrice(total)}
                        <span className='font-semibold text-textPrd'>
                          {unit !== 'KRW'
                            ? ' ' + '/' + ' ' + formatPriceMultilingual(total * orderDetail.exchangeRate, unit)
                            : null}
                        </span>
                      </div>
                      <div>
                        {formatPrice(orderDetail?.shippingList[0].shippingCost)}
                        <span className='font-semibold text-primaryPrdName'>
                          {unit !== 'KRW'
                            ? ' ' +
                              '/' +
                              ' ' +
                              formatPriceMultilingual(
                                orderDetail?.shippingList[0].shippingCost * orderDetail.exchangeRate,
                                unit,
                              )
                            : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className='bg-[#F8F8F8] p-4 rounded-lg lg:mt-6 mt-2'>
          <h3 className='font-bold text-primaryPrdName'>{t('shippingInformation')}</h3>
          <div className='mt-4'>
            <div className='flex items-center justify-between text-[#3B3B3B]'>
              <div className='flex items-center gap-1 text-normal font-medium'>
                <img src={IconTruck} alt='icon' />
                {t('orderDate')}: {formatOrderDate(orderDetail?.orderDate)}
              </div>

              {/* <div className='flex items-center gap-1 text-normal font-medium'>
                배송 세부정보 보기 <img src={IconArrowDownFill} alt='icon' />
              </div> */}
            </div>

            <div>
              <img src={IconShippingArrow} alt='icon' />
            </div>

            {orderDetail?.shippingList?.length > 0 && (
              <div>
                <div className='flex items-center text-[#3B3B3B]'>
                  <div className='flex items-center gap-1 text-normal font-medium'>
                    <img src={IconUserOrder} alt='icon' />
                    {t('expectedDate')}: {formatOrderDateExpected(orderDetail?.shippingList[0]?.estimatedDeliveryDate)}{' '}
                    - {formatOrderDateExpected(orderDetail?.shippingList[0]?.actualDeliveryDate)}
                  </div>
                </div>
                <div className='mt-2 text-[#707070] font-medium text-normal'>
                  <div>{orderDetail.shippingList[0]?.shippingAddress?.recipientName}</div>
                  <p>
                    {orderDetail.shippingList[0]?.shippingAddress?.recipientPhone}{' '}
                    {orderDetail.shippingList[0]?.shippingAddress?.address}{' '}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
