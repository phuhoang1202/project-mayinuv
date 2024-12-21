import React, { useEffect, useState } from 'react'
import IconError from '@assets/images/IconError.svg'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import IconOrderSuccessful from '@assets/images/IconOrderSuccessful.svg'
import { useNavigate } from 'react-router-dom'
import ScrollToTop from '@components/scrollToTop/ScrollToTop'
import { formatPrice, formatPriceMultilingual } from '@utils/index'
import { coupon } from '@services/user/coupon'
import { cart } from '@services/user/cart'
import { message } from 'antd'
import { Toast } from '@utils/toast'
import { useTranslation } from 'react-i18next'

export default function CurrentStep2({
  setCurrentStep,
  selectPaymentParent,
  billOrderParent,
  cartDataParent,
  exchangeRateParent,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [cartData, setCartData] = useState([])
  const [billOrder, setBillOrder] = useState([])
  const [dataCoupon, setDataCoupon] = useState([])
  const { t } = useTranslation()

  const navigate = useNavigate()
  // Kiểm tra nếu cả hai checkbox đều được chọn

  const [shippingAddress, setShippingAddress] = useState([])
  const [totalBillSession, setTotalBillSession] = useState(0)

  // Tiền tệ
  const [unit, setUnit] = useState('KRW')
  // const [language, setLanguage] = useState('ko')

  const getSessionData = (key) => {
    try {
      const data = sessionStorage.getItem(key)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error(`Error parsing sessionStorage for key "${key}":`, error)
      return []
    }
  }

  // const couponSession = getSessionData('coupon')
  const uniqueOrderId = getSessionData('orderId')
  const getOrderId = [...new Set(uniqueOrderId)]

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    // const getLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'
    const getTotalBill = JSON.parse(sessionStorage.getItem('totalBill')) || 0

    // setLanguage(getLanguage)
    setUnit(getUnitLocal)
    setTotalBillSession(getTotalBill)
  }, [unit])

  useEffect(() => {
    if (cartDataParent && cartDataParent.length > 0) {
      setCartData(cartDataParent)
    }
  }, [cartDataParent])

  const getInfoOrder = async () => {
    try {
      const response = await cart.getInfoOrder({
        cartIds: getOrderId,
      })

      setBillOrder(response.data)
    } catch (error) {
      Toast.error('장바구니 데이터를 가져오는 중 오류가 발생했습니다.')
    }
  }

  // const getCoupon = async () => {
  //   try {
  //     const response = await coupon.getOneCoupon(couponSession[0])
  //     setDataCoupon(response.data)
  //   } catch (error) {
  //     console.log('쿠폰 검색 실패')
  //   }
  // }

  const fetchShippingAddress = async () => {
    try {
      const response = await cart.getShippingAddress()
      setShippingAddress(response.data)
    } catch (err) {
      console.log('주소 데이터 검색에 실패했습니다.')
    }
  }

  useEffect(() => {
    getInfoOrder()
    // getCoupon()
    fetchShippingAddress()
  }, [])

  // const calculateTotal = (cartData) => {
  //   return cartData.reduce((total, item) => {
  //     return total + (item.product.salePrice || 0) * item.quantity
  //   }, 0)
  // }

  // // Sử dụng hàm tính tổng
  // const totalCartPrice = calculateTotal(cartData)

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

  const handleOrderHistory = async () => {
    navigate('/order-history')
  }

  return (
    <div className='mt-10 w-full'>
      <ScrollToTop />
      {selectPaymentParent === 0 ? (
        <div>
          <div className='flex flex-col lg:gap-6 gap-4'>
            <h3 className='text-[#3B3B3B] font-bold lg:text-textPrd text-normal'>{t('warningText1')}</h3>

            <div className='text-[#F14646] font-medium lg:text-normal text-small flex items-center gap-1'>
              <img src={IconError} alt='icon' />
              {t('warningText2')}
            </div>
            <div className='flex flex-col lg:gap-6 gap-4'>
              <div>
                <div className='text-[#3B3B3B] bg-[#F7F7F1] px-4 py-[22px] rounded-lg flex flex-col gap-1'>
                  <div className='font-medium lg:text-normal text-small'>{t('bank')}</div>
                  <div className='flex items-center justify-between'>
                    <div className='font-bold lg:text-bigPrdName text-textPrd'>079801-04-201422</div>
                    <div className='bg-[#D3D2D2] rounded'>
                      <button
                        className='min-w-14 px-2 py-2 flex justify-center items-center h-7 lg:text-normal text-small'
                        onClick={handleCopy}
                      >
                        {t('copy')}
                      </button>
                    </div>
                  </div>
                  <div className='font-medium lg:text-normal text-small'>{t('addressBank')}</div>
                </div>

                <div className='flex items-center gap-2 mt-4'>
                  {/* <input
                    type='checkbox'
                    checked={isCheckboxChecked1}
                    onChange={() => setIsCheckboxChecked1(!isCheckboxChecked1)}
                  /> */}
                  <span className='text-[#F14646] font-medium text-small'>{t('warningText3')}</span>
                </div>
              </div>

              <div className='text-[#3B3B3B] font-medium lg:text-normal text-small'>
                <strong className='font-bold'>{t('reference')}: </strong>
                {t('payment')}
              </div>

              <div className='bg-[#F8F8F8] h-[94px] flex items-center justify-between px-3 text-[#3B3B3B] rounded-lg'>
                <div className='font-bold text-normal'>{t('amountDeposited')}:</div>

                <div className='flex flex-col items-end'>
                  <div className='font-bold lg:text-bigPrdName text-largerPrdName'>{formatPrice(totalBillSession)}</div>
                  <div className='font-bold text-primaryPrdName'>
                    {unit !== 'KRW' ? (
                      <>
                        {cartData[0].cartItemAttributeOptions && cartData[0].cartItemAttributeOptions.length > 0
                          ? formatPriceMultilingual(totalBillSession * exchangeRateParent, unit)
                          : formatPriceMultilingual(totalBillSession * exchangeRateParent, unit)}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-3'>
                <h4 className='font-bold lg:text-normal text-small'>{t('warningText6')}</h4>
                <div className='font-medium lg:text-normal text-small'>
                  {/* {t('warningText4')} <br /> */}
                  {t('warningText5')} <br />
                  {t('warningText7')}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex flex-col justify-center items-center mt-[76px]'>
            <div className='font-medium text-normal'>{t('orderSuccessful')}</div>
            <img src={IconOrderSuccessful} alt='icon' />
          </div>
          <div className='mt-[76px]'>
            <div className='flex items-center justify-between px-4 h-[52px] text-[#3B3B3B] bg-[#F8F8F8] rounded-lg font-bold w-full'>
              <div>{t('TYCRemaining')}</div>
              <div className='text-largerPrdName'>120.000 </div>
            </div>

            <div className='mt-8'>
              <button
                className={`bg-[#D1B584] h-11 w-full text-white flex justify-center items-center rounded-lg font-semibold text-normal`}
                onClick={() => navigate('/')}
              >
                {t('orderDetail')} <img src={IconChevronRight} alt='icon' />
              </button>
            </div>
          </div>
        </div>
      )}

      {selectPaymentParent === 0 ? (
        <div className='flex justify-between lg:gap-10 gap-2 items-center mt-6'>
          <button
            onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
            className='h-11 lg:w-[294px] w-1/2 text-[#3B3B3B] flex justify-center items-center rounded-lg font-medium text-normal'
            style={{ border: '2px solid black' }}
          >
            {t('btnBackStep')}
          </button>
          <button
            className={` h-11 flex-1 text-white flex justify-center items-center rounded-lg font-semibold text-normal cursor-pointer bg-[#D1B584]`}
            onClick={handleOrderHistory}
            // disabled={!isButtonActive}
          >
            {t('orderDetail')} <img src={IconChevronRight} alt='icon' />
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
