import { Drawer, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import ReduceIcon from '@assets/icons/ReduceIcon.jsx'
import IncreaseIcon from '@assets/icons/IncreaseIcon.jsx'
import IconShoppingCart from '@assets/images/IconShoppingCart.svg'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import { cart } from '@services/user/cart'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { formatPrice, formatPriceMultilingual, multilingualProperties } from '@utils/index'
import { getToken } from '@utils/auth'
import { Modal } from 'antd'

export default function DrawerProduct({ open, onClose, productData, exChangeRate }) {
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [selectedProducts, setSelectedProducts] = useState([])
  const [orderProductByAttributeState, setOrderProductByAttributeState] = useState([])
  const idProduct = productData.id
  const navigate = useNavigate()
  const { t } = useTranslation()
  const token = getToken()

  const shippingFee =
    productData?.categories?.description === '명품' ||
    productData?.promotions?.some((promotion) => promotion.type === 'ship')
      ? 0
      : 5000

  // Tabs
  const [productSKUData, setProductSKUData] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [recursive, setRecursive] = useState([])
  const [attributeTab, setAttributeTab] = useState([])
  const [unit, setUnit] = useState(JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW')
  const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language')) || 'ko')

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    const getLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'
    setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [])

  useEffect(() => {
    if (productData.productSkus && productData.productSkus.length > 0) {
      setProductSKUData(productData.productSkus)
    }
  }, [productData])

  // Start đệ quy
  useEffect(() => {
    // Bước 1: Lấy ra các loại thuộc tính duy nhất
    const uniqueAttributeTypes = [
      ...new Set(productSKUData.flatMap((item) => item.attributes?.map((attr) => attr.type) || [])),
    ]

    const attributeTab = uniqueAttributeTypes.map((type) => ({
      attribute: type,
      values: [
        ...new Set(
          productSKUData.flatMap((item) =>
            item.attributes?.filter((attr) => attr.type === type).map((attr) => attr.attributeName),
          ),
        ),
      ],
    }))

    // Bước 2: Xây dựng cấu trúc result
    const result = productSKUData.map((product) => {
      // Lấy các thuộc tính cho từng sản phẩm
      const attributes = uniqueAttributeTypes
        .map((type) => {
          const attr = product.attributes?.find((attr) => attr.type === type)
          return attr ? { attributeName: attr.attributeName, type: attr.type } : null
        })
        .filter(Boolean)

      return {
        productSku: {
          attributes,
          price: product.price,
          id: product.id,
          productId: product.productId,
          quantity: product.quantity,
          sku: product.sku,
        },
        quantityOrder: 0,
      }
    })

    // Cập nhật state recursive với giá trị tính toán
    setAttributeTab(attributeTab)
    setRecursive(result)
  }, [productSKUData])

  // End đệ quy

  // Tabs
  const handleTabChange = (key) => {
    setActiveTab(parseInt(key))
  }

  const getTotalQuantitiesByAttribute = (attributeType) => {
    const totals = {}

    recursive.forEach((item) => {
      // Lấy thuộc tính từ productSku
      const attribute = item.productSku.attributes?.find((attr) => attr.type === attributeType)

      if (attribute) {
        const attributeName = attribute.attributeName
        // Cập nhật tổng số lượng theo attributeName
        if (totals[attributeName]) {
          totals[attributeName] += item.quantityOrder
        } else {
          totals[attributeName] = item.quantityOrder
        }
      }
    })

    return totals
  }

  const totalQuantitiesByColor = getTotalQuantitiesByAttribute(
    attributeTab && attributeTab.length > 0 ? attributeTab[0].attribute : 'COLOR',
  ) // COLOR, ...

  const totalPrice = recursive.reduce((sum, item) => {
    const quantity = item.quantityOrder
    const price = item.productSku.price

    return sum + quantity * price
  }, 0)

  // Tăng giảm số lượng
  const handleQuantityChange = (sku, change) => {
    // Tạo bản sao mới của state recursive để tránh thay đổi trực tiếp
    const newRecursive = [...recursive]

    // Tìm item có sku tương ứng trong productSku
    const currentItem = newRecursive.find((item) => item.productSku.sku === sku)

    if (currentItem) {
      // Tính toán số lượng mới
      const newQuantity = currentItem.quantityOrder + change

      // Kiểm tra số lượng không nhỏ hơn 0
      if (newQuantity >= 0) {
        currentItem.quantityOrder = newQuantity
        setRecursive(newRecursive)
      }
    }
  }

  const handleInputChange = (sku, value) => {
    // Tạo bản sao mới của state để tránh thay đổi trực tiếp
    const newRecursive = [...recursive]

    // Tìm index của item có sku tương ứng trong productSku
    const itemIndex = newRecursive.findIndex((item) => item.productSku.sku === sku)

    if (itemIndex !== -1) {
      const maxQuantity = newRecursive[itemIndex].productSku.quantity

      if (!/^\d*$/.test(value)) {
        return // Nếu không phải là số, không thực hiện gì
      }

      let newQuantity = parseInt(value, 10)

      // Nếu newQuantity là NaN (khi input rỗng), giữ nguyên giá trị cũ
      if (isNaN(newQuantity)) {
        newQuantity = '' // Đặt lại giá trị thành rỗng
      }

      // Kiểm tra nếu giá trị mới vượt quá maxQuantity
      if (newQuantity > maxQuantity) {
        // console.log(`Giá trị không được vượt quá ${maxQuantity}. Đã đặt giá trị thành ${maxQuantity}.`)
        newQuantity = maxQuantity // Đặt giá trị thành tối đa
      }

      // Cập nhật giá trị mới vào item
      newRecursive[itemIndex].quantityOrder = newQuantity
      setRecursive(newRecursive)
    }
  }

  // Tính tổng số lượng sản phẩm đã chọn
  const totalQuantity = Object.values(totalQuantitiesByColor).reduce((sum, value) => sum + value, 0)

  // Call API
  // Create Cart
  const handleCreateOrder = async () => {
    if (!token) {
      setOpenModal(true)
    } else {
      const filteredRecursive = recursive.filter((item) => item.quantityOrder > 0)
      const bodyPayload = {
        cartItemAttributeOptions: filteredRecursive,
        productId: productData.id,
      }

      try {
        await cart.createCartOrder(bodyPayload)
        setSelectedAttributes({})
        setSelectedProducts([])
        setOrderProductByAttributeState([])
        onClose()
      } catch (error) {
        console.error('Error creating order:', error)
      }
    }
  }

  // Create info order
  const handleGetInfo = () => {
    if (!token) {
      setOpenModal(true)
    } else {
      // Chỉ trả về mảng bên ngoài, không lồng nhiều lớp
      const totalQuantity = recursive.reduce((sum, item) => sum + item.quantityOrder, 0)
      const filteredRecursive = recursive.filter((item) => item.quantityOrder > 0)
      const bodyPayload = [
        {
          cartItemAttributeOptions: filteredRecursive,
          product: productData,
          quantity: totalQuantity,
        },
      ]

      sessionStorage.removeItem('orderId')
      sessionStorage.removeItem('infoOrder')
      sessionStorage.removeItem('checkCategory')
      sessionStorage.setItem('infoOrder', JSON.stringify(bodyPayload))
      sessionStorage.setItem('checkCategory', JSON.stringify(shippingFee))
      onClose()
      navigate('/order-confimation')
    }
  }

  // Modal navigate login
  const [openModal, setOpenModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpenModal(false)
      setConfirmLoading(false)
    }, 2000)
    navigate('/login')
  }
  const handleCancel = () => {
    setOpenModal(false)
  }

  return (
    <Drawer size={'large'} onClose={onClose} title={false} open={open} className='relative'>
      <div className='lg:px-4 px-2'>
        <h3 className='text-bigPrdName font-bold'>{t('drawerTitle')}</h3>

        {/* Discount */}
        {/* <div className='mt-2'>
          <div className='font-medium text-normal'>{t('drawerDescription')}</div>
        </div> */}

        {/* Option */}
        <div>
          <div className='mt-4'>
            {/* Attribute */}
            {/* Tabs */}
            <div className='mt-4 '>
              {/* <h3 className='font-bold text-normal'>Printing Methods</h3> */}
              <Tabs defaultActiveKey={attributeTab[0]?.values[0]} className='mt-6' onChange={handleTabChange}>
                {attributeTab[0]?.values?.map((value, idx) => {
                  const totalQuantity = totalQuantitiesByColor[value] || 0

                  return (
                    <Tabs.TabPane
                      tab={
                        <div>
                          <div
                            className='text-normal font-medium text-[#3B3B3B] p-2 mt-4 rounded-lg min-w-20 flex justify-center items-center'
                            style={{
                              border: activeTab === idx ? '1px solid #3B3B3B' : '1px solid #D3D2D2',
                            }}
                          >
                            {value}
                          </div>
                          <div className='absolute top-0 right-0 z-50 bg-[#3B3B3B] text-white min-w-14 rounded-full flex items-center justify-end px-2'>
                            {totalQuantity}
                          </div>
                        </div>
                      }
                      key={idx}
                    >
                      <div>
                        <table className='w-full'>
                          <thead>
                            <tr>
                              <th className='px-4 py-2 text-start font-semibold text-small truncate overflow-hidden text-ellipsis'>
                                {t('tableTh1')}
                              </th>
                              <th className='px-4 py-2 font-semibold text-small lg:min-w-24'>{t('tableTh2')}</th>
                              <th className='px-4 py-2 font-semibold text-small lg:min-w-24'>{t('tableTh3')}</th>
                              <th className='px-4 py-2 font-semibold text-small'>{t('tableTh4')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recursive
                              .filter((item) => {
                                // Kiểm tra nếu thuộc tính trong item.productSku.attributes có tên giống với attributeTab[0]?.attribute
                                return item.productSku.attributes.some(
                                  (attr) => attr.type === attributeTab[0]?.attribute && attr.attributeName === value,
                                )
                              })
                              .map((item, idx) => {
                                const getSize = (item) => {
                                  if (item.productSku.attributes && Array.isArray(item.productSku.attributes)) {
                                    return item.productSku.attributes.map((attr, index) => (
                                      <div key={index} className='flex flex-col'>
                                        {`${multilingualProperties(attr.type, language)} : ${attr.attributeName}`}
                                      </div>
                                    ))
                                  }
                                  return <div>N/A</div>
                                }

                                // Lấy số lượng hiện tại cho sản phẩm
                                const currentQuantity = item.quantityOrder

                                return (
                                  <tr key={idx} className='hover:bg-gray-50'>
                                    <td className='px-4 py-2 text-start font-semibold text-small'>{getSize(item)}</td>
                                    <td className='px-4 py-2 text-center font-semibold text-small'>
                                      {formatPrice(item.productSku.price)}
                                    </td>
                                    <td className='px-4 py-2 text-center font-semibold text-small'>
                                      {formatPrice(item.productSku.price * currentQuantity)}
                                    </td>
                                    <td className='px-4 py-2'>
                                      <div>
                                        <div className='flex justify-between items-center lg:w-[150px] w-auto h-8 p-1 rounded-lg border'>
                                          <button
                                            className='w-6 h-6 flex justify-center items-center'
                                            onClick={() => handleQuantityChange(item.productSku.sku, -1)}
                                          >
                                            <ReduceIcon strokeColor={currentQuantity > 0 ? '#3B3B3B' : '#D3D2D2'} />
                                          </button>
                                          <input
                                            type='text'
                                            value={currentQuantity}
                                            onChange={(e) => handleInputChange(item.productSku.sku, e.target.value)}
                                            className='w-12 text-center mx-2 font-medium text-small'
                                          />
                                          <button
                                            className='w-6 h-6 bg-[#EFEFEF] flex justify-center items-center'
                                            onClick={() => handleQuantityChange(item.productSku.sku, 1)}
                                            disabled={item.quantityOrder >= item.productSku.quantity}
                                          >
                                            <IncreaseIcon
                                              strokeColor={
                                                item.quantityOrder >= item.productSku.quantity ? '#D3D2D2' : '#3B3B3B'
                                              }
                                            />
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })}
                          </tbody>
                        </table>
                      </div>
                    </Tabs.TabPane>
                  )
                })}
              </Tabs>
            </div>

            <div className='mt-4 border-t '>
              {/* Bill */}
              <div className='flex flex-col gap-2 mt-4'>
                <div className='flex justify-between items-center font-medium text-textPrd'>
                  <div>
                    {t('totalBill')} ({totalQuantity}
                    {t('product')})
                  </div>
                  {/* Hiển thị số lượng sản phẩm */}
                  <div>
                    {formatPrice(totalPrice)}
                    <span className='font-bold text-normal text-[#8C8C8C]'>
                      {unit !== 'KRW' ? '/' + ' ' + formatPriceMultilingual(totalPrice * exChangeRate, unit) : null}
                    </span>
                  </div>
                </div>

                <div className='flex justify-between items-center font-medium lg:text-textPrd text-normal'>
                  <div>{t('shippingFee')}</div>
                  <div>
                    {formatPrice(shippingFee)}
                    <span className='font-bold text-normal text-[#8C8C8C]'>
                      {unit !== 'KRW' ? '/' + ' ' + formatPriceMultilingual(shippingFee * exChangeRate, unit) : null}
                    </span>
                  </div>
                  {/* Hiển thị phí vận chuyển */}
                </div>

                <div className='flex justify-between items-center font-bold lg:text-[32px] text-textPrd'>
                  {/* Tổng cộng */}
                  <div>{t('totalBill')}</div>
                  <div>
                    {formatPrice(totalPrice + shippingFee) || 0}
                    <span className='font-bold text-primaryPrdName text-[#8C8C8C]'>
                      {unit !== 'KRW'
                        ? '/' + ' ' + formatPriceMultilingual((totalPrice + shippingFee) * exChangeRate, unit)
                        : null}
                    </span>
                  </div>
                  {/* Hiển thị tổng cộng tiền */}
                </div>
              </div>

              {/* Button submit */}
              <div className='mt-6 flex flex-col gap-6'>
                <div className='text-normal font-medium bg-white flex justify-between items-center gap-4'>
                  <button
                    className='text-[#282828] rounded-lg h-11 w-full flex justify-center items-center border gap-2'
                    style={{ border: '1px solid #3B3B3B' }}
                    onClick={handleCreateOrder}
                    disabled={totalPrice === 0}
                  >
                    {t('btnAddToCart')}
                    <img src={IconShoppingCart} alt='icon shopping cart' />
                  </button>
                  <button
                    className={`${
                      totalPrice > 0 ? 'bg-[#D1B584] ' : 'bg-[#aa9570]'
                    } text-white rounded-lg h-11 w-full flex justify-center items-center`}
                    onClick={handleGetInfo}
                    disabled={totalPrice === 0}
                  >
                    {t('buyNow')}
                    <img src={IconChevronRight} alt='icon IconChevronRight' />
                  </button>
                </div>
              </div>
            </div>
            {/* Hết */}
          </div>
        </div>
      </div>
      {/* Modal navigate login */}
      <Modal open={openModal} confirmLoading={confirmLoading} onCancel={handleCancel} footer={false} centered>
        <div>
          <div className='font-semibold text-textPrd flex flex-col justify-center items-center mt-4 gap-2'>
            {/* <div>{t('loginText1')} </div> */}
            <div>{t('loginText2')}</div>
          </div>
        </div>

        <div className='flex items-center justify-center gap-6 mt-8'>
          <div>
            <button
              className='font-semibold text-normal h-11 min-w-36 rounded-lg'
              style={{ border: '2px solid black' }}
              onClick={handleCancel}
            >
              {t('btnCancel')}
            </button>
          </div>
          <div>
            <button
              className='text-white bg-[#D1B584] font-semibold text-normal h-11 min-w-36 rounded-lg'
              onClick={handleOk}
            >
              {t('loginBtn')}
            </button>
          </div>
        </div>
      </Modal>
    </Drawer>
  )
}
