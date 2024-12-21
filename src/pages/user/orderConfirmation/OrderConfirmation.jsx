import React, { useEffect, useState } from 'react'
import IconArrowRight from '@assets/images/IconArrowRight.svg'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import flagKR from '@assets/images/flag/FlagKR.svg'
import CurrentStep0 from './stepComponent/CurrentStep0'
import CurrentStep1 from './stepComponent/CurrentStep1'
import CurrentStep2 from './stepComponent/CurrentStep2'
import { cart } from '@services/user/cart'
import ScrollToTop from '@components/scrollToTop/ScrollToTop'
import { currencyExchange } from '@services/user/currencyExchange'
import { useTranslation } from 'react-i18next'

export default function OrderConfirmation() {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectPaymentParent, setSelectPaymentParent] = useState(0)
  const infoOrder = JSON.parse(sessionStorage.getItem('infoOrder'))

  const uniqueOrderId = JSON.parse(sessionStorage.getItem('orderId'))
  const getOrderId = [...new Set(uniqueOrderId)]
  const [shippingAddressId, setShippingAddressId] = useState(0)
  const [shippingAddressShip, setShippingAddressShip] = useState([])

  // Tiền tệ
  const [unit, setUnit] = useState(JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW')
  // const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language')) || 'ko')
  const [billOrderParent, setBillOrderParent] = useState({})

  const stepsCurrent = [
    {
      id: 1,
      step: `${t('order1')}`,
    },
    { id: 2, step: `${t('order2')}` },
    { id: 3, step: `${t('order3')}` },
  ]
  const [cartData, setCartData] = useState([])
  const [exchangeRateParent, setExchangeRateParent] = useState()
  const [description, setDescription] = useState('')
  const [descriptionOrder, setDescriptionOrder] = useState('')

  const getExchange = async (getUnitLocal) => {
    try {
      const response = await currencyExchange.findAll(getUnitLocal)
      setExchangeRateParent(response.data[0].rate)
    } catch (error) {
      console.log('error')
    }
  }

  // Function to fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await cart.getCartByCondition({
        currency: unit,
        pageNumber: 0,
        pageSize: 8,
        // language,
      })

      // Lọc dữ liệu dựa trên infoOrder
      const matchedItems = response.data.content.filter((item) => getOrderId?.includes(item.id))
      setCartData(matchedItems)
      setExchangeRateParent(response.data.content[0].exchangeRate)
    } catch (error) {
      console.error('Error fetching cart data:', error)
    }
  }

  // useEffect to call the API on component mount
  useEffect(() => {
    const savedStep = sessionStorage.getItem('currentStep')
    if (savedStep !== null) {
      setCurrentStep(1)
      sessionStorage.removeItem('currentStep')
    }

    if (infoOrder && infoOrder.length > 0) {
      setCartData(infoOrder)
    } else {
      fetchCartData()
    }

    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    // const getLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'
    // setLanguage(getLanguage)
    setUnit(getUnitLocal)
    getExchange(getUnitLocal)
  }, [])

  return (
    <div className='max-w-7xl mx-auto lg:mt-28 mt-20 lg:px-0 px-2'>
      <ScrollToTop />
      {/* Steps container */}
      <div className='flex items-center  w-full'>
        {stepsCurrent.map((step, index) => (
          <div key={index} className='flex items-center gap-1'>
            {/* Step circle */}
            <div
              className={`flex items-center justify-center lg:w-10 lg:h-10 w-9 h-9 rounded-md font-bold text-textPrd ${
                currentStep >= index ? 'bg-[#3B3B3B] text-white' : 'bg-[#EFEFEF] text-[#AFAEAE]'
              }`}
            >
              {index + 1}
            </div>

            {/* Step title */}
            <div className='ml-2'>
              <div
                className={`${currentStep >= index ? 'text-[#3B3B3B]' : 'text-[#AFAEAE]'} font-semibold text-normal `}
              >
                {step.step}
              </div>
              <div className={`${currentStep >= index ? 'text-[#8C8C8C]' : 'text-[#D3D2D2]'} font-medium text-min`}>
                {step.description}
              </div>
            </div>

            {/* Step connector line */}
            {index < stepsCurrent.length - 1 && <img src={IconArrowRight} alt='icon' className='mx-2 w-4 h-4' />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className='mt-6 lg:w-[846px] w-full'>
        {currentStep === 0 && (
          <h3 className='font-bold lg:text-largerPrdName text-textPrd text-[#3B3B3B]'>{t('orderList')}</h3>
        )}
        <div className='w-full mt-4 gap-8'>
          {/* bên trái  */}
          <div>
            {currentStep === 0 && (
              <CurrentStep0
                cartDataParent={cartData}
                setCurrentStep={setCurrentStep}
                unit={unit}
                exchangeRateParent={exchangeRateParent}
                setShippingAddressId={setShippingAddressId}
                setDescription={setDescription}
                setDescriptionOrder={setDescriptionOrder}
                setShippingAddressShip={setShippingAddressShip}
              />
            )}
            {currentStep === 1 && (
              <CurrentStep1
                setCurrentStep={setCurrentStep}
                cartDataParent={cartData}
                setSelectPaymentParent={setSelectPaymentParent}
                setBillOrderParent={setBillOrderParent}
                exchangeRateParent={exchangeRateParent}
                description={description}
                descriptionOrder={descriptionOrder}
                shippingAddressShip={shippingAddressShip}
              />
            )}
            {currentStep === 2 && (
              <CurrentStep2
                setCurrentStep={setCurrentStep}
                selectPaymentParent={selectPaymentParent}
                billOrderParent={billOrderParent}
                cartDataParent={cartData}
                exchangeRateParent={exchangeRateParent}
              />
            )}
          </div>
          {/* bên phải */}
          {/* <div>
            {currentStep === 0 && (
              <div className='w-[405px] h-[304px] bg-[#F8F8F8] rounded-lg p-8'>
                <div className='flex flex-col items-center gap-1'>
                  <div className='w-20 h-20 rounded-full flex justify-center items-center'>
                    <img src={DefaultAvatar} alt='icon' className='object-cover' />
                  </div>
                  <div className='text-[#3B3B3B] font-semibold text-primaryPrdName'>홍길동</div>
                  <div className='text-[#8C8C8C] font-medium text-small'>회원정보</div>
                </div>

                <div className='flex justify-center items-center flex-col mt-4 gap-4'>
                  <div
                    className='flex justify-center items-center w-full rounded-lg border'
                    style={{ border: '1px solid #D3D2D2' }}
                  >
                    <img src={flagKR} className='h-[34px]' />
                    <input type='text' className='w-full px-2' />
                  </div>

                  <div className='w-full'>
                    <button className='text-white bg-[#3B3B3B] flex justify-center items-center w-full h-9 rounded-lg'>
                      변경하기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  )
}
