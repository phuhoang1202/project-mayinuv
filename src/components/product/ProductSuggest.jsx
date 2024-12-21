import React, { useEffect, useState } from 'react'
import IconHeart from '@assets/images/IconHeart.svg'
import IconHeartActive from '@assets/images/IconHeartActive.svg'
import IconStar from '@assets/images/IconStar.svg'
import IconLeft from '@assets/images/IconLeft.svg'
import IconRight from '@assets/images/IconRight.svg'
import { constants as c } from '@constants'
import { Modal, Skeleton } from 'antd'
import { product } from '@services/user/product'
import { Link } from 'react-router-dom'
import { getToken, getUserInfor } from '@utils/auth'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { formatPrice, formatPriceMultilingual } from '@utils/index'
import ImageError from '@assets/images/ImageError.svg'

export default function ProductSuggest() {
  const [recommendProducts, setRecommendProducts] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(6)
  const [isLoading, setIsLoading] = useState(true)

  // const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language')) || 'ko')
  const getUserId = JSON.parse(getUserInfor() || null)
  const { t } = useTranslation()
  const [unit, setUnit] = useState(JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW')
  // const token = getToken()

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
    // const getLanguage = JSON.parse(localStorage.getItem('language'))
    // setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [])

  const fetchRecommendProducts = async () => {
    try {
      setIsLoading(true)
      const response = await product.getProductByType({
        type: 'recommend',
        currency: unit,
        pageNumber: pageNumber,
        pageSize: pageSize,
        userId: getUserId?.id,
        sort: '',
        sortBy: 'desc',
      })
      const result = await Promise.all(
        response.data.content.map(async (product) => {
          product.imageMain = product.productImages.find((el) => el.main) || product.productImages[0]

          return product
        }),
      )
      setRecommendProducts(result)
    } catch (error) {
      console.error('Error fetching recommended products')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRecommendProducts()
  }, [pageNumber])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false)
  //   }, 1000)

  //   return () => clearTimeout(timer)
  // }, [recommendProducts])

  const handlePrev = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1)
    }
  }

  const handleNext = () => {
    if (recommendProducts.length >= 6) setPageNumber(pageNumber + 1)
  }

  return (
    <div className='lg:mt-10 mt-6 lg:max-w-7xl mx-auto lg:px-0 px-4 w-full'>
      <div className='font-bold lg:text-bigPrdName text-largerPrdName my-6'>{t('titleSuggest')}</div>
      <div className='relative'>
        <div className='lg:grid lg:grid-cols-3 gap-6 lg:pb-0 pb-4 lg:overflow-hidden overflow-x-auto flex'>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className='flex lg:w-[406px] w-[386px] lg:min-h-[200px] min-h-[50px] lg:gap-6 gap-4 mx-auto'
                >
                  <Skeleton.Image className='w-[162px] lg:h-[240px] rounded-lg' />
                  <div className='flex flex-col justify-between lg:w-[220px] w-44'>
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </div>
                </div>
              ))
            : recommendProducts.map((product, index) => {
                const arrCheck = ['detail', 'product']
                const mainImage = product.productImages.find((image) => image.main === true)
                const productImage = product.productImages.find((image) => image.imageType === 'product')
                const imageToShow = mainImage || productImage
                const imageUrl = imageToShow?.imageUrl || ''
                const isImageMatched = arrCheck.some((prefix) => imageUrl?.startsWith(prefix))
                const finalImageUrl = isImageMatched ? `${c.DOMAIN_IMG}${imageUrl}` : imageUrl

                // Kiểm tra promotion có chứa loại 'ship'
                const hasFreeShip = product.promotions?.some((promotion) => promotion.type === 'ship')

                return (
                  <div
                    key={product.id}
                    className='flex lg:w-[406px] w-[386px] lg:gap-6 gap-4 mx-auto hover:shadow-lg hover:bg-[#F7F7F1] hover:rounded-lg'
                  >
                    <div className='relative'>
                      <Link to={`/product/${product.id}`}>
                        <div className='lg:w-[162px] lg:h-[240px] w-[120px] h-[140px]'>
                          <img
                            // src={`${c.DOMAIN_IMG}${product.imageMain.imageUrl}`}
                            src={finalImageUrl}
                            alt={`image`}
                            className='h-full w-full object-cover rounded-lg'
                            loading='lazy'
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = ImageError
                            }}
                          />
                        </div>
                      </Link>
                      {/* <div
                        className='flex w-[30px] h-[30px] bg-[#28282899] rounded-full justify-center items-center absolute top-2 right-2 z-20 cursor-pointer'
                        onClick={() => handleWishlistClick(product.id, product.wishList)}
                      >
                        <img
                          src={Object.keys(product).length > 0 && product?.wishList ? IconHeartActive : IconHeart}
                          alt='icon heart'
                        />
                      </div> */}
                    </div>
                    <Link to={`/product/${product.id}`} className='flex justify-between'>
                      <div className='flex flex-col justify-between lg:w-[220px] py-2 w-44'>
                        <div className='flex flex-col gap-2'>
                          <div className='font-semibold lg:text-textPrd text-primaryPrdName'>
                            <Tooltip title={product.productName}>
                              <span className='block truncate w-full'>{product?.productName}</span>
                            </Tooltip>
                          </div>

                          <div className='text-normal text-[#8C8C8C]'>
                            {product.description && product.description.length > 10
                              ? `${product?.generalDescription?.substring(0, 12)}...`
                              : product.generalDescription}
                          </div>
                          {/* <div className='flex items-start'>
                    <img src={IconStar} alt='icon star' />
                    <div className='font-medium text-normal'>
                      {product.reviewCount}
                      <span className='text-[#8C8C8C]'>(200)</span>
                    </div>
                  </div> */}
                          <div className='text-normal font-medium flex items-center gap-2'>
                            {recommendProducts[index]?.promotions &&
                            recommendProducts[index]?.promotions.some((e) => e.type === 'sale') ? (
                              recommendProducts[index]?.promotions.map((e) => {
                                if (e.type === 'sale') {
                                  const discountedPrice = Math.floor(
                                    recommendProducts[index]?.price * (1 - e.discountPercent / 100),
                                  )

                                  return (
                                    <div key={e.id}>
                                      <div className='flex flex-col'>
                                        <div className='flex items-center gap-2'>
                                          <span className='font-bold text-primaryPrdName text-[#3B3B3B]'>
                                            {formatPrice(discountedPrice)}
                                          </span>
                                          <span className='font-bold text-small text-[#8C8C8C]'>
                                            {unit !== 'KRW'
                                              ? '/' +
                                                ' ' +
                                                formatPriceMultilingual(
                                                  discountedPrice * recommendProducts[index]?.exChangeRate,
                                                  unit,
                                                )
                                              : null}
                                          </span>
                                          <span className='w-[48px] h-[22px] bg-[#2DC033] text-white text-small rounded-full flex justify-center items-center ml-1'>
                                            -{e.discountPercent}%
                                          </span>
                                        </div>

                                        <div className='flex items-center gap-1'>
                                          <div>
                                            <span className='text-[#3B3B3B] font-medium text-small line-through'>
                                              {formatPrice(recommendProducts[index]?.price)}
                                            </span>
                                            <span className='font-medium text-small text-[#8C8C8C] line-through'>
                                              {unit !== 'KRW'
                                                ? '/' +
                                                  ' ' +
                                                  formatPriceMultilingual(
                                                    recommendProducts[index]?.price *
                                                      recommendProducts[index]?.exChangeRate,
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
                              <div>
                                <span className='font-bold text-primaryPrdName text-[#3B3B3B]'>
                                  {formatPrice(recommendProducts[index]?.price)}
                                </span>
                                <span className='font-bold text-small text-[#8C8C8C]'>
                                  {unit !== 'KRW'
                                    ? '/' +
                                      ' ' +
                                      formatPriceMultilingual(
                                        recommendProducts[index]?.price * recommendProducts[index]?.exChangeRate,
                                        unit,
                                      )
                                    : null}
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
                        {/* <div className='flex gap-1'>
                    <div className='text-[#768CD6] w-[63px] h-[22px] px-1 py-2 bg-[#EFEFEF] text-min flex justify-center items-center'>
                      무료배송
                    </div>
                    <div className='text-[#E780DC] w-[63px] h-[22px] px-1 py-2 bg-[#EFEFEF] text-min flex justify-center items-center'>
                      무료배송
                    </div>
                  </div> */}
                      </div>
                    </Link>
                  </div>
                )
              })}
        </div>
        <div className='lg:block hidden'>
          <button className='carousel-button prev h-12 w-12 flex justify-center items-center' onClick={handlePrev}>
            <img src={IconLeft} alt='left arrow' className='w-6 h-6' />
          </button>
          <button className='carousel-button next h-12 w-12 flex justify-center items-center' onClick={handleNext}>
            <img src={IconRight} alt='right arrow' className='w-6 h-6' />
          </button>
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
