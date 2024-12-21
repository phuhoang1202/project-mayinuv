import React, { useEffect, useState } from 'react'
import RightCartProduct from './bodyCartProduct/RightCartProduct'
import { cart } from '@services/user/cart'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import IconArrowUpFill from '@assets/images/IconArrowUpFill.svg'
import IconClose from '@assets/images/IconClose.svg'
import { Space, Collapse, Tooltip } from 'antd'
import ReduceIcon from '@assets/icons/ReduceIcon.jsx'
import IncreaseIcon from '@assets/icons/IncreaseIcon.jsx'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import { constants as c } from '@constants'
import CustomPagination from '@components/customPagination/CustomPagination'
import { useNavigate } from 'react-router-dom'
import ModalProduct from './modalProduct/ModalProduct'
import IconTicketSale from '@assets/images/IconTicketSale.svg'
import IconError from '@assets/images/IconError.svg'
import { coupon } from '@services/user/coupon'
import CouponNumber from '@assets/images/coupon/CouponNumber.svg'
import CouponPercent from '@assets/images/coupon/CouponPercent.svg'
import CouponPrice from '@assets/images/coupon/CouponPrice.svg'
import { Toast } from '@utils/toast'
import { useTranslation } from 'react-i18next'
import { formatPrice, formatPriceMultilingual } from '@utils/index'
import Loading from '@components/loadingCommon/Loading'

