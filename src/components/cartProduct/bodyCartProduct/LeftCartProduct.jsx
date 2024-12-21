import React, { useState, useEffect } from 'react'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import IconArrowUpFill from '@assets/images/IconArrowUpFill.svg'
import IconClose from '@assets/images/IconClose.svg'
import { Space, Collapse } from 'antd'
import ReduceIcon from '@assets/icons/ReduceIcon.jsx'
import IncreaseIcon from '@assets/icons/IncreaseIcon.jsx'
import ModalProduct from '../modalProduct/ModalProduct'
import { cart } from '@services/user/cart'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import { constants as c } from '@constants'
import CustomPagination from '@components/customPagination/CustomPagination'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function LeftCartProduct({ cartData: initialCartData }) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [openModalIndex, setOpenModalIndex] = useState(null)
  const [cartData, setCartData] = useState([])
  const [quantities, setQuantities] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(false)
  const { t } = useTranslation()

  const data = [
    {
      key: '1',
      label: `${t('collapseText')}`,
      text: 'Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim turpis.',
    },
  ]

  const navigate = useNavigate()

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

  const handleTermsCheckboxChange = () => {
    setIsTermsChecked(!isTermsChecked)
  }

  // Initialize cartData and quantities from initialCartData
  useEffect(() => {
    setCartData(initialCartData)
    if (initialCartData) {
      const initialQuantities = initialCartData.map((item) => {
        return item.cartItemAttributeOptions.map((option) => option.quantityOrder || 1)
      })
      setQuantities(initialQuantities.flat())
    }
  }, [initialCartData])

  const updateQuantity = (cartIndex, attrIndex, newQuantity) => {
    const requestBody = {
      cartItemAttributeOptionId: cartData[cartIndex].cartItemAttributeOptions[attrIndex].id,
      quantityOrder: newQuantity,
    }

    // Call API to update the quantity
    cart
      .updateQuantityCartItemAttribute(requestBody)
      .then(() => {
        setQuantities((prevQuantities) => {
          const newQuantities = [...prevQuantities]
          newQuantities[cartIndex * cartData[cartIndex].cartItemAttributeOptions.length + attrIndex] = newQuantity
          return newQuantities
        })
      })
      .catch((error) => {
        console.error('Error updating quantity:', error)
      })
  }

  const handleInputChange = (cartIndex, attrIndex, value) => {
    const newQuantities = [...quantities]
    newQuantities[cartIndex * cartData[cartIndex].cartItemAttributeOptions.length + attrIndex] = value
      ? parseInt(value)
      : 1
    setQuantities(newQuantities)
  }

  const handleBlur = (cartIndex, attrIndex) => {
    const currentQuantity = quantities[cartIndex * cartData[cartIndex].cartItemAttributeOptions.length + attrIndex] || 1
    updateQuantity(cartIndex, attrIndex, currentQuantity)
  }

  const handleIncrease = (cartIndex, attrIndex) => {
    const newQuantity =
      (quantities[cartIndex * cartData[cartIndex].cartItemAttributeOptions.length + attrIndex] || 1) + 1
    updateQuantity(cartIndex, attrIndex, newQuantity)
  }

  const handleDecrease = (cartIndex, attrIndex) => {
    const newQuantity = Math.max(
      1,
      (quantities[cartIndex * cartData[cartIndex].cartItemAttributeOptions.length + attrIndex] || 1) - 1,
    )
    updateQuantity(cartIndex, attrIndex, newQuantity)
  }

  // Xóa item attribule
  const deleteCartItemAttribule = (cartIndex) => {
    const itemId = cartData[cartIndex].id

    cart
      .deleteCartItemAttribute(itemId)
      .then(() => {
        // Update the cartData state to remove the entire cart item
        const updatedCartData = [...cartData]
        updatedCartData.splice(cartIndex, 1)

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
  }

  // Xóa item
  const handleDeleteCartItem = (cartIndex) => {
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
        console.error('Error deleting cart item:', error)
      })
  }

  // Xóa nhiều item
  // Function to delete multiple selected items
  const handleDeleteSelectedItems = () => {
    if (selectedItems.length === 0) {
      return
    }

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
        console.error('Error deleting selected cart items:', error)
      })
  }

  // Check button submit
  const isButtonActive = selectedItems.length > 0 && isTermsChecked

  // Submit cart
  const handleSubmitCart = () => {
    sessionStorage.setItem('orderId', JSON.stringify(selectedItems))
    navigate('/order-confimation')
  }

  return (
    <div className='lg:w-[843px]'>
      {/* Phần đầu */}
      <div className='flex justify-between items-center mt-2 h-9'>
        <div className='flex items-center gap-2'>
          {/* Checkbox cha */}
          <input type='checkbox' className='w-[18px] h-[18px]' checked={selectAll} onChange={handleSelectAll} />
          전체선택
        </div>

        {selectedItems && selectedItems.length > 0 ? (
          <div className='flex gap-4'>
            <button className='w-32 h-9 rounded-lg' style={{ border: '1px solid #D3D2D2' }}>
              전체선택
            </button>
            <button
              className='w-32 h-9 rounded-lg'
              style={{ border: '1px solid #D3D2D2' }}
              onClick={handleDeleteSelectedItems}
            >
              주문불삭제
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
      {cartData && cartData.length > 0 ? (
        cartData.map((store, cartIndex) => {
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
                      <img
                        src={
                          store.product.productImages && store.product.productImages.length > 0
                            ? `${c.DOMAIN_IMG}${store.product.productImages[0].imageUrl}`
                            : 'URL_OF_DEFAULT_IMAGE'
                        }
                        alt='photo'
                        className='w-[184px] h-[132px] object-cover rounded-lg'
                      />
                    </div>
                    <div>
                      <div className='flex flex-col justify-between gap-2 py-1 lg:w-[531px] w-full h-full'>
                        <h3 className='font-semibold text-primaryPrdName'>{store.product.productName}</h3>
                        {/* {console.log(store.product)} */}
                        {/* <div className='text-normal font-medium flex items-center gap-2'>
                      {store.product.promotions[cartIndex] &&
                      store.product.promotions[cartIndex]?.some((e) => e.type === 'sale') ? (
                        store.product.promotions[cartIndex].map((e) => {
                          if (e.type === 'sale') {
                            const discountedPrice = Math.floor(store.product.price * (1 - e.discountPercent / 100))

                            return (
                              <div key={e.id} className='flex items-center gap-2'>
                                <span>{discountedPrice}</span>
                                <span className='text-[#8C8C8C] text-small line-through'>{store.product.price}</span>
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
                          <span>{store.product.price}</span>
                        </div>
                      )}
                    </div> */}
                        <div className='font-medium text-min text-[#F14646]'>플러스 270점</div>
                      </div>
                      <div className='absolute bottom-0 right-0 flex justify-end items-center w-full'>
                        <button
                          className='p-2 h-8 bg-[#EFEFEF] flex justify-center items-center rounded-sm'
                          onClick={() => setOpenDropdownIndex(openDropdownIndex === cartIndex ? null : cartIndex)}
                        >
                          <div>세부정보 보기</div>
                          <img src={IconArrowDownFill} alt='icon arrow' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {openDropdownIndex === cartIndex && (
                <div>
                  {store.cartItemAttributeOptions.map((productAttribute, attrIndex) => (
                    <div key={attrIndex} className='mt-2 px-2 relative'>
                      <div className='pb-4 flex p-4 gap-5' style={{ borderBottom: '1px solid #EFEFEF' }}>
                        <button
                          className='absolute top-2 right-2'
                          onClick={() => deleteCartItemAttribule(cartIndex, attrIndex)}
                        >
                          <img src={IconClose} alt='icon' />
                        </button>
                        <div className='lg:w-[700px] w-full'>
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
                            {openModalIndex === attrIndex && (
                              <ModalProduct
                                cartData={cartData}
                                productAttribute={productAttribute}
                                setOpenModalIndex={setOpenModalIndex}
                              />
                            )}
                          </div>
                          <div className='flex justify-between items-center w-full mt-2'>
                            <div className='font-bold text-normal'>{productAttribute.productSku.price}/ 조각</div>
                            <div className='flex items-center gap-8'>
                              <div className='flex justify-between items-center w-[132px] h-8 border p-1 rounded-lg'>
                                <button
                                  className='w-6 h-6 flex justify-center items-center'
                                  onClick={() => handleDecrease(cartIndex, attrIndex)}
                                >
                                  <ReduceIcon />
                                </button>
                                <input
                                  inputMode='numeric'
                                  className='font-semibold text-xl w-16 text-center'
                                  value={quantities[attrIndex] || 1}
                                  onChange={(e) => handleInputChange(cartIndex, attrIndex, e.target.value)}
                                  onBlur={() => handleBlur(cartIndex, attrIndex)}
                                />
                                <button
                                  className='w-6 h-6 bg-[#EFEFEF] flex justify-center items-center'
                                  onClick={() => handleIncrease(cartIndex, attrIndex)}
                                >
                                  <IncreaseIcon />
                                </button>
                              </div>
                              <div className='flex flex-col items-center'>
                                <div className='font-medium text-small'>982.863원</div>
                                <div className='font-bold text-primaryPrdName'>5.2000 $</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })
      ) : (
        <div className='flex justify-center items-center h-screen text-bigPrdName font-bold'>
          장바구니가 비어 있습니다.
        </div>
      )}

      <div className='my-10'>
        <CustomPagination totalItems={cartData.length} align='center' />
      </div>

      <div className='mt-4'>
        <Space direction='vertical  w-full'>
          {data.map((item) => (
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
                      <div className='font-medium text-normal'>
                        <div className='font-medium text-normal'>{item.text}</div>
                        <div className='flex justify-between items-center w-[333px] mt-4'>
                          <div className='flex gap-2 items-center '>
                            <input
                              type='checkbox'
                              className='w-[18px] h-[18px]'
                              checked={isTermsChecked}
                              onChange={handleTermsCheckboxChange}
                            />
                            <div className='font-medium text-min'>
                              정기결제 약관에 동의합니다. <span className='text-[#C17C00]'>필수</span>
                            </div>
                          </div>
                          <div className='font-medium text-min'>정기결제 약관</div>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          ))}
        </Space>
      </div>

      <div className='flex justify-center items-center mt-4'>
        <button
          type='submit'
          className={`bg-[#D1B584] h-11 w-full text-white flex justify-center items-center rounded-lg font-semibold text-normal ${
            isButtonActive ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isButtonActive}
          onClick={handleSubmitCart}
        >
          장바구니에 추가 <img src={IconChevronRight} alt='icon' />
        </button>
      </div>
    </div>
  )
}
