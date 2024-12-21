import React, { useEffect, useState } from 'react'
import IconRight from '@assets/images/IconRight.svg'
import IconLeft from '@assets/images/IconLeft.svg'
import IconShoppingCart from '@assets/images/IconShoppingCart.svg'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import IconFreeShip from '@assets/images/IconFreeShip.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { Menu, Rate, Image, Modal } from 'antd'
import CollapseComponent from '@components/collapse/CollapseComponent'
// import Feedback from '@components/feedback/Feedback'
import BestProduct from '@components/bestProduct/BestProduct'
import ProductNew from '@components/product/ProductNew'
import { product } from '@services/user/product'
import { constants as c } from '@constants'
import Loading from '@components/loading/Loading'
import DrawerProduct from '@components/drawerProduct/DrawerProduct'
import ReduceIcon from '@assets/icons/ReduceIcon.jsx'
import IncreaseIcon from '@assets/icons/IncreaseIcon.jsx'
import { cart } from '@services/user/cart'
import { formatPrice, formatPriceMultilingual, multilingualProperties } from '@utils/index'
import { useTranslation } from 'react-i18next'
import IconHeartActive from '@assets/images/IconHeartActive.svg'
import IconHeart from '@assets/images/IconHeart.svg'
import ImageError from '@assets/images/ImageError.svg'
import { getToken, getUserInfor } from '@utils/auth'
import { Toast } from '@utils/toast'