export default function CartProduct() {
  const [cartData, setCartData] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [openModalIndex, setOpenModalIndex] = useState(null)
  const [quantities, setQuantities] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [totalProduct, setTotalProduct] = useState(0)

  const data = [
    {
      key: '1',
      label: `${t('collapseText')}`,
      text: 'Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim turpis.',
    },
  ]

  //  Bên phải
  const [isDropdownOpenCoupo, setIsDropdownOpenCoupo] = useState(false)
  const [isDropdownOpenBtn, setIsDropdownOpenBtn] = useState(false)
  const [billOrder, setBillOrder] = useState([])
  const [dataCoupon, setDataCoupon] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectCoupon, setSelectCoupon] = useState([])
  const [exchangePriceCom, setExchangePriceCom] = useState(0)

  // Tiền tệ
  const [unit, setUnit] = useState(JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW')
  // const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language')) || 'ko')

  // useEffect to call the API on component mount
  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    // const getLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'
    // setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [])

  // Function to fetch cart data
  const fetchCartData = async () => {
    try {
      setIsLoading(true)
      const response = await cart.getCartByCondition({
        currency: unit,
        pageNumber: 0,
        pageSize: 8,
        // language,
      })
      setCartData(response.data.content)
      setExchangePriceCom(response.data.content[0].exchangeRate)
      setTotalProduct(response.data.totalElements)
    } catch (error) {
      console.log('Error fetching cart data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCartData()
  }, [])

  // Handle select all checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    if (!selectAll) {
      // Select all items
      const allItemIds = cartData?.flatMap((store) => cartData.map((option) => option.id))
      setSelectedItems(allItemIds)
    } else {
      // Deselect all items
      setSelectedItems([])
    }
  }

  const handleItemCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      // Deselect item
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((id) => id !== itemId))
    } else {
      // Select item
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId])
    }
  }

  const updateQuantity = (cartIndex, attrIndex, newQuantity) => {
    const requestBody = {
      cartItemAttributeOptionId: cartData[cartIndex].cartItemAttributeOptions[attrIndex].id,
      quantityOrder: newQuantity,
    }

    // Call API to update the quantity
    cart
      .updateQuantityCartItemAttribute(requestBody)
      .then(() => {
        setCartData((prevCartData) => {
          const updatedCartData = [...prevCartData]
          updatedCartData[cartIndex] = {
            ...updatedCartData[cartIndex],
            cartItemAttributeOptions: updatedCartData[cartIndex].cartItemAttributeOptions.map((option, index) =>
              index === attrIndex ? { ...option, quantityOrder: newQuantity } : option,
            ),
          }
          return updatedCartData
        })
      })
      .catch((error) => {
        console.error('Error updating quantity:', error)
      })

    getInfoOrder()
  }

  const handleInputChange = (cartIndex, attrIndex, value) => {
    const newQuantity = value ? parseInt(value) : 1
    setCartData((prevCartData) => {
      const updatedCartData = [...prevCartData]
      updatedCartData[cartIndex] = {
        ...updatedCartData[cartIndex],
        cartItemAttributeOptions: updatedCartData[cartIndex].cartItemAttributeOptions.map((option, index) =>
          index === attrIndex ? { ...option, quantityOrder: newQuantity } : option,
        ),
      }
      return updatedCartData
    })

    getInfoOrder()
  }

  const handleBlur = (cartIndex, attrIndex) => {
    const currentQuantity = cartData[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder || 1
    updateQuantity(cartIndex, attrIndex, currentQuantity)
  }

  const handleIncrease = (cartIndex, attrIndex) => {
    const currentQuantity = cartData[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder || 1
    const newQuantity = currentQuantity + 1
    updateQuantity(cartIndex, attrIndex, newQuantity)
  }

  const handleDecrease = (cartIndex, attrIndex) => {
    const currentQuantity = cartData[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder || 1
    const newQuantity = Math.max(1, currentQuantity - 1)
    updateQuantity(cartIndex, attrIndex, newQuantity)
  }

  // Xóa item attribule
  const deleteCartItemAttribule = (cartIndex, attrIndex) => {
    if (
      cartData[cartIndex] &&
      cartData[cartIndex].cartItemAttributeOptions &&
      cartData[cartIndex].cartItemAttributeOptions[attrIndex]
    ) {
      const itemId = cartData[cartIndex].cartItemAttributeOptions[attrIndex].id

      cart
        .deleteCartItemAttribute(itemId)
        .then(() => {
          // Update the cartData state to remove the entire cart item attribute
          const updatedCartData = [...cartData]
          updatedCartData[cartIndex].cartItemAttributeOptions.splice(attrIndex, 1)

          // Remove entire cart item if it has no attributes left
          if (updatedCartData[cartIndex].cartItemAttributeOptions.length === 0) {
            updatedCartData.splice(cartIndex, 1)
          }

          setCartData(updatedCartData)

          // Update quantities state to reflect the removal
          const updatedQuantities = updatedCartData.flatMap((store) =>
            store.cartItemAttributeOptions.map((option) => option.quantityOrder || 1),
          )
          setQuantities(updatedQuantities)
        })
        .catch((error) => {
          console.error('Error deleting item:', error)
        })
    } else {
      console.error('Invalid cartIndex or attrIndex')
    }
  }

  // Xóa item
  const handleDeleteCartItem = (cartIndex) => {
    sessionStorage.removeItem('coupon')
    sessionStorage.removeItem('orderId')

    const itemId = cartData[cartIndex].id

    const requestBody = {
      cartItemIds: [itemId],
    }

    cart
      .deleteListCartItem(requestBody)
      .then(() => {
        // Update the cartData state to remove the item locally
        const updatedCartData = [...cartData]
        updatedCartData.splice(cartIndex, 1)
        setCartData(updatedCartData)

        // Optionally, update selectedItems if needed
        setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((id) => id !== itemId))
      })
      .catch((error) => {
        console.log('장바구니 항목 삭제 오류')
      })
  }

  // Xóa nhiều item
  // Function to delete multiple selected items
  const handleDeleteSelectedItems = () => {
    if (selectedItems.length === 0) {
      return
    }

    sessionStorage.removeItem('coupon')
    sessionStorage.removeItem('orderId')

    const requestBody = {
      cartItemIds: selectedItems,
    }

    cart
      .deleteListCartItem(requestBody)
      .then(() => {
        // Update the cartData state to remove the selected items
        const updatedCartData = cartData.filter((item) => !selectedItems.includes(item.id))
        setCartData(updatedCartData)

        // Clear the selectedItems state
        setSelectedItems([])
      })
      .catch((error) => {
        console.log('선택한 장바구니 항목 삭제 오류')
      })
  }

  // Bên phải
  const getInfoOrder = async () => {
    try {
      const response = await cart.getInfoOrder({
        cartIds: selectedItems,
        couponIds: selectCoupon,
      })

      setBillOrder(response.data)
    } catch (error) {
      console.log('장바구니 데이터를 가져오는 중 오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    getInfoOrder()
  }, [selectedItems, quantities])

  // Coupon
  const getCouponStatus = async () => {
    try {
      const response = await coupon.getAllCouponStatus()
      if (response && response.data) {
        setDataCoupon(response.data)
        setIsLoading(true)
        setIsDropdownOpenCoupo(!isDropdownOpenCoupo)
      } else {
        console.log('API에서 데이터를 받지 못했습니다.')
      }
    } catch (error) {
      console.log('쿠폰 상태를 가져오는 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectCoupon = (option) => {
    setSelectCoupon([option])
    setIsDropdownOpenCoupo(false)
  }

  const handleSelect = (option) => {
    setSelectCoupon(option)
    setIsDropdownOpen(false)
  }

  const selectedCoupon = dataCoupon.find((coupon) => selectCoupon.includes(coupon.id))

  // Check button submit
  const isButtonActive = selectedItems.length > 0

  // Submit cart
  const handleSubmitCart = () => {
    // Remove existing items from sessionStorage
    sessionStorage.removeItem('coupon')
    sessionStorage.removeItem('orderId')
    sessionStorage.removeItem('infoOrder')

    // Set new items
    sessionStorage.setItem('coupon', JSON.stringify(selectCoupon))
    sessionStorage.setItem('orderId', JSON.stringify(selectedItems))

    // Navigate to the order confirmation page
    navigate('/order-confimation')
  }

  // Tính tổng:
  const subtotal = billOrder?.orderResultModel?.reduce((total, item) => total + item.price, 0)

  const discount = selectedCoupon?.discountValue
    ? selectedCoupon.discountType === 'percentage'
      ? (subtotal * selectedCoupon.discountValue) / 100
      : selectedCoupon.discountValue
    : 0

  const totalPrice = subtotal + billOrder.shippingCost - discount

  return (
    <div>
      {/* Phần body */}
      <div className='flex justify-between lg:flex-row flex-col items-start lg:gap-8 gap-4 mt-4'>
        {isLoading && <Loading />}
        {/* Phần trái */}
        <div className='lg:w-[843px] w-full'>
          {/* Phần đầu */}
          <div className='flex justify-between items-center mt-2 h-9'>
            <div className='flex items-center gap-2'>
              {/* Checkbox cha */}
              <input type='checkbox' className='w-[18px] h-[18px]' checked={selectAll} onChange={handleSelectAll} />
              {t('selectAll')}
            </div>

            {selectedItems && selectedItems.length > 0 ? (
              <div className='flex gap-4'>
                <button className='w-32 h-9 rounded-lg' style={{ border: '1px solid #D3D2D2' }}>
                  {t('selectAll')}
                </button>
                <button
                  className='w-32 h-9 rounded-lg'
                  style={{ border: '1px solid #D3D2D2' }}
                  onClick={handleDeleteSelectedItems}
                >
                  {t('deleteOrder')}
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          {cartData && cartData.length > 0 ? (
            cartData.map((store, cartIndex) => {
              const product = store.product
              // const platformType = product?.platformType
              // Sử dụng logic để xác định URL ảnh
              const arrCheck = ['detail', 'product']
              const mainImage = product?.productImages?.find((image) => image.main)?.imageUrl
              const fallbackImage = product?.productImages?.[0]?.imageUrl
              const imageToCheck = mainImage || fallbackImage || 'URL_OF_DEFAULT_IMAGE'
              const isImageMatched = arrCheck.some((prefix) => imageToCheck?.startsWith(prefix))
              const imageUrl = isImageMatched ? `${c.DOMAIN_IMG}${imageToCheck}` : imageToCheck

              return (
                <div className='mt-6 bg-[#F8F8F8] rounded-lg relative' key={cartIndex}>
                  <div className='pb-2' style={{ borderBottom: '1px solid #D3D2D2' }}>
                    <div className='flex flex-col gap-4 p-4'>
                      <button className='absolute top-3 right-3 z-40' onClick={() => handleDeleteCartItem(cartIndex)}>
                        <img src={IconClose} alt='icon' />
                      </button>
                      <div className='flex rounded-lg gap-5 relative'>
                        <div className='flex gap-4'>
                          {/* Checkbox con */}
                          <input
                            type='checkbox'
                            className='w-[18px]'
                            checked={selectedItems.includes(store.id)}
                            onChange={() => handleItemCheckboxChange(store.id)}
                          />
                          <img src={imageUrl} alt='photo' className='w-[184px] h-[132px] object-cover rounded-lg' />
                        </div>
                        <div>
                          <div className='flex flex-col justify-between gap-2 py-1 lg:w-[531px] w-full h-full'>
                            <div className='flex flex-col gap-4'>
                              <h3 className='font-semibold text-primaryPrdName'>{store.product.productName}</h3>
                              <div className='text-normal font-medium flex items-center gap-2'>
                                {Array.isArray(store.product.promotions) &&
                                store.product.promotions.length > 0 &&
                                store.product.promotions.some((e) => e.type === 'sale') ? (
                                  store.product.promotions.map((e) => {
                                    if (e.type === 'sale') {
                                      const discountedPrice = Math.floor(
                                        store.product.price * (1 - e.discountPercent / 100),
                                      )

                                      return (
                                        <div key={e.id}>
                                          {/* New */}
                                          <div className='flex flex-col'>
                                            <div className='flex items-center gap-1'>
                                              <span className='font-bold text-primaryPrdName text-[#3B3B3B]'>
                                                {formatPrice(discountedPrice)}
                                              </span>
                                              <span className='font-bold text-small text-[#8C8C8C]'>
                                                {unit !== 'KRW'
                                                  ? '/' +
                                                    ' ' +
                                                    formatPriceMultilingual(discountedPrice * store?.exchangeRate, unit)
                                                  : null}
                                              </span>
                                              <span className='w-[48px] h-[22px] bg-[#2DC033] text-white text-small rounded-full flex justify-center items-center ml-1'>
                                                -{e.discountPercent}%
                                              </span>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                              <div className='line-through'>
                                                <span className='text-[#3B3B3B] font-medium text-small '>
                                                  {formatPrice(store.product.price)}
                                                </span>
                                                <span className='font-medium text-small text-[#8C8C8C] '>
                                                  {unit !== 'KRW'
                                                    ? '/' +
                                                      ' ' +
                                                      formatPriceMultilingual(
                                                        store.product.price * store.exchangeRate,
                                                        unit,
                                                      )
                                                    : null}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    }
                                    return null
                                  })
                                ) : (
                                  <div className='flex items-center gap-1'>
                                    <div className='font-semibold text-primaryPrdName text-[#3B3B3B]'>
                                      {formatPrice(store.product.price)}
                                    </div>
                                    <div className='font-semibold text-normal text-[#707070]'>
                                      {unit !== 'KRW'
                                        ? '/' +
                                          ' ' +
                                          formatPriceMultilingual(store.product.price * store.exchangeRate, unit)
                                        : null}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className='font-medium text-min text-[#F14646]'>270점 적립</div>
                          </div>
                          {/* {store.cartItemAttributeOptions && store.cartItemAttributeOptions.length > 0 && (
                            <div className='absolute bottom-0 right-0 flex justify-end items-center w-full'>
                              <button
                                className='p-2 h-8 bg-[#EFEFEF] flex justify-center items-center rounded-sm'
                                onClick={() => setOpenDropdownIndex(openDropdownIndex === cartIndex ? null : cartIndex)}
                              >
                                <div>세부정보 보기</div>
                                <img src={IconArrowDownFill} alt='icon arrow' />
                              </button>
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* {openDropdownIndex === cartIndex && ( */}
                  <div>
                    {store.cartItemAttributeOptions
                      .filter((productAttribute) => productAttribute.quantityOrder > 0)
                      .map((productAttribute, attrIndex) => {
                        const currentQuantity = productAttribute.quantityOrder
                        return (
                          <div key={attrIndex} className='mt-2 px-2 relative'>
                            <div className='pb-4 flex p-4 gap-5' style={{ borderBottom: '1px solid #EFEFEF' }}>
                              <button
                                className='absolute top-2 right-2'
                                onClick={() => deleteCartItemAttribule(cartIndex, attrIndex)}
                              >
                                <img src={IconClose} alt='icon' />
                              </button>
                              <div className='w-full'>
                                <div
                                  className='w-72 font-medium text-normal flex relative'
                                  onClick={() => setOpenModalIndex(attrIndex)}
                                >
                                  <div className='truncate'>
                                    인쇄 방법:
                                    {productAttribute.productSku.attributes.map((attributes, attrIndex) => (
                                      <span key={attrIndex}>
                                        {attributes.type + ': ' + attributes.attributeName + ',' + ' '}
                                      </span>
                                    ))}
                                  </div>
                                  <img src={IconArrowDownFill} alt='icon arrow' />
                                  {/* {openModalIndex === attrIndex && (
                                <ModalProduct
                                  cartData={cartData}
                                  productAttribute={productAttribute}
                                  setOpenModalIndex={setOpenModalIndex}
                                />
                              )} */}
                                </div>
                                <div className='flex justify-between items-center w-full mt-2'>
                                  {/* Hiển thị và quy đổi tiền */}
                                  <div className='flex flex-col gap-[2px]'>
                                    <div className='font-bold text-normal text-[#3B3B3B]'>
                                      {formatPrice(productAttribute.productSku.price)}/ 조각
                                    </div>
                                    <div className='font-bold text-small text-[#8C8C8C]'>
                                      {unit !== 'KRW' ? (
                                        <>
                                          {formatPriceMultilingual(
                                            productAttribute.productSku.price * cartData[0]?.exchangeRate,
                                            unit,
                                          )}
                                          / 조각
                                        </>
                                      ) : null}
                                    </div>
                                  </div>

                                  {/* Button tăng giảm */}
                                  <div className='flex items-center gap-8'>
                                    <div className='flex justify-between items-center w-[132px] h-8 border p-1 rounded-lg'>
                                      <button
                                        className='w-6 h-6 flex justify-center items-center'
                                        onClick={() => handleDecrease(cartIndex, attrIndex)}
                                      >
                                        <ReduceIcon strokeColor={currentQuantity > 0 ? '#3B3B3B' : '#D3D2D2'} />
                                      </button>
                                      <input
                                        inputMode='numeric'
                                        className='font-semibold text-xl w-16 text-center'
                                        value={productAttribute.quantityOrder || 0}
                                        onChange={(e) => handleInputChange(cartIndex, attrIndex, e.target.value)}
                                        onBlur={() => handleBlur(cartIndex, attrIndex)}
                                      />
                                      <button
                                        className='w-6 h-6 bg-[#EFEFEF] flex justify-center items-center'
                                        onClick={() => handleIncrease(cartIndex, attrIndex)}
                                      >
                                        <IncreaseIcon
                                          strokeColor={
                                            productAttribute.quantityOrder >= productAttribute.productSku.quantity
                                              ? '#D3D2D2'
                                              : '#3B3B3B'
                                          }
                                        />
                                      </button>
                                    </div>
                                    <div className='flex items-center min-w-20 gap-1'>
                                      <div className='font-bold text-primaryPrdName'>
                                        {formatPrice(
                                          productAttribute.productSku.price * productAttribute.quantityOrder,
                                        )}
                                      </div>
                                      <div className='font-bold text-primaryPrdName'>
                                        {unit !== 'KRW'
                                          ? '/' +
                                            ' ' +
                                            formatPriceMultilingual(
                                              productAttribute.productSku.price *
                                                productAttribute.quantityOrder *
                                                cartData[0].exchangeRate,
                                              unit,
                                            )
                                          : null}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                  {/* )} */}
                </div>
              )
            })
          ) : (
            <div className='flex justify-center items-center h-96 text-bigPrdName font-bold'>{t('checkShopping')}</div>
          )}

          {/* {cartData && cartData.length > 0 && (
            <div>
              <div className='my-10'>
                <CustomPagination totalItems={totalProduct} align='center' />
              </div>
            </div>
          )} */}

          <div className='flex justify-center items-center mt-4'>
            <button
              type='submit'
              className={`bg-[#D1B584] h-11 w-full text-white flex justify-center items-center rounded-lg font-semibold text-normal ${
                isButtonActive ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isButtonActive}
              onClick={handleSubmitCart}
            >
              {t('btnPay')} <img src={IconChevronRight} alt='icon' />
            </button>
          </div>
        </div>

        {/* Phần phải */}
        <div className='lg:w-[405px] w-full rounded-lg sticky top-10 overflow-y-auto max-h-[calc(100vh-32px)]'>
          {billOrder.orderResultModel && billOrder.orderResultModel.length > 0 ? (
            <div className='lg:w-[405px] w-full rounded-lg lg:mt-16 mt-4'>
              <div className='bg-[#F8F8F8] px-4'>
                <div>
                  <div style={{ borderBottom: '1px solid #D3D2D2' }} className='pt-4'>
                    <h3 className='font-semibold text-primaryPrdName'>{t('productBill')}</h3>
                  </div>

                  <div className='mt-4 flex flex-col gap-2'>
                    {billOrder.orderResultModel && billOrder.orderResultModel.length > 0 ? (
                      <>
                        <div>
                          {billOrder?.orderResultModel?.map((bill, index) => (
                            <div className='flex justify-between items-center font-medium text-normal' key={index}>
                              <Tooltip title={`${bill.title} (${bill.quantity})`}>
                                <div>
                                  {bill.title.length > 10 ? `${bill.title.substring(0, 10)}...` : bill.title} (
                                  {bill.quantity})
                                </div>
                              </Tooltip>
                              <div>
                                {formatPrice(bill.price)}
                                <span className='font-semibold text-small text-[#707070]'>
                                  {unit !== 'KRW'
                                    ? '/' + ' ' + formatPriceMultilingual(bill.price * exchangePriceCom, unit)
                                    : null}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div>{t('CheckBill')}</div>
                    )}
                  </div>
                </div>

                <div className='mt-4'>
                  {/* Coupon */}
                  {/* <div style={{ borderBottom: '1px solid #D3D2D2' }}>
                  <div className='flex justify-between items-center'>
                    <h3 className='font-semibold text-primaryPrdName'>{t('coupon')}</h3>
                    <div>
                      <div className='relative'>
                        <button
                          onClick={getCouponStatus}
                          className='flex items-center justify-between h-8 w-[60px] rounded-lg px-2'
                        >
                          <img src={IconTicketSale} alt='icon' />
                          <img src={IconArrowDownFill} alt='icon arrow' />
                        </button>
                        {isDropdownOpenCoupo && (
                          <div
                            className='absolute right-0 z-40 mt-1 p-4 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col justify-center items-center '
                            style={{ maxHeight: '812px', overflowY: 'auto' }}
                          >
                            <button
                              className='absolute top-3 right-3 z-40'
                              onClick={() => setIsDropdownOpenCoupo(false)}
                            >
                              <img src={IconClose} alt='icon' />
                            </button>

                            {selectedItems && selectedItems.length > 0 ? (
                              <>
                                {dataCoupon && dataCoupon.length > 0 ? (
                                  dataCoupon.map((coupon, index) => (
                                    <div key={index}>
                                      <div
                                        className='relative w-[312px] cursor-pointer'
                                        onClick={() => handleSelectCoupon(coupon.id)}
                                      >
                                        <img
                                          src={coupon.discountType === 'percentage' ? CouponPercent : CouponPrice}
                                          alt='icon'
                                        />
                                        <div
                                          className={`${
                                            coupon.discountType === 'percentage'
                                              ? 'absolute top-4 left-6'
                                              : 'absolute top-4 left-4'
                                          } w-[189px] text-center`}
                                        >
                                          <div className='flex flex-col items-center text-[#3B3B3B]'>
                                            <div
                                              className={`${
                                                coupon.discountType === 'percentage'
                                                  ? 'text-[#B5955E]'
                                                  : 'text-[#3B3B3B]'
                                              } font-bold text-textPrd`}
                                            >
                                              {coupon.discountType === 'fixed' ? '할인쿠폰 구매' : '무료 배송'}
                                            </div>
                                            <div
                                              className={`${
                                                coupon.discountType === 'percentage'
                                                  ? 'text-[#3B3B3B]'
                                                  : 'text-[#D1B584]'
                                              } font-bold text-bigPrdName`}
                                            >
                                              {coupon.discountType === 'percentage'
                                                ? `-${coupon.discountValue}%`
                                                : `-${coupon.discountValue} KRW`}
                                            </div>
                                            <div className='text-[10px] font-medium'>
                                              {t('minimumOrderAmount')}: {coupon.minOrderValue} {t('one')}
                                            </div>
                                            <div className='text-[10px] font-medium'>
                                              {t('expirationPeriod')}: {new Date(coupon.startDate).toLocaleDateString()}{' '}
                                              -{new Date(coupon.endDate).toLocaleDateString()}
                                            </div>
                                          </div>
                                        </div>

                                        <div
                                          className={`${
                                            coupon.discountType === 'percentage'
                                              ? 'transform rotate-90 text-[#B5955E] top-12 right-6 absolute font-bold'
                                              : 'text-[#3B3B3B] absolute top-14 right-8 font-medium'
                                          }  text-center text-small`}
                                        >
                                          <div>{coupon.code.slice(0, 3)}</div>
                                          <div>{coupon.code.slice(3)}</div>
                                        </div>

                                        <div className='absolute top-5 right-0'>
                                          {coupon.timeUsed > 0 && (
                                            <div className='relative flex justify-center items-center'>
                                              <img src={CouponNumber} alt='icon' />
                                              <p className='absolute top-1/2 right-1/2 transform translate-x-5 -translate-y-3 font-bold text-min text-white'>
                                                X{coupon.timeUsed}
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div>{t('noCoupon')}</div>
                                )}
                              </>
                            ) : (
                              <div className='w-96 flex justify-center items-center font-bold text-textPrd'>
                                {t('selectCoupon')}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div> */}

                  {/* 요금 */}
                  <div className='mt-4 flex flex-col gap-2 font-medium text-normal'>
                    <div className='flex justify-between items-center'>
                      <div>{t('shippingFee')}</div>
                      <div>
                        {formatPrice(billOrder.shippingCost)}
                        <span className='text-small'>
                          {unit !== 'KRW'
                            ? '/' +
                              ' ' +
                              formatPriceMultilingual(billOrder.shippingCost * cartData[0].exchangeRate, unit)
                            : null}
                        </span>
                      </div>
                    </div>

                    {selectCoupon && selectCoupon.length > 0 && (
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center rounded-lg gap-2'>
                          <div>{t('useCoupon')} </div>
                          <div className='flex items-center justify-center bg-[#D3D2D2] w-[84px] h-[22px] rounded'>
                            <img src={IconTicketSale} alt='icon' className='w-7 h-7' />
                            <div className='text-min'>
                              {selectedCoupon.discountType === 'percentage' ? selectedCoupon.discountValue + '%' : 0}
                              {t('discount')}
                            </div>
                          </div>
                        </div>
                        <div>
                          {selectedCoupon.discountType === 'percentage' ? selectedCoupon.discountValue + '%' : 0}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='bg-[#3B3B3B] mt-2 flex justify-between items-center p-4 h-[116px] rounded-b-lg'>
                <div className='text-white font-bold text-textPrd w-1/2'>
                  {t('totalBill')} ({billOrder.orderResultModel.length} {t('productBill')})
                </div>
                <div className='flex flex-col items-end text-white w-1/2'>
                  <div className='font-bold text-largerPrdName'>{formatPrice(totalPrice)}</div>
                  <div className='font-bold text-primaryPrdName'>
                    {/* {unit !== 'KRW' ? {formatPriceMultilingual(totalPrice * cartData[0].exchangeRate, unit)} : null} */}
                  </div>

                  <div className='font-bold text-normal'>
                    {unit !== 'KRW' ? formatPriceMultilingual(totalPrice * cartData[0].exchangeRate, unit) : null}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </div>
  )
}
