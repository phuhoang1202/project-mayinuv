import React, { useState, useEffect } from 'react'
import IconHeart from '@assets/images/IconHeart.svg'
import IconHeartActive from '@assets/images/IconHeartActive.svg'
import IconStar from '@assets/images/IconStar.svg'
import { Modal, Skeleton, Tooltip } from 'antd'
import { constants as c } from '@constants'
import { Link } from 'react-router-dom'
import { formatPrice, formatPriceMultilingual } from '@utils/index'
import { getToken } from '@utils/auth'
import { useTranslation } from 'react-i18next'
import ImageError from '@assets/images/ImageError.svg'

export default function Product({ item, type, combinedArray, index, addToWishList, setBestProducts, setDataCategory }) {
  const [loading, setLoading] = useState(true)
  const [unit, setUnit] = useState('KRW')
  const { t } = useTranslation()

  const token = getToken()

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

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    setUnit(getUnitLocal)
  }, [unit])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className='flex items-center'>
        <Skeleton.Image className='w-full h-full' />
        <Skeleton active />
      </div>
    )
  }

  // Hàm xử lý yêu thích
  const handleWishlistClick = async (productId, currentWishListStatus) => {
    if (!token) {
      setOpenModal(true)
    } else {
      try {
        await addToWishList(productId)

        if (type === 'best') {
          setBestProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId ? { ...product, wishList: !currentWishListStatus } : product,
            ),
          )
        } else {
          setDataCategory((prevProducts) =>
            prevProducts.map((product) =>
              product.id === productId ? { ...product, wishList: !currentWishListStatus } : product,
            ),
          )
        }
      } catch (error) {
        console.error('Error updating wishlist', error)
      }
    }
  }

  // Kiểm tra và xử lý ảnh
  const arrCheck = ['detail', 'product']

  const mainImage = item.productImages.find((image) => image.main === true)
  const productImage = item.productImages.find((image) => image.imageType === 'product')

  const imageToShow = mainImage || productImage

  const imageUrl = imageToShow?.imageUrl || ''

  const isImageMatched = arrCheck.some((prefix) => imageUrl?.startsWith(prefix))

  const finalImageUrl = isImageMatched ? `${c.DOMAIN_IMG}${imageUrl}` : imageUrl

  // Kiểm tra promotion có chứa loại 'ship'
  const hasFreeShip = item.promotions?.some((promotion) => promotion.type === 'ship')

  return (
    <div className='flex items-center'>
      <div className='relative flex flex-col rounded-lg hover:shadow-lg hover:bg-[#F7F7F1] hover:rounded-lg lg:h-[420px] h-[320px]'>
        <Link to={`/product/${item.id}`}>
          <div
            className={`${
              type === 'best' ? 'lg:w-[240px] lg:h-[280px] w-[184px] h-[220px] img-product' : 'lg:h-[280px] h-[200px]'
            } `}
          >
            <img
              src={finalImageUrl}
              alt='product'
              className='rounded-lg w-full h-full object-cover'
              loading='lazy'
              onError={(e) => {
                e.target.onerror = null
                e.target.src = ImageError
              }}
            />
          </div>
        </Link>
        {type === 'best' && (
          <div className='absolute top-2 left-2'>
            {index < 3 ? (
              <img src={combinedArray[index]} alt={`rating`} />
            ) : (
              <div className='bg-[#28282899] flex justify-center items-center h-10 w-10 rounded-full'>
                <span className='text-white font-bold text-textPrd'>{index + 1}</span>
              </div>
            )}
          </div>
        )}
        {/* Yêu thích */}
        {/* <div
          className='absolute top-4 right-4 w-[30px] h-[30px] bg-[#28282899] rounded-full flex justify-center items-center cursor-pointer'
          onClick={() => handleWishlistClick(item.id, item.wishList)}
        >
          <img src={item.wishList ? IconHeartActive : IconHeart} alt='icon heart' />
        </div> */}

        <div className='flex flex-col lg:h-32  justify-between'>
          <div className='flex flex-col gap-1 p-2'>
            <Link to={`/product/${item.id}`}>
              <div className='font-medium lg:text-textPrd text-normal'>
                <Tooltip title={item.productName}>
                  <span className='overflow-hidden whitespace-nowrap text-ellipsis'>
                    {item.productName && item.productName.length > 10
                      ? `${item.productName.substring(0, 10)}...`
                      : item.productName}
                  </span>
                </Tooltip>
              </div>
            </Link>

            <div className='text-normal font-medium flex items-center gap-2'>
              {item?.promotions && item.promotions.some((e) => e.type === 'sale') ? (
                item.promotions.map((e) => {
                  if (e.type === 'sale') {
                    const discountedPrice = Math.floor(item.price * (1 - e.discountPercent / 100))
                    return (
                      <div key={e.id}>
                        <div className='flex flex-col'>
                          <div className='flex items-center'>
                            <span className='font-bold text-primaryPrdName text-[#3B3B3B]'>
                              {formatPrice(discountedPrice)}
                            </span>
                            <span className='font-bold text-small text-[#8C8C8C]'>
                              {unit !== 'KRW'
                                ? '/' + ' ' + formatPriceMultilingual(discountedPrice * item.exChangeRate, unit)
                                : null}
                            </span>
                            <span className='w-[48px] h-[22px] bg-[#2DC033] text-white text-small rounded-full flex justify-center items-center ml-1'>
                              -{e.discountPercent}%
                            </span>
                          </div>

                          <div className='flex items-center gap-1'>
                            <div>
                              <span className='text-[#3B3B3B] font-medium text-small line-through'>
                                {formatPrice(item.price)}
                              </span>
                              <span className='font-medium text-small text-[#8C8C8C] line-through'>
                                {unit !== 'KRW'
                                  ? '/' + ' ' + formatPriceMultilingual(item.price * item.exChangeRate, unit)
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
                <div>
                  <span className='font-bold text-primaryPrdName text-[#3B3B3B]'>{formatPrice(item.price)}</span>
                  <span className='font-bold text-small text-[#8C8C8C] pr-1'>
                    {unit !== 'KRW' ? '/' + ' ' + formatPriceMultilingual(item.price * item.exChangeRate, unit) : null}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className='px-2 w-fit'>
            {hasFreeShip && (
              <span className='text-[#6E89E7] min-w-[64px] h-6 px-2 py-2 bg-[#EFEFEF] text-min flex justify-center items-center'>
                {t('freeShipTag')}
              </span>
            )}
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
    </div>
  )
}