export default function DetailProduct() {
  const [selectedImage, setSelectedImage] = useState('')
  const [dataDetail, setDataDetail] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [exChangeRate, setExChangeRate] = useState(0)
  const param = useParams()
  const { id } = param
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const navigate = useNavigate()
  const [unit, setUnit] = useState(JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW')
  const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language')) || 'ko')

  const { t } = useTranslation()
  const token = getToken()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 375)

  // img
  const [listImg, setListImg] = useState([])
  const [listImgProduct, setListImgProduct] = useState([])

  // description
  const [dataDescription, setDataDescription] = useState('')

  // Modal check login
  // Modal navigate login
  const [openModal, setOpenModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = () => {
    setConfirmLoading(true)

    setOpenModal(false)
    setConfirmLoading(false)

    navigate('/login')
  }
  const handleCancel = () => {
    setOpenModal(false)
  }

  // Drawer
  const [openDrawer, setOpenDrawer] = useState(false)
  const showDrawer = () => {
    // if()
    setOpenDrawer(true)
  }
  const onClose = () => {
    setOpenDrawer(false)
  }

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    const getLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'
    setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [unit])

  let getInfonUser = null

  try {
    const userInfo = getUserInfor()
    if (userInfo) {
      getInfonUser = JSON.parse(userInfo)
    } else {
      getInfonUser = {}
    }
  } catch (error) {
    console.error('Error parsing user information:', error)
    getInfonUser = {}
  }

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const bodyPayload = {
        currency: unit,
        userId: getInfonUser.id,
        productId: id,
        // language,
      }
      const response = await product.getProductByIdAndUserId(bodyPayload)
      const result = response.data

      result.imageMain = result?.productImages.find((el) => el.main) || result.productImages[0]
      setDataDetail(result)
      setListImg(response?.data.productImages)
      setDataDescription(response?.data.description)
      setExChangeRate(response?.data.exChangeRate)
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSmallMobile(window.innerWidth < 375)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrease = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1)
    }
  }

  const shippingFee =
    dataDetail?.categories?.description === '명품' ||
    dataDetail?.promotions?.some((promotion) => promotion.type === 'ship')
      ? 0
      : 5000

  // Calculate total price based on quantity
  const calculateTotalPrice = () => {
    const basePrice = dataDetail?.price || 0
    const promotions = dataDetail?.promotions || []
    let finalPrice = basePrice

    promotions.forEach((promo) => {
      if (promo.type === 'sale') {
        finalPrice = Math.floor(finalPrice * (1 - promo.discountPercent / 100))
      }
    })

    return finalPrice * quantity // Total price based on quantity
  }

  const MAX_IMAGES = 4 // Số lượng ảnh tối đa hiển thị mỗi lần

  // Giả sử đoạn mã này nằm trong component của bạn

  // Xử lý để di chuyển đến slide tiếp theo
  const handleNext = () => {
    if (currentIndex + MAX_IMAGES < listImgProduct.length) {
      setCurrentIndex(currentIndex + MAX_IMAGES)
    }
  }

  // Xử lý để di chuyển đến slide trước
  const handlePrev = () => {
    if (currentIndex - MAX_IMAGES >= 0) {
      setCurrentIndex(currentIndex - MAX_IMAGES)
    }
  }

  // Hàm xử lý yêu thích
  const addToWishList = async (productId) => {
    try {
      const bodyPayload = {
        userId: getInfonUser.id,
        productId: productId,
      }
      await product.wishListPrd(bodyPayload)
      fetchData()

      Toast.success('찜 목록에 추가했습니다.')
    } catch (error) {
      console.error('위시리스트에 추가 실패')
    }
  }

  // Call API
  const handleCreateOrder = async () => {
    if (!token) {
      setOpenModal(true)
    } else {
      sessionStorage.removeItem('infoOrder')
      const bodyPayload = {
        productId: Number(id),
        quantity: quantity,
      }

      try {
        await cart.createCartOrder(bodyPayload)
        setQuantity(0)
        setIsLoading(true)
      } catch (error) {
        console.error('Error creating order:', error)
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    }
  }

  // Function to handle order creation for 지금 구매

  const handleInfoOrder = () => {
    if (!token) {
      setOpenModal(true)
    } else {
      const arrInfoOrder = [
        {
          cartItemAttributeOptions: [],
          product: dataDetail,
          quantity: quantity,
        },
      ]

      setQuantity(0)
      sessionStorage.removeItem('infoOrder')
      sessionStorage.removeItem('orderId')
      sessionStorage.removeItem('checkCategory')
      sessionStorage.setItem('infoOrder', JSON.stringify(arrInfoOrder))
      sessionStorage.setItem('checkCategory', JSON.stringify(shippingFee))
      // sessionStorage.setItem('orderId', JSON.stringify(arrInfoOrder))

      navigate('/order-confimation')
    }
  }

  useEffect(() => {
    const productImagesFiltered = listImg.filter((image) => image.imageType === 'product')
    setListImgProduct(productImagesFiltered)
  }, [listImg])

  return (
    <>
      <div className='py-6 lg:px-0 mt-16'>
        {isLoading && <Loading />}
        {/* Detail Product */}
        <div className='lg:max-w-7xl mx-auto mt-6'>
          <div className='flex lg:gap-14 gap-4 flex-col lg:flex-row justify-between'>
            {/* Phần hiển thị ảnh chính */}
            <div className='relative flex lg:flex-row gap-8 lg:px-0 px-4 lg:w-1/2'>
              {/* Ảnh nhỏ bên dưới */}
              <div className='flex justify-between relative'>
                <div>
                  <div className='flex flex-col gap-8'>
                    {listImgProduct &&
                      listImgProduct.length > 0 &&
                      listImgProduct?.slice(currentIndex, currentIndex + MAX_IMAGES).map((image, index) => {
                        const arrCheck = ['detail', 'product']
                        const isImageMatched = arrCheck.some((prefix) => image?.imageUrl?.startsWith(prefix))
                        const finalImageUrl = isImageMatched ? `${c.DOMAIN_IMG}${image?.imageUrl}` : image?.imageUrl
                        return (
                          <div key={index}>
                            <div
                              className={`cursor-pointer border-2 rounded-lg ${
                                selectedImage === image ? 'border-gray-300' : 'border-none'
                              } lg:h-[110px] lg:w-[110px] w-14 h-14 `}
                              onClick={() => setSelectedImage(image)}
                            >
                              <img
                                src={finalImageUrl}
                                alt={`Product ${index + currentIndex + 1}`}
                                className='object-cover object-center rounded-lg h-full w-full'
                                loading='lazy'
                                onError={(e) => {
                                  e.target.onerror = null
                                  e.target.src = ImageError
                                }}
                              />
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
              {/* Ảnh main */}
              <div>
                <div className='rounded-lg'>
                  {dataDetail?.productImages?.length > 0 && (
                    <Image
                      // width={514}
                      height={isSmallMobile ? 200 : isMobile ? 300 : 514}
                      src={(() => {
                        const arrCheck = ['detail', 'product']
                        const mainImage = selectedImage || dataDetail?.imageMain
                        const isImageMatched = arrCheck.some((prefix) => mainImage?.imageUrl?.startsWith(prefix))
                        return isImageMatched ? `${c.DOMAIN_IMG}${mainImage?.imageUrl}` : mainImage?.imageUrl
                      })()}
                      alt='Selected Product'
                      className='rounded-lg object-contain lg:w-[514px] lg:h-[514px] w-[100px] h-[100px]'
                      loading='lazy'
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = ImageError
                      }}
                    />
                  )}
                </div>
                {dataDetail && Object.keys(dataDetail).length > 0 && (
                  <div className='absolute top-2 lg:right-0 right-4 z-50 cursor-pointer'>
                    <div
                      className='w-8 h-8 p-1 rounded-full bg-[#28282899] flex justify-center items-center'
                      onClick={() => addToWishList(dataDetail.id)}
                    >
                      <img
                        src={dataDetail?.wishList ? IconHeartActive : IconHeart}
                        alt='icon'
                        className='w-full h-full object-cover'
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* Hết phần 1 */}
            </div>

            {/* Phần chi tiết sản phẩm */}
            <div className='lg:w-[481px] w-full mx-auto px-2'>
              <h2 className='mb-2 tracking-tight font-bold text-bigPrdName'>{dataDetail.productName}</h2>
              {shippingFee === 0 && (
                <div className='w-fit'>
                  <div className='flex items-center gap-1 bg-[#EFEFEF] h-8 px-4 flex-shrink-0'>
                    <img src={IconFreeShip} alt='icon' />
                    <span className='truncate'>{t('freeShipTag')}</span>
                  </div>
                </div>
              )}

              <div className='flex flex-col gap-1 mt-4'>
                {/* <div className='flex items-center gap-2'>
                  <Rate disabled defaultValue={dataDetail.reviewCount} style={{ color: '#F14646', fontSize: '16px' }} />
                  <div className='font-medium text-normal'>
                    {dataDetail.averageRating} <span className='text-[#8C8C8C]'>{dataDetail.reviewCount} Review</span>
                  </div>
                </div> */}

                <div className='text-normal font-medium flex items-center gap-4'>
                  {dataDetail?.promotions && dataDetail?.promotions.some((e) => e.type === 'sale') ? (
                    dataDetail?.promotions?.map((e) => {
                      if (e.type === 'sale') {
                        const discountedPrice = Math.floor(dataDetail?.price * (1 - e.discountPercent / 100))

                        return (
                          <div key={e.id}>
                            <div className='flex flex-col'>
                              <div className='flex items-center gap-2'>
                                <span className='font-bold text-primaryPrdName text-[#3B3B3B]'>
                                  {formatPrice(discountedPrice)}
                                </span>
                                <span className='font-bold text-small text-[#8C8C8C] pl-1'>
                                  {unit !== 'KRW'
                                    ? '/' +
                                      ' ' +
                                      formatPriceMultilingual(discountedPrice * dataDetail.exChangeRate, unit)
                                    : null}
                                </span>
                                <span className='w-[48px] h-[22px] bg-[#2DC033] text-white text-small rounded-full flex justify-center items-center pl-1'>
                                  -{e.discountPercent}%
                                </span>
                              </div>

                              <div className='flex items-center gap-1'>
                                <div>
                                  <span className='text-[#3B3B3B] font-medium text-small line-through'>
                                    {formatPrice(dataDetail?.price)}
                                  </span>
                                  <span className='font-medium text-small text-[#8C8C8C] line-through'>
                                    {unit !== 'KRW'
                                      ? '/' +
                                        ' ' +
                                        formatPriceMultilingual(dataDetail?.price * dataDetail.exChangeRate, unit)
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
                      <span className='font-bold text-primaryPrdName text-[#3B3B3B]'>
                        {formatPrice(dataDetail?.price)}
                      </span>

                      <span className='font-bold text-small text-[#8C8C8C]'>
                        {unit !== 'KRW'
                          ? '/' + ' ' + formatPriceMultilingual(dataDetail?.price * dataDetail.exChangeRate, unit)
                          : null}
                      </span>
                    </div>
                  )}
                </div>

                {/* <div className='text-[#36BDF7] font-medium text-normal'>{t('textEndow')}</div> */}
              </div>
              {/* Select */}
              <div>
                <div>
                  {/* Option 1 */}
                  {Array.isArray(dataDetail?.productAttributeModels) && dataDetail.productAttributeModels.length > 0 ? (
                    <div className='mt-2'>
                      {/* <div className='font-bold text-normal'>옵션 1 ({dataDetail?.productAttributeModels?.length})</div> */}
                      <div className='mt-2 pt-4 flex flex-col gap-4 pb-2'>
                        {dataDetail.productAttributeModels &&
                          dataDetail.productAttributeModels.map((attribute, index) => (
                            <div
                              key={index}
                              className='relative rounded-lg cursor-pointer'
                              // onClick={() => setSelectedAttribute(attribute)}
                              // style={{ border: '1px solid #D3D2D2' }}
                            >
                              <div onClick={showDrawer}>
                                <div className='flex flex-col gap-4'>
                                  <div className='font-bold text-normal'>
                                    {multilingualProperties(attribute.type, language)}
                                  </div>
                                  <div className='flex items-center gap-2'>
                                    {attribute.modelList.slice(0, 2).map((el, i) => {
                                      return (
                                        <div
                                          className='font-medium text-normal flex justify-center items-center h-11 px-2 rounded-lg min-w-24'
                                          style={{ border: '1px solid #D3D2D2' }}
                                          key={i}
                                        >
                                          <div>{el.attributeName}</div>
                                        </div>
                                      )
                                    })}
                                    {attribute.modelList.length > 2 && (
                                      <div
                                        className='font-medium text-normal flex justify-center items-center h-11 px-2 rounded-lg min-w-24'
                                        style={{ border: '1px solid #D3D2D2' }}
                                      >
                                        <div>...</div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className='mt-6 flex flex-col gap-6'>
                        <div className='text-normal font-medium bg-white flex justify-between items-center gap-4'>
                          <button
                            className='text-[#282828] rounded-lg h-11 w-full flex justify-center items-center border gap-2'
                            style={{ border: '1px solid #3B3B3B' }}
                            onClick={showDrawer}
                          >
                            {t('btnAddToCart')}
                            <img src={IconShoppingCart} alt='icon shopping cart' />
                          </button>
                          <button
                            className='text-white bg-[#D1B584] rounded-lg h-11 w-full flex justify-center items-center'
                            onClick={showDrawer}
                          >
                            {t('buyNow')}
                            <img src={IconChevronRight} alt='icon IconChevronRight' />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-6'>
                      <div>
                        {/* button tăng giảm và phần Bill */}
                        <div className='mt-4 flex flex-col gap-2'>
                          <div className='font-bold text-normal'>{t('quantity')}</div>
                          <div className='flex justify-between items-center pb-2'>
                            <div className='flex justify-between items-center w-[150px] h-8 border p-1'>
                              <button
                                className='w-6 h-6 bg-[#EFEFEF] flex justify-center items-center'
                                onClick={handleDecrease}
                              >
                                <ReduceIcon strokeColor={quantity > 0 ? '#3B3B3B' : '#D3D2D2'} />
                              </button>

                              {/* Input to replace the span */}
                              <input
                                inputMode='numeric'
                                className='font-semibold text-xl w-16 text-center'
                                value={quantity}
                                onChange={(e) => {
                                  const newQuantity = Number(e.target.value)
                                  // Kiểm tra nếu giá trị nhập vào lớn hơn stockQuantity
                                  if (newQuantity > dataDetail.stockQuantity) {
                                    setQuantity(dataDetail.stockQuantity) // Set về stockQuantity nếu vượt quá
                                  } else {
                                    setQuantity(Math.max(0, newQuantity)) // Nếu không, set giá trị hợp lệ
                                  }
                                }}
                                min='0'
                              />

                              <button
                                className='w-6 h-6 bg-[#EFEFEF] flex justify-center items-center'
                                onClick={handleIncrease}
                                disabled={quantity >= dataDetail.stockQuantity}
                              >
                                <IncreaseIcon
                                  strokeColor={quantity >= dataDetail.stockQuantity ? '#D3D2D2' : '#3B3B3B'}
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Bill */}
                        <div className='flex flex-col gap-2 mt-4 border-t pt-4'>
                          <div className='flex justify-between items-center font-medium text-textPrd'>
                            <div>
                              {t('totalBill')} {quantity} {t('product')}
                            </div>
                            <div>
                              {formatPrice(calculateTotalPrice())}
                              <span className='font-bold text-normal text-[#8C8C8C]'>
                                {unit !== 'KRW'
                                  ? '/' +
                                    ' ' +
                                    formatPriceMultilingual(calculateTotalPrice() * dataDetail.exChangeRate, unit)
                                  : null}
                              </span>
                            </div>
                          </div>

                          <div className='flex justify-between items-center font-medium text-textPrd'>
                            <div>{t('shippingFee')} </div>
                            <div>
                              {formatPrice(shippingFee)}
                              <span className='font-bold text-normal text-[#8C8C8C]'>
                                {unit !== 'KRW'
                                  ? '/' + ' ' + formatPriceMultilingual(shippingFee * dataDetail.exChangeRate, unit)
                                  : null}
                              </span>
                            </div>
                          </div>

                          <div className='flex justify-between items-center font-bold text-[32px]'>
                            <div>{t('totalBill')}</div>
                            <div>
                              {formatPrice(calculateTotalPrice() + shippingFee)}
                              <span className='font-bold text-largerPrdName text-[#8C8C8C]'>
                                {unit !== 'KRW'
                                  ? '/' +
                                    ' ' +
                                    formatPriceMultilingual(
                                      (calculateTotalPrice() + shippingFee) * dataDetail.exChangeRate,
                                      unit,
                                    )
                                  : null}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* quantity */}
                        <div className='mt-6 flex flex-col gap-6'>
                          <div className='text-normal font-medium bg-white flex items-center gap-4'>
                            <button
                              className={`${
                                quantity > 0
                                  ? 'text-[#282828] border-[#3B3B3B] hover:bg-gray-100'
                                  : 'text-gray-400 border-gray-300 cursor-not-allowed'
                              } text-[#282828] rounded-lg h-11 w-full flex justify-center items-center border gap-2`}
                              style={{ border: '1px solid #3B3B3B' }}
                              onClick={quantity > 0 ? handleCreateOrder : null}
                              disabled={quantity === 0}
                            >
                              {t('btnAddToCart')}
                              <img src={IconShoppingCart} alt='icon shopping cart' />
                            </button>
                            <button
                              className={`${
                                quantity > 0
                                  ? 'bg-[#D1B584] text-white hover:bg-[#B69B6C]'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              } text-white bg-[#D1B584] rounded-lg h-11 w-full flex justify-center items-center`}
                              onClick={quantity > 0 ? handleInfoOrder : null}
                              disabled={quantity === 0}
                            >
                              {t('buyNow')}
                              <img src={IconChevronRight} alt='icon IconChevronRight' />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Drawer */}
              <DrawerProduct open={openDrawer} onClose={onClose} productData={dataDetail} exChangeRate={exChangeRate} />
              {/* Drawer */}
            </div>
          </div>
        </div>
        {/* Detail Product */}

        <div className='lg:max-w-7xl mx-auto mt-6 px-2'>
          {/* Collapse */}
          <CollapseComponent dataDescription={dataDescription} className='mx-auto' />
          {/* Collapse */}

          {/* Feedback */}
          {/* <Feedback /> */}
          {/* Feedback */}
        </div>
        {/* <BestProduct /> */}
        {/* Best */}

        {/* New */}
        {/* <ProductNew /> */}
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
      </div>
    </>
  )
}
