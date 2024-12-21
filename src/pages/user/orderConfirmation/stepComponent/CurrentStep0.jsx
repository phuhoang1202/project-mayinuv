import React, { useState, useEffect } from 'react'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import IconAdd from '@assets/images/IconAdd.svg'
import IconClose from '@assets/images/IconClose.svg'
import ReduceIcon from '@assets/icons/ReduceIcon.jsx'
import IncreaseIcon from '@assets/icons/IncreaseIcon.jsx'
import { cart } from '@services/user/cart'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import { Button, Form, Modal, Input } from 'antd'
import { constants as c } from '@constants'
import ModalProduct from '@components/cartProduct/modalProduct/ModalProduct'
import { useGeolocated } from 'react-geolocated'
import axios from 'axios'
import { Toast } from '@utils/toast'
import { useTranslation } from 'react-i18next'
import { formatPrice, formatPriceMultilingual } from '@utils/index'
import IconDelete from '@assets/images/IconDelete.svg'
import ScrollToTop from '@components/scrollToTop/ScrollToTop'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function CurrentStep0({
  cartDataParent,
  setCurrentStep,
  unit,
  setShippingAddressId,
  setDescription,
  setDescriptionOrder,
  exchangeRateParent,
  setShippingAddressShip,
}) {
  const { t } = useTranslation()
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null)
  const [openModalIndex, setOpenModalIndex] = useState(null)
  const [cartData, setCartData] = useState([])
  const [quantities, setQuantities] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [isDeliveryRequestSelected, setIsDeliveryRequestSelected] = useState(false)

  // Tiền tệ
  // const [unit, setUnit] = useState('KRW')
  // const [language, setLanguage] = useState('ko')

  // Address
  const [countryCode, setCountryCode] = useState('kr')
  const [locality, setLocality] = useState('Korea')
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  // Shipping address
  const [openFormAddress, setOpenFormAddress] = useState(false)
  const [shippngAddress, setShippingAddress] = useState([])
  const [stepForm, setStepForm] = useState(1)
  const [addNewAddress, setAddNewAddress] = useState({
    id: null,
    recipientName: '',
    recipientPhone: '',
    address: '',
  })
  // Lấy địa chỉ
  const [addressSuggestions, setAddressSuggestions] = useState([])
  const [isAddressSelected, setIsAddressSelected] = useState(false)
  const [newAddress, setNewAddress] = useState('')
  const [phone, setPhone] = useState('')

  // radio
  const [selectedOption, setSelectedOption] = useState('')
  const [textareaText, setTextareaText] = useState('')

  const { recipientName, recipientPhone, address } = addNewAddress
  const uniqueOrderId = JSON.parse(sessionStorage.getItem('orderId'))
  const getOrderId = [...new Set(uniqueOrderId)]
  const [isUpdate, setIsUpdate] = useState(false)
  const [coords, setCoords] = useState({})
  const [getAddress, setGetAddress] = useState([])

  const showLoadingDelete = (cartIndex) => {
    setItemToDelete(cartIndex)
    setOpenModalDelete(true)
  }

  // const { coords } = useGeolocated({
  //   positionOptions: {
  //     enableHighAccuracy: false,
  //   },
  //   userDecisionTimeout: 5000,
  // })

  useEffect(() => {
    setOpenModalIndex(openModalIndex)
  }, [openModalIndex])

  useEffect(() => {
    // if (coords) {
    //   const { latitude, longitude } = coords
    //   setCoordsData(coords)

    axios
      .get(`https://ipinfo.io/json?token=1faa919ba3e08a`)
      .then((response) => {
        const res = response.data

        // const countryCode = response.data.countryCode.toLowerCase()
        setCountryCode(res.country) // vn
        setLocality(res.region) // hn
        setGetAddress(res)
      })
      .catch((error) => {
        Toast.error('국가 코드를 가져오는 중 오류가 발생했습니다.')
      })
    // }
  }, [])

  const fetchShippingAddress = async () => {
    try {
      const response = await cart.getShippingAddress()
      const result = response.data.map((el) => {
        el.checked = el.main ? el.main : false
        return el
      })
      setShippingAddress(result)
      // const boolean = !result || (Array.isArray(result) && result.length == 0)
      // setStepForm(0)
    } catch (err) {
      console.log('주소 데이터 검색에 실패했습니다.')
    }
  }

  useEffect(() => {
    fetchShippingAddress()
  }, [])

  const infoOrder = JSON.parse(sessionStorage.getItem('infoOrder')) || []

  useEffect(() => {
    if (infoOrder && infoOrder.length > 0) {
      setCartData(infoOrder)
      setSelectedItems(infoOrder.map((item) => item.id))
    }

    if (cartDataParent && cartDataParent.length > 0) {
      setCartData(cartDataParent)
      setSelectedItems(cartDataParent.map((item) => item.id))
    }
  }, [cartDataParent])

  // Hàm xử lý checkbox
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
  }

  const handleInputChange = (cartIndex, attrIndex, value) => {
    if (infoOrder && infoOrder.length > 0) {
      const newQuantity = value ? parseInt(value) : 1
      setCartData((prevCartData) => {
        const updatedCartData = [...prevCartData]
        updatedCartData[cartIndex] = {
          ...updatedCartData[cartIndex],
          cartItemAttributeOptions: updatedCartData[cartIndex].cartItemAttributeOptions.map((option, index) =>
            index === attrIndex ? { ...option, quantityOrder: newQuantity } : option,
          ),
        }

        // Cập nhật lại sessionStorage
        sessionStorage.setItem('infoOrder', JSON.stringify(updatedCartData))

        return updatedCartData
      })
    } else {
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
    }
  }

  const handleBlur = (cartIndex, attrIndex) => {
    if (infoOrder && infoOrder.length > 0) {
      const currentQuantity = cartData[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder || 1

      // Cập nhật lại sessionStorage sau khi gọi updateQuantity
      const updatedCartData = [...cartData]
      updatedCartData[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder = currentQuantity
      sessionStorage.setItem('infoOrder', JSON.stringify(updatedCartData))
    } else {
      const currentQuantity = cartData[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder || 1
      updateQuantity(cartIndex, attrIndex, currentQuantity)
    }
  }

  const handleIncrease = (cartIndex, attrIndex) => {
    if (infoOrder && infoOrder.length > 0) {
      const updatedInfoOrder = [...infoOrder]
      const currentQuantity = updatedInfoOrder[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder || 1

      // Giảm số lượng nhưng không nhỏ hơn 1
      const newQuantity = Math.max(1, currentQuantity + 1)
      updatedInfoOrder[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder = newQuantity

      // Cập nhật lại sessionStorage
      sessionStorage.setItem('infoOrder', JSON.stringify(updatedInfoOrder))
      setCartData(updatedInfoOrder)
    } else {
      const currentQuantity = cartData[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder || 1
      const newQuantity = currentQuantity + 1
      updateQuantity(cartIndex, attrIndex, newQuantity)
    }
  }

  const handleDecrease = (cartIndex, attrIndex) => {
    if (infoOrder && infoOrder.length > 0) {
      const updatedInfoOrder = [...infoOrder]
      const currentQuantity = updatedInfoOrder[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder || 1

      // Giảm số lượng nhưng không nhỏ hơn 1
      const newQuantity = Math.max(1, currentQuantity - 1)
      updatedInfoOrder[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder = newQuantity

      // Cập nhật lại sessionStorage
      sessionStorage.setItem('infoOrder', JSON.stringify(updatedInfoOrder))
      setCartData(updatedInfoOrder)
    } else {
      const currentQuantity = cartData[cartIndex].cartItemAttributeOptions[attrIndex].quantityOrder || 1
      const newQuantity = Math.max(1, currentQuantity - 1)
      updateQuantity(cartIndex, attrIndex, newQuantity)
    }
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
    sessionStorage.removeItem('orderId')
    sessionStorage.removeItem('coupon')
    sessionStorage.removeItem('infoOrder')
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
        setOpenModalDelete(false)
        setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((id) => id !== itemId))
        Toast.success('장바구니에서 항목이 성공적으로 제거되었습니다.')
      })
      .catch((error) => {
        Toast.error('장바구니 항목 삭제 오류')
      })
  }

  const handleDeliveryRequestChange = (e) => {
    setSelectedOption(e.target.value)
    setIsDeliveryRequestSelected(true)
  }

  // const handleSelectAddress = (suggestion) => {
  //   const addressConCat = `${suggestion.title}  ${suggestion.address}`
  //   setAddNewAddress({ ...addNewAddress, address: addressConCat })
  //   setAddressSuggestions([])
  //   setCoords({ lat: suggestion.latitude, lng: suggestion.longitude })
  //   setIsAddressSelected(true)
  // }

  // useEffect(() => {
  //   const getAddressLocal = async () => {
  //     if (address.trim() && !isAddressSelected) {
  //       try {
  //         const bodyPayload = {
  //           gl: countryCode,
  //           location: locality,
  //           q: address,
  //         }

  //         const response = await cart.getAddress(bodyPayload)
  //         setAddressSuggestions(response.data.body.places)
  //       } catch (error) {
  //         console.error('Error fetching address suggestions:', error)
  //       }
  //     } else if (!address.trim()) {
  //       setAddressSuggestions([])
  //     }
  //   }

  //   const timer = setTimeout(() => {
  //     getAddressLocal()
  //   }, 1000)

  //   return () => clearTimeout(timer)
  // }, [address, countryCode, locality, isAddressSelected])

  // Check button submit

  const isButtonActive = isDeliveryRequestSelected

  // Shipping Address
  const handleChangeAddress = (e) => {
    const { name, value } = e.target
    setAddNewAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onFinish = (values) => {
    // Gọi handleAddShippingAddress với dữ liệu đã xác thực
    handleAddShippingAddress(values)
    setStepForm(1) // Chuyển đến bước tiếp theo
  }

  const handleAddShippingAddress = async () => {
    const bodyPayload = {
      id: addNewAddress.id,
      address: addNewAddress.address,
      lat: 0,
      lng: 0,
      recipientName: addNewAddress.recipientName,
      recipientPhone: addNewAddress.recipientPhone,
      userId: addNewAddress.userId,
      country: getAddress.country,
      city: getAddress.region,
      postal: getAddress.postal,
      countryCode: getAddress.country,
    }
    try {
      if (!isUpdate) await cart.createShippingAddress(bodyPayload)
      else await cart.updateShippingAddress(bodyPayload)
      setAddNewAddress({ recipientName: '', recipientPhone: '', address: '' })
      setStepForm(1)
      setAddNewAddress('')
      await fetchShippingAddress()
      Toast.success('새 주소가 추가되었습니다.')
    } catch (error) {
      Toast.error('주소 추가 실패')
    }
  }

  const handleDeleteAddress = async (id) => {
    try {
      await cart.deleteShippingAddress(id)
      setShippingAddress((prevAddresses) => prevAddresses.filter((address) => address.id !== id))

      Toast.success('배송 주소를 삭제했습니다.')
    } catch (error) {
      Toast.error('배송 주소를 삭제하지 못했습니다.')
    }
  }

  //function shiping address
  const [actionShipping, setActionShipping] = useState([
    { label: `${t('deleteAddress')}`, index: 0, color: '#F14646' },
    { label: `${t('updateAddress')}`, index: 1, color: '#36BDF7' },
    { label: `${t('mainAddress')}`, index: 2, color: '#3B3B3B' },
  ])

  function selectedShippingAddress(event) {
    shippngAddress.forEach((el) => (el.checked = false))
    shippngAddress[event].checked = true
    shippngAddress[event].countryCode = countryCode
    // event.countryCode = countryCode

    setShippingAddress([...shippngAddress])

    setOpenFormAddress(false)
  }

  function updateShippingAddressData(payload, index) {
    cart.updateShippingAddress(payload).then(() => {
      if (index == 1) setOpenFormAddress(false)
      fetchShippingAddress()
    })
  }

  function handleShippingAdress(event, index) {
    switch (index) {
      case 0:
        handleDeleteAddress(event.id)
        break
      case 1:
        // edit data shipping address
        setIsUpdate(true)
        setOpenFormAddress(true)
        setStepForm(0)
        setAddNewAddress(event)
        break
      case 2:
        // set main
        event.main = true
        updateShippingAddressData(event, index)
        break
    }
  }

  const handleSubmitStep0 = () => {
    // const hasMainAddress = shippngAddress.some((address) => address.main === true)

    if (shippngAddress && shippngAddress.length > 0) {
      // if (!hasMainAddress) {
      //   Toast.error('You need to select a main shipping address to continue.')
      //   return
      // }
      setShippingAddressShip([...shippngAddress])
      sessionStorage.setItem('orderId', JSON.stringify(selectedItems))
      setDescription(selectedOption)
      setDescriptionOrder(textareaText)
      setCurrentStep((prevStep) => prevStep + 1)
    } else {
      Toast.error('You need to add a shipping address to continue.')
    }
  }

  return (
    <div className='lg:w-[843px]'>
      <ScrollToTop />
      {cartData && cartData.length > 0 ? (
        cartData.map((store, cartIndex) => {
          const product = store.product
          const platformType = product?.platformType
          // Sử dụng logic để xác định URL ảnh
          const arrCheck = ['detail', 'product']
          const mainImage = product?.productImages?.find((image) => image.main)?.imageUrl
          const fallbackImage = product?.productImages?.[0]?.imageUrl
          const imageToCheck = mainImage || fallbackImage || 'URL_OF_DEFAULT_IMAGE'
          const isImageMatched = arrCheck.some((prefix) => imageToCheck?.startsWith(prefix))
          const imageUrl = isImageMatched ? `${c.DOMAIN_IMG}${imageToCheck}` : imageToCheck

          return (
            <div className='bg-[#F8F8F8] rounded-lg relative mt-2' key={cartIndex}>
              <div className='pb-2' style={{ borderBottom: '1px solid #D3D2D2' }}>
                <div className='flex flex-col gap-4 p-4'>
                  <button className='absolute top-3 right-3 z-40' onClick={() => showLoadingDelete(cartIndex)}>
                    <img src={IconClose} alt='icon' />
                  </button>
                  <div className='flex rounded-lg lg:gap-5 gap-3 relative lg:mt-0 mt-3'>
                    <div className='flex gap-4'>
                      {/* Checkbox con */}
                      {infoOrder && infoOrder.length > 0 ? (
                        ''
                      ) : (
                        <input
                          type='checkbox'
                          className='w-[18px]'
                          checked={selectedItems.includes(store.id)}
                          onChange={() => handleItemCheckboxChange(store.id)}
                        />
                      )}

                      <div className='lg:w-[184px] lg:h-[132px] w-[154px] h-[102px]'>
                        <img src={imageUrl} alt='photo' className='w-full h-full object-cover rounded-lg' />
                      </div>
                    </div>
                    <div>
                      <div className='flex flex-col justify-between gap-2 py-1 lg:w-[531px] w-full h-full'>
                        <h3 className='font-semibold lg:text-primaryPrdName text-normal'>
                          {store.product.productName}
                        </h3>
                        <div className='text-normal font-medium flex items-center gap-2'>
                          {Array.isArray(store.product.promotions) &&
                          store.product.promotions.length > 0 &&
                          store.product.promotions.some((e) => e.type === 'sale') ? (
                            store.product.promotions.map((e) => {
                              if (e.type === 'sale') {
                                const discountedPrice = Math.floor(store.product.price * (1 - e.discountPercent / 100))

                                return (
                                  <div key={e.id}>
                                    <div>
                                      <div className='flex items-center gap-2'>
                                        <div>
                                          <span className='font-bold text-primaryPrdName'>
                                            {formatPrice(discountedPrice)}
                                          </span>
                                          <span className='font-bold text-normal text-[#8C8C8C]'>
                                            {unit !== 'KRW' ? (
                                              <>
                                                {'/' +
                                                  ' ' +
                                                  formatPriceMultilingual(
                                                    store.product.price * exchangeRateParent,
                                                    unit,
                                                  )}
                                              </>
                                            ) : null}
                                          </span>
                                        </div>
                                        <div className='w-[48px] h-[22px] bg-[#2DC033] text-white text-small rounded-full flex justify-center items-center'>
                                          -{e.discountPercent}%
                                        </div>
                                      </div>

                                      <div className='flex items-center font-medium line-through '>
                                        <span className='text-[#8C8C8C] text-small '>
                                          {formatPrice(store.product.price)}
                                        </span>

                                        <div className='text-small text-[#8C8C8C] '>
                                          {unit !== 'KRW' ? (
                                            <>
                                              {'/' +
                                                ' ' +
                                                formatPriceMultilingual(store.product.price * exchangeRateParent, unit)}
                                            </>
                                          ) : null}
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
                              <span className='font-bold text-normal'>{formatPrice(store.product.price)}</span>
                              <span className='font-bold text-small text-[#3B3B3B]'>
                                {unit !== 'KRW' ? (
                                  <>
                                    {'/' +
                                      ' ' +
                                      formatPriceMultilingual(store.product.price * exchangeRateParent, unit)}
                                  </>
                                ) : null}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className='font-medium text-min text-[#F14646]'>플러스 270점</div>
                      </div>
                      {store.cartItemAttributeOptions && store.cartItemAttributeOptions.length > 0 && (
                        <div className='absolute bottom-0 right-0 flex justify-end items-center w-full'>
                          <button
                            className='p-2 h-8 bg-[#EFEFEF] flex justify-center items-center rounded-sm'
                            onClick={() => setOpenDropdownIndex(openDropdownIndex === cartIndex ? null : cartIndex)}
                          >
                            <div className='lg:text-normal text-small lg:block hidden'>{t('viewDetails')}</div>
                            <img src={IconArrowDownFill} alt='icon arrow' />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {openDropdownIndex === cartIndex && (
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
                                  {t('viewDetails')}:
                                  {productAttribute.productSku.attributes.map((attributes, attrIndex) => (
                                    <span key={attrIndex}>
                                      {attributes.type + ': ' + attributes.attributeName + ',' + ' '}
                                    </span>
                                  ))}
                                </div>
                                <img src={IconArrowDownFill} alt='icon arrow' />
                                {openModalIndex === attrIndex && (
                                  <ModalProduct
                                    cartData={cartData}
                                    productAttribute={productAttribute}
                                    setOpenModalIndex={setOpenModalIndex}
                                  />
                                )}
                              </div>

                              <div className='flex justify-between items-center w-full mt-2'>
                                {/* Hiển thị và quy đổi tiền */}
                                <div className='flex items-center gap-[2px]'>
                                  <span className='font-bold text-normal text-[#3B3B3B]'>
                                    {formatPrice(productAttribute.productSku.price)}
                                  </span>
                                  <span className='font-bold text-small text-[#8C8C8C]'>
                                    {unit !== 'KRW' ? (
                                      <>
                                        {'/' +
                                          ' ' +
                                          formatPriceMultilingual(
                                            productAttribute.productSku.price * exchangeRateParent,
                                            unit,
                                          )}
                                      </>
                                    ) : null}
                                  </span>
                                </div>

                                <div className='flex items-center gap-8 '>
                                  {/* Button tăng giảm */}
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

                                  <div className='flex items-center min-w-20'>
                                    <div className='font-bold text-normal'>
                                      {formatPrice(productAttribute.productSku.price * productAttribute.quantityOrder)}
                                    </div>
                                    <div className='font-bold text-small'>
                                      {unit !== 'KRW'
                                        ? '/' +
                                          ' ' +
                                          formatPriceMultilingual(
                                            productAttribute.productSku.price *
                                              productAttribute.quantityOrder *
                                              exchangeRateParent,
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
              )}
            </div>
          )
        })
      ) : (
        <div className='flex justify-center items-center h-72 lg:text-bigPrdName text-largerPrdName font-bold'>
          {t('checkShopping')}
        </div>
      )}

      <div className='mt-6'>
        <div className='font-bold lg:text-primaryPrdName'>{t('shippingInformation')}</div>

        <div className='flex justify-between items-start gap-4 bg-[#F8F8F8] px-4 py-5 rounded-lg mt-2'>
          {shippngAddress && shippngAddress.length > 0 && (
            <div>
              {shippngAddress
                .filter((e) => e.checked)
                .map((e, i) => (
                  <div className='flex gap-2 items-start'>
                    <div>
                      <input type='radio' checked={e.checked} />
                    </div>
                    <div key={i} className='flex flex-col'>
                      <div className='flex items-center gap-2 lg:w-80 w-52'>
                        <div className='text-[#3B3B3B] font-semibold text-normal'>{e.recipientName}</div>
                        <div className='h-[21px]' style={{ border: '1px solid #D3D2D2' }}></div>
                        <div className='text-[#8C8C8C] font-medium text-normal'>{e.recipientPhone}</div>
                      </div>

                      <div className='text-[#8C8C8C] font-medium text-normal'>{e.address}</div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className='relative flex justify-end w-full'>
            <button
              className='bg-[#E9D2A9] min-w-[82px] pl-2 h-8 rounded flex justify-center items-center'
              onClick={() => setOpenFormAddress(!openFormAddress)}
            >
              {t('change')}
              <img src={IconArrowDownFill} alt='icon arrow' />
            </button>

            {openFormAddress && (
              <div className='absolute right-0 top-10 z-20'>
                <div
                  className='w-[559px] rounded-lg p-5 bg-white'
                  style={{ border: '1px solid #D3D2D2', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
                >
                  <div style={{ borderBottom: '1px solid #EFEFEF', paddingBottom: '2px' }}>
                    <h3 className='font-bold text-textPrd'>{t('selectAdress')}</h3>
                  </div>

                  {/* Nhập địa chỉ */}
                  {stepForm === 0 && (
                    <div className='mt-4'>
                      <Form
                        onFinish={onFinish}
                        layout='vertical'
                        initialValues={{
                          recipientName,
                          recipientPhone,
                          address,
                        }}
                      >
                        <div className='flex flex-col gap-1 justify-start'>
                          {/* Recipient Name */}
                          <Form.Item name='recipientName' rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
                            <div className='flex flex-col gap-1'>
                              <label className='text-[#3B3B3B] font-medium text-normal'>{t('nameAdress')}</label>
                              <Input
                                placeholder='받는 사람 이름'
                                className='border px-2 rounded-lg h-11'
                                value={recipientName}
                                name='recipientName'
                                onChange={handleChangeAddress}
                              />
                            </div>
                          </Form.Item>

                          {/* Recipient Phone */}
                          <Form.Item
                            name='recipientPhone'
                            rules={[
                              { required: true, message: '전화번호를 입력해주세요.' },
                              { pattern: /^[0-9]+$/, message: '전화번호는 숫자만 포함해야 합니다.' },
                            ]}
                          >
                            <div className='flex flex-col gap-1'>
                              <label className='text-[#3B3B3B] font-medium text-normal'>{t('phonenumber')}</label>
                              <Input
                                type='number'
                                placeholder='핸드폰'
                                className='border px-2 rounded-lg h-11'
                                value={recipientPhone}
                                name='recipientPhone'
                                onChange={handleChangeAddress}
                              />
                            </div>
                          </Form.Item>

                          {/* Address */}
                          <Form.Item name='address' rules={[{ required: true, message: '주소를 입력해주세요.' }]}>
                            <div className='flex flex-col gap-1'>
                              <label className='text-[#3B3B3B] font-medium text-normal'>{t('address')}</label>
                              <Input.TextArea
                                placeholder='주소'
                                className='border px-2 rounded-lg h-11'
                                value={address}
                                name='address'
                                onChange={handleChangeAddress}
                              />
                            </div>
                          </Form.Item>

                          {/* Submit Button */}
                          <div className='flex justify-end mt-4'>
                            <button type='submit' className='bg-[#D1B584] text-white px-4 py-2 rounded'>
                              {isUpdate ? '주소 수정' : '주소 추가'}
                            </button>
                            <button
                              className='ml-2 bg-gray-300 text-black px-4 py-2 rounded'
                              onClick={() => setStepForm(1)}
                            >
                              {t('btnCancel')}
                            </button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  )}
                  {/* List địa chỉ */}
                  {stepForm === 1 && (
                    <div className='flex flex-col gap-5 justify-start'>
                      {shippngAddress && shippngAddress.length > 0 && (
                        <div>
                          {shippngAddress.map((e, i) => (
                            <div key={i}>
                              <div>
                                <div className='flex justify-between items-center'>
                                  <div
                                    className='flex gap-2 items-start mt-4 cursor-pointer'
                                    onClick={() => selectedShippingAddress(i)}
                                  >
                                    <div className='p-1'>
                                      <label htmlFor=''>
                                        <input
                                          onChange={() => selectedShippingAddress(i)}
                                          type='radio'
                                          checked={e.checked}
                                          className='w-4 h-4'
                                        />
                                      </label>
                                    </div>

                                    <div className='flex flex-col justify-between gap-2'>
                                      <div className='flex items-center gap-2'>
                                        <div className='text-[#3B3B3B] font-semibold text-normal'>
                                          {e.recipientName}
                                        </div>
                                        <div className='h-[21px]' style={{ border: '1px solid #D3D2D2' }}></div>
                                        <div className='text-[#8C8C8C] font-medium text-normal'>{e.recipientPhone}</div>
                                      </div>

                                      <div className='text-[#8C8C8C] font-medium text-normal'>{e.address}</div>
                                    </div>
                                  </div>

                                  <div className='flex ml-auto mr-[10px]'>
                                    {actionShipping.map((el) => (
                                      <button
                                        onClick={() => handleShippingAdress(e, el.index)}
                                        className={`m-[2px] ${
                                          e.main && el.index == 2 ? 'bg-[#E9D2A9]' : 'bg-[#EFEFEF]'
                                        } min-w-[50px] px-2 py-1 flex justify-center items-center rounded-md text-[${
                                          el.color
                                        }] font-medium text-min`}
                                      >
                                        {el.label}
                                      </button>
                                    ))}
                                  </div>

                                  {/* <button onClick={() => handleDeleteAddress(e.id)}>
                                    <img src={IconDelete} alt='icon' />
                                  </button> */}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div>
                        <button
                          onClick={() => {
                            setStepForm(0),
                              setAddNewAddress({
                                id: null,
                                recipientName: '',
                                recipientPhone: '',
                                address: '',
                              }),
                              setIsUpdate(false)
                          }}
                          className='ml-auto px-2 mt-6 flex items-center justify-center bg-[#D3D2D2] rounded-lg text-[#3B3B3B] h-9 font-medium text-normal'
                        >
                          {t('addAddress')} <img src={IconAdd} alt='icon' className='pl-1' />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <div className='font-bold lg:text-textPrd text-primaryPrdName'>{t('shippingRequests')}</div>

        <div className='flex flex-col gap-2 mt-2'>
          <div className='flex gap-2 items-center'>
            <input
              type='radio'
              className='w-4 h-4'
              value='배송 전 꼭 메시지 부탁드립니다'
              checked={selectedOption === '배송 전 꼭 메시지 부탁드립니다'}
              onChange={handleDeliveryRequestChange}
            />
            <div className='font-medium lg:text-normal text-small'>{t('textShipping1')}</div>
          </div>

          <div className='flex gap-2 items-center'>
            <input
              type='radio'
              className='w-4 h-4'
              value='문 앞에 두고 문자 주세요.'
              checked={selectedOption === '문 앞에 두고 문자 주세요.'}
              onChange={handleDeliveryRequestChange}
            />
            <div className='font-medium lg:text-normal text-small'>{t('textShipping2')}</div>
          </div>

          <div className='flex gap-2 items-center'>
            <input
              type='radio'
              className='w-4 h-4'
              value='경비실에 맡겨주세요.'
              checked={selectedOption === '경비실에 맡겨주세요.'}
              onChange={handleDeliveryRequestChange}
            />
            <div className='font-medium lg:text-normal text-small'>{t('textShipping3')}</div>
          </div>

          <div className='flex gap-2 items-center'>
            <input
              type='radio'
              className='w-4 h-4'
              value='직접 입력'
              checked={selectedOption === '직접 입력'}
              onChange={handleDeliveryRequestChange}
            />
            <div className='font-medium lg:text-normal text-small'>{t('directInput')}</div>
          </div>

          {selectedOption === '직접 입력' && (
            <div>
              <div className='mt-2'>
                <textarea
                  placeholder={`${t('textareaText')}`}
                  style={{ border: '1px solid #D3D2D2' }}
                  className='w-full p-4 rounded-lg'
                  value={textareaText}
                  onChange={(e) => setTextareaText(e.target.value)}
                  maxLength={50}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-center items-center lg:mt-[88px] mt-8'>
        <button
          type='submit'
          className={`bg-[#D1B584] h-11 w-full text-white flex justify-center items-center rounded-lg font-semibold text-normal ${
            isButtonActive ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={() => handleSubmitStep0()}
          disabled={!isButtonActive}
        >
          다음 <img src={IconChevronRight} alt='icon' />
        </button>
      </div>

      <Modal
        footer={
          <div className='flex items-center justify-center'>
            <div className='flex items-center justify-between gap-6 mb-6 w-[300px]'>
              <button
                onClick={() => handleDeleteCartItem(itemToDelete)}
                className='h-11 flex-1 bg-[#D1B584] text-white font-semibold text-normal rounded-lg'
              >
                {t('btnDelete')}
              </button>
              <button
                onClick={() => setOpenModalDelete(false)}
                className='h-11 flex-1 font-medium text-normal rounded-lg'
                style={{ border: '2px solid #3B3B3B' }}
              >
                {t('btnCancel')}
              </button>
            </div>
          </div>
        }
        width={380}
        centered
        open={openModalDelete}
        onCancel={() => setOpenModalDelete(false)}
      >
        <div className='flex flex-col justify-center items-center text-center'>
          <div className='text-normal font-medium my-4 pt-6'>{t('deleteConfirm')}</div>
        </div>
      </Modal>
    </div>
  )
}
