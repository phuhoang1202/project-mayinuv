import React, { useEffect, useState } from 'react'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import IconArrowUpFill from '@assets/images/IconArrowUpFill.svg'
import IconAccountTransfer from '@assets/images/IconAccountTransfer.svg'
import IconAccountTransfer2 from '@assets/images/IconAccountTransfer2.svg'
import IconAccountTransferActive from '@assets/images/IconAccountTransferActive.svg'
import IconAccountTransferActive2 from '@assets/images/IconAccountTransferActive2.svg'
import IconWalletOutline from '@assets/images/IconWalletOutline.svg'
import CouponPercent from '@assets/images/coupon/CouponPercent.svg'
import CouponPrice from '@assets/images/coupon/CouponPrice.svg'
import IconError from '@assets/images/IconError.svg'
import IconTicketSale from '@assets/images/IconTicketSale.svg'
import { Space, Collapse } from 'antd'
import { cart } from '@services/user/cart'
import { Toast } from '@utils/toast'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { formatPrice, formatPriceMultilingual } from '@utils/index'
import { coupon } from '@services/user/coupon'
import ScrollToTop from '@components/scrollToTop/ScrollToTop'
import { walletservice } from '@services/user/walletservice'

export default function CurrentStep1({
  setCurrentStep,
  setSelectPaymentParent,
  cartDataParent,
  setBillOrderParent,
  exchangeRateParent,
  description,
  descriptionOrder,
  shippingAddressShip,
}) {
  const [selectPayment, setSelectPayment] = useState(0)
  const [cartData, setCartData] = useState([])
  const [billOrder, setBillOrder] = useState([])
  const [dataCoupon, setDataCoupon] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  // const uniqueOrderId = JSON.parse(sessionStorage.getItem('orderId'))
  // const getOrderId = [...new Set(uniqueOrderId)]
  // const stringBanking = `${nameBanking}, ${numberBanking}, ${accountBanking}`
  const [shippingAddress, setShippingAddress] = useState([])
  const shippingFeeOrder = 5000
  const [checkCategori, setCheckCategori] = useState(0)

  // wallet
  const [dataInforWallet, setDataInforWallet] = useState({})

  // Tiền tệ
  const [unit, setUnit] = useState('')
  // const [language, setLanguage] = useState('ko')

  // useEffect to call the API on component mount
  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    // const getLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'
    const getCheckCategory = JSON.parse(sessionStorage.getItem('checkCategory')) || 0

    // setLanguage(getLanguage)
    setUnit(getUnitLocal)
    setCheckCategori(getCheckCategory)
  }, [unit])

  const { t } = useTranslation()

  const dataConfirm = [
    {
      key: '1',
      label: `${t('coupon')}`,
    },
  ]

  const getSessionData = (key) => {
    try {
      const data = sessionStorage.getItem(key)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error(`Error parsing sessionStorage for key "${key}":`, error)
      return []
    }
  }

  const uniqueOrderId = getSessionData('orderId')
  const getOrderId = [...new Set(uniqueOrderId)]
  const couponSession = getSessionData('coupon')
  const infoOrder = getSessionData('infoOrder')

  setSelectPaymentParent(selectPayment)

  const handleTermsCheckboxChange = () => {
    setIsTermsChecked(!isTermsChecked)
  }

  const handleSelect = (option) => {
    setIsDropdownOpen(false)
  }

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

  const getWallet = async () => {
    try {
      const response = await walletservice.getInfoWallet()
      setDataInforWallet(response.data)
    } catch (error) {
      console.log('쿠폰 검색 실패')
    }
  }

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
    getWallet()
    fetchShippingAddress()
  }, [])

  useEffect(() => {
    if (infoOrder && infoOrder.length > 0) {
      setCartData(infoOrder)
    }
  }, [])

  // Tính tổng
  const subtotal = billOrder?.orderResultModel?.reduce((total, item) => total + item.price, 0)
  const discount = dataCoupon?.discountValue
    ? dataCoupon.discountType === 'percentage'
      ? (subtotal * dataCoupon.discountValue) / 100
      : dataCoupon.discountValue
    : 0

  const totalPrice = subtotal + billOrder.shippingCost - discount

  const handleCreateOrder = async () => {
    if (selectPayment === 1 && totalPrice > dataInforWallet.balance) {
      Toast.error('결제할 금액이 부족합니다. 결제 수단을 변경하세요.')
      return
    }

    // Lấy id của địa chỉ đầu tiên

    const shippingAddressId = shippingAddressShip.find((el) => el.checked === true)

    // Đảm bảo `cartDataParent` là mảng hợp lệ
    const orderItems = Array.isArray(cartDataParent)
      ? cartDataParent.map((item) => ({
          price: totalPrice || 0,
          productId: item.product.id || 0,
          quantity: item.quantity || 0,
          orderItemAttributes: Array.isArray(item.cartItemAttributeOptions)
            ? item.cartItemAttributeOptions.map((attr) => ({
                // id: attr.id || 0,
                // orderItemId: attr.cartItemId || 0, // Gán theo cartItemId
                price: attr.productSku?.price || 0,
                productSku: {
                  id: attr.productSku?.id || 0,
                  price: attr.productSku?.price || 0,
                  productId: attr.productSku?.productId || 0,
                  quantity: attr.productSku?.quantity || 0,
                  sku: attr.productSku?.sku || '',
                  attributes: Array.isArray(attr.productSku?.attributes)
                    ? attr.productSku.attributes.map((attribute) => ({
                        id: attribute.id || 0,
                        attributeName: attribute.attributeName || '',
                        type: attribute.type || '',
                      }))
                    : [],
                },
                quantityOrder: attr.quantityOrder || 0,
              }))
            : [],
        }))
      : [] // Nếu `cartDataParent` không phải mảng, trả về mảng rỗng
    // Create payload
    const bodyPayload = {
      descriptionOrder: description,
      descriptions: description === '직접 입력' ? descriptionOrder : '',
      couponIds: couponSession,
      orderItems,
      paymentMethod: selectPayment === 0 ? 'banking' : 'wallet',
      shippingAddressId: shippingAddressId?.id,
      shippingCost: billOrder.shippingCost,
      shippingMethod: 'EXPRESS',
      cardItemIds: getOrderId,
    }

    try {
      setIsLoading(true)
      await cart.createOrder(bodyPayload)
      Toast.success('주문이 성공적으로 생성되었습니다.')
      // sessionStorage.removeItem('orderId')
      billOrder?.orderResultModel
        ? sessionStorage.setItem('totalBill', JSON.stringify(totalPrice))
        : sessionStorage.setItem(
            'totalBill',
            JSON.stringify(cartData[0]?.product.salePrice * cartData[0]?.quantity + checkCategori),
          )

      setCurrentStep((prevStep) => prevStep + 1)
    } catch (error) {
      Toast.error(error.response.data.message || '귀하의 주문이 성공적으로 생성되지 않았습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <ScrollToTop />
      <div className='lg:w-[843px]'>
        {/* Coupon */}

        {/* Select payment */}
        <div className='mt-5'>
          <h3 className='text-[#3B3B3B] font-bold text-textPrd'>{t('paymentMethodText')}</h3>
          <div className='mt-4 flex justify-between items-center lg:gap-0 gap-2'>
            {/* First Payment Method */}
            <div
              className={`${
                selectPayment === 0
                  ? 'lg:w-[515px] w-[300px] bg-[#FAF4EA] h-[99px] '
                  : 'lg:w-[296px] w-full bg-[#EFEFEF] h-[77px]'
              } flex justify-center items-center rounded-lg px-1`}
              style={{ border: `${selectPayment === 0 ? '1px solid black' : ''}` }}
              onClick={() => setSelectPayment(0)}
            >
              <img src={`${selectPayment === 0 ? IconAccountTransferActive : IconAccountTransfer}`} alt='images' />
              <div
                className={`${
                  selectPayment === 0 ? 'text-[#3B3B3B] text-normal' : 'text-[#8C8C8C] text-small'
                } font-bold `}
              >
                {t('accountTransfer')}
              </div>
            </div>

            {/* Second Payment Method */}
            <div className='relative'>
              <div
                className={`${
                  selectPayment === 1
                    ? 'lg:w-[515px] w-[300px] bg-[#FAF4EA] h-[99px]'
                    : 'lg:w-[296px] w-full bg-[#EFEFEF] h-[77px]'
                } flex justify-center items-center rounded-lg px-1`}
                style={{ border: `${selectPayment === 1 ? '1px solid black' : ''}` }}
                onClick={() => setSelectPayment(1)}
              >
                <img src={selectPayment === 1 ? IconAccountTransferActive2 : IconAccountTransfer2} alt='images' />
                <div
                  className={`${
                    selectPayment === 1 ? 'text-[#3B3B3B] text-normal' : 'text-[#8C8C8C] text-small'
                  } font-bold `}
                >
                  {t('TYCPoints')}
                </div>
              </div>

              {selectPayment === 1 ? (
                <div className='absolute -bottom-14 right-0'>
                  <div className='flex gap-9 items-center justify-between'>
                    {/* Check dataInforWallet */}
                    {totalPrice > dataInforWallet.balance && (
                      <div className='text-[#F14646] flex gap-2 items-center text-min font-medium'>
                        <img src={IconError} alt='icon' />
                        {t('walletText')}
                      </div>
                    )}

                    <div className='flex items-center justify-center font-medium text-normal text-[#3B3B3B] bg-[#E9D2A9] rounded-lg w-[107px] h-10 '>
                      <button
                        className='flex items-center'
                        onClick={() => {
                          sessionStorage.setItem('currentStep', 1)
                          navigate('/tyc-deposit')
                        }}
                      >
                        <img src={IconWalletOutline} alt='image' />
                        {t('chargeText')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>

        {/* Bill */}
        <div className='mt-16'>
          <div className='bg-[#F8F8F8] rounded-t-lg'>
            <div className='lg:px-8 lg:py-4 px-4 py-2'>
              <div>
                <div style={{ borderBottom: '1px solid #D3D2D2' }}>
                  <h3 className='font-semibold text-primaryPrdName'>{t('productBillText')}</h3>
                </div>

                <div className='mt-4 flex flex-col gap-2'>
                  {billOrder.orderResultModel && billOrder?.orderResultModel?.length > 0 ? (
                    <>
                      <div>
                        {billOrder?.orderResultModel?.map((bill, index) => (
                          <div>
                            <div className='flex justify-between items-center font-medium text-normal mt-2' key={index}>
                              <div>
                                {bill.title} ({bill.quantity})
                              </div>
                              <div>
                                {formatPrice(bill.price)}
                                <span className='font-bold text-small text-[#8C8C8C]'>
                                  {unit && unit !== 'KRW'
                                    ? '/' + ' ' + formatPriceMultilingual(bill.price * exchangeRateParent, unit)
                                    : null}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* <div className='flex justify-between items-center font-bold text-normal text-[#333333]'>
                        <div>
                          총 ({billOrder.orderResultModel.reduce((total, item) => total + item.quantity, 0)} 개 제품)
                        </div>
                        <div>
                          {formatPrice(billOrder.orderResultModel.reduce((total, item) => total + item.price, 0))}
                        </div>
                      </div> */}

                      {/* <div className='flex justify-between items-center font-bold text-normal text-[#333333]'>
                        <div>총 (3개 제품) </div>
                        <div>97.000원 </div>
                      </div> */}
                    </>
                  ) : (
                    <div>
                      {/* Mua ngay */}
                      <div>
                        {cartData?.map((bill, index) => {
                          return (
                            <>
                              <div>
                                <div
                                  className='flex justify-between items-center font-medium text-normal mt-2'
                                  key={index}
                                >
                                  <div>
                                    {bill.product.productName} ({bill.quantity})
                                  </div>
                                  <div>
                                    {formatPrice(bill.product.salePrice * bill.quantity)}
                                    <span className='font-bold text-small text-[#8C8C8C]'>
                                      {unit && unit !== 'KRW'
                                        ? '/' +
                                          ' ' +
                                          formatPriceMultilingual(
                                            bill.product.salePrice * bill.quantity * exchangeRateParent,
                                            unit,
                                          )
                                        : null}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className='mt-4'>
                <div style={{ borderBottom: '1px solid #D3D2D2' }}>
                  <div className='flex justify-between items-center'>
                    <h3 className='font-semibold text-primaryPrdName'>{t('charge')}</h3>
                  </div>
                </div>

                <div className='mt-4 flex flex-col gap-2 font-medium text-normal'>
                  <div className='flex justify-between items-center'>
                    <div>{t('shippingFee')}</div>
                    <div>
                      {billOrder.orderResultModel && billOrder.orderResultModel.length > 0
                        ? formatPrice(billOrder.shippingCost)
                        : formatPrice(checkCategori)}

                      <span className='font-bold text-small text-[#8C8C8C]'>
                        {billOrder.shippingCost === 0
                          ? unit && unit !== 'KRW'
                            ? '/' + ' ' + formatPriceMultilingual(checkCategori * exchangeRateParent, unit)
                            : null
                          : unit && unit !== 'KRW'
                          ? '/' + ' ' + formatPriceMultilingual(billOrder.shippingCost * exchangeRateParent, unit)
                          : null}
                      </span>
                    </div>
                  </div>
                  {dataCoupon && dataCoupon.length > 0 && (
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center rounded-lg gap-2'>
                        <div>{t('useCoupon')}</div>
                        <div className='flex items-center justify-center bg-[#D3D2D2] w-[84px] h-[22px] rounded'>
                          <img src={IconTicketSale} alt='icon' className='w-7 h-7' />
                          <div className='text-min'>
                            {dataCoupon?.discountType === 'percentage' ? dataCoupon?.discountValue + '%' : 0}
                            {t('discount')}
                          </div>
                        </div>
                      </div>
                      <div>{dataCoupon?.discountType === 'percentage' ? dataCoupon?.discountValue + '%' : 0}</div>
                    </div>
                  )}

                  {/* <div className='flex justify-between items-center'>
                    <div>충전포인트 결제</div>
                    <div>-3,000원</div>
                  </div> */}
                  {/* <div className='flex justify-between items-center font-bold text-[#333333]'>
                    <div>총</div>
                    <div>2,000원</div>
                  </div> */}
                </div>
              </div>
              {/* <div className='text-[#F14646] flex justify-end items-center gap-2 text-[10px] mt-2'>
                <img src={IconError} alt='icon' /> 150개 상품부터 무료배송해드립니다
              </div> */}
              {/* <div className='mt-4'>
                <div className='flex justify-between items-center'>
                  <div>지불 방식</div>
                  <div className='relative'>
                    <button
                      onClick={() => setIsDropdownOpenBtn(!isDropdownOpenBtn)}
                      className='flex items-center justify-between w-[104px] h-9 rounded-[4px] bg-[#D3D2D2] px-2'
                    >
                      <div className='font-medium text-normal'>착불택배</div>
                      <img src={IconArrowDownFill} alt='icon arrow' className='h-6 w-6 p-1' />
                    </button>

                    {isDropdownOpen && (
                      <ul className='absolute right-0 mt-1 w-[104px] bg-white border border-gray-200 rounded-md shadow-lg'>
                        <li
                          onClick={() => handleSelect('착불택배')}
                          className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                        >
                          착불택배
                        </li>
                        <li
                          onClick={() => handleSelect('선불택배')}
                          className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                        >
                          선불택배
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div> */}
              {/* <div className='flex justify-end items-center font-medium text-min text-[#666666] mt-2'>
                상품에 세금이 포함되어 있습니다
              </div> */}
            </div>

            <div className='bg-[#3B3B3B] lg:px-8 px-4 mt-2 flex justify-between items-center p-4 h-[100px] rounded-b-lg'>
              <div className='text-white font-bold text-textPrd'>
                {t('totalBill')} ({billOrder?.orderResultModel ? billOrder?.orderResultModel?.length : 1} {t('product')}
                )
              </div>
              <div className='flex flex-col items-end text-white'>
                <div className='font-bold text-textPrd'>
                  {billOrder?.orderResultModel ? (
                    <>
                      {formatPrice(totalPrice)}
                      <span className='font-bold text-primaryPrdName text-white'>
                        {unit && unit !== 'KRW'
                          ? '/' +
                            ' ' +
                            formatPriceMultilingual((totalPrice + billOrder.shippingCost) * exchangeRateParent, unit)
                          : null}
                      </span>
                    </>
                  ) : (
                    <div className='flex flex-col items-end'>
                      {/* Khi mua ngay */}
                      <div className='font-bold text-largerPrdName'>
                        {formatPrice(cartData[0]?.product.salePrice * cartData[0]?.quantity + checkCategori)}
                      </div>
                      <div>
                        {unit && unit !== 'KRW'
                          ? formatPriceMultilingual(
                              (cartData[0]?.product.salePrice * cartData[0]?.quantity + checkCategori) *
                                exchangeRateParent,
                              unit,
                            )
                          : null}
                      </div>
                    </div>
                  )}
                </div>
                {/* <div className='font-bold text-primaryPrdName'>
                  {billOrder?.orderResultModel ? (
                    unit !== 'KRW' ? (
                      <>{'/' + ' ' + formatPriceMultilingual(totalPrice * exchangeRateParent, unit)}</>
                    ) : null
                  ) : (
                    <>
                      {'/' +
                        ' ' +
                        formatPriceMultilingual(
                          (cartData[0]?.cartItemAttributeOptions[0].productSku.price * cartData[0]?.quantity +
                            shippingFeeOrder) *
                            cartData[0]?.quantity *
                            exchangeRateParent,
                          unit,
                        )}
                    </>
                  )}
                </div> */}
                {/* <div className='font-medium text-small'>적립예정 237원 (1%)</div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Confirm */}
        <div className='mt-5'>
          {/* <Space direction='vertical w-full'>
            {dataConfirm.map((item) => (
              <div key={item.key} className='mb-4 w-full'>
                <Collapse
                  collapsible='header'
                  defaultActiveKey={['1']}
                  expandIconPosition='end'
                  className='bg-[#F8F8F8]'
                  // style={{ border: 'none' }}
                  expandIcon={({ isActive }) => (
                    <img
                      src={isActive ? IconArrowDownFill : IconArrowUpFill}
                      alt='Arrow Icon'
                      style={{
                        transition: 'transform 0.2s ease-in-out',
                      }}
                    />
                  )}
                  items={[
                    {
                      key: item.key,
                      label: <div className='font-bold text-primaryPrdName'>{item.label}</div>,
                      children: (
                        <div className='text-[#3B3B3B] font-medium text-normal leading-6'>
                          <p>
                            Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel
                            pulvinar id enim turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor
                            feugiat. Pellentesque convallis egestas erat urna interdum. Posuere non ac justo tortor. Et
                            amet blandit feugiat mattis netus eu mauris suscipit amet. Purus pretium ut diam et netus
                            venenatis ultricies pulvinar dignissim. In turpis congue eget sit. Tempus sit nam aliquet
                            blandit in in leo tortor. Mattis sed a ut sed ipsum ut.
                          </p>

                          <p>
                            Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel
                            pulvinar id enim turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor
                            feugiat. Pellentesque convallis egestas erat urna interdum. Posuere non ac justo tortor. Et
                            amet blandit feugiat mattis netus eu mauris suscipit amet. Purus pretium ut diam et netus
                            venenatis ultricies pulvinar dignissim. In turpis congue eget sit. Tempus sit nam aliquet
                            blandit in in leo tortor. Mattis sed a ut sed ipsum ut.
                          </p>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            ))}
          </Space> */}

          <div className='font-medium text-normal flex flex-col gap-4'>
            <div className='flex justify-between items-center w-[333px]'>
              <div className='flex gap-2 items-center '>
                <input
                  type='checkbox'
                  className='w-[18px] h-[18px]'
                  checked={isTermsChecked}
                  onChange={handleTermsCheckboxChange}
                />
                <div className='font-medium text-min'>
                  {t('clause1')}
                  {/* <span className='text-[#C17C00]'>{t('clause2')}</span> */}
                </div>
              </div>
              {/* <div className='font-medium text-min'>{t('termsAndConditions')}</div> */}
            </div>

            <div className='flex justify-between items-center text-normal'>
              <div className='font-medium text-[#3B3B3B]'>{t('agreeToOrder')}</div>
              {/* <div className='text-[#36BDF7] font-semibold'>{t('viewFullText')}</div> */}
            </div>

            <div className='flex justify-between items-center text-normal'>
              <div className='font-medium text-[#3B3B3B]'>{t('informationCollection')}</div>
              {/* <div className='text-[#36BDF7] font-semibold'>{t('viewFullText')}</div> */}
            </div>
          </div>
        </div>

        <div className='flex justify-center lg:gap-8 gap-2 items-center lg:mt-[88px] mt-10'>
          <button
            onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
            style={{ border: '2px solid #3B3B3B' }}
            className='h-11 w-[294px] text-[#3B3B3B] flex justify-center items-center rounded-lg font-medium text-normal'
          >
            {t('btnCancel')}
          </button>
          <button
            className={`bg-[#D1B584] h-11 flex-1 text-white flex justify-center items-center rounded-lg font-semibold text-normal ${
              isTermsChecked ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isTermsChecked}
            onClick={handleCreateOrder}
          >
            {t('btnNext')}
            <img src={IconChevronRight} alt='icon' />
          </button>
        </div>
      </div>
    </div>
  )
}
