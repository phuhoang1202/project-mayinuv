import React, { useEffect, useState } from 'react'
import IconHeartActive from '@assets/images/IconHeartActive.svg'
import IconHeart from '@assets/images/IconHeart.svg'
import IconStar from '@assets/images/IconStar.svg'
import IconLeft from '@assets/images/IconLeft.svg'
import IconRight from '@assets/images/IconRight.svg'
import { constants as c } from '@constants'
import { product } from '@services/user/product'
import { Link, useNavigate } from 'react-router-dom'
import { getToken, getUserInfor } from '@utils/auth'
import { Modal, Skeleton, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { formatPrice, formatPriceMultilingual } from '@utils/index'
import ImageError from '@assets/images/ImageError.svg'

export default function ProductNew() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState(0)
  const [items, setItems] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [dataCategory, setDataCategory] = useState([])
  const [category, setCategory] = useState(0)
  const [loading, setLoading] = useState(false)
  const getUserId = JSON.parse(getUserInfor() || null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 375)
  const navigate = useNavigate()
  // const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language')) || 'ko')

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

  const [unit, setUnit] = useState('KRW')

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    // const getLanguage = JSON.parse(localStorage.getItem('language')) || ''
    // setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [])

  const fetchCategory = async () => {
    try {
      const response = await product.getProductByAllParent()
      const result = await Promise.all(
        response.data.map(async (cate) => {
          cate.name = cate.name.charAt(0).toUpperCase() + cate.name.slice(1)
          return cate
        }),
      )
      setCategory(response.data[0].id)
      setDataCategory(result)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProductsNew = async (categoryId) => {
    try {
      setLoading(true)
      const response = await product.getProductByType({
        type: 'new_product',
        currency: unit,
        pageNumber: pageNumber,
        pageSize: 4,
        userId: getUserId?.id,
        sort: 'id',
        sortBy: 'desc',
        // language,
        categoryId: categoryId,
      })
      const result = await Promise.all(
        response.data.content.map(async (product) => {
          product.imageMain = product?.productImages.find((el) => el.main) || product.productImages[0]
          return product
        }),
      )
      setItems(result)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  useEffect(() => {
    if (category !== 0) {
      fetchProductsNew(category)
    }
  }, [category, pageNumber])

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

  // const handlePrev = () => {
  //   const newItems = [...items]
  //   const lastItem = newItems.pop()
  //   newItems.unshift(lastItem)
  //   setCurrentIndex(0)
  //   setItems(newItems)
  // }

  // const handleNext = () => {
  //   const newItems = [...items]
  //   const firstItem = newItems.shift()
  //   newItems.push(firstItem)
  //   setCurrentIndex(0)
  //   setItems(newItems)
  // }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
    } else if (pageNumber > 0) {
      setPageNumber((prevPage) => prevPage - 1)
      setCurrentIndex(3) // Chuyển đến sản phẩm cuối của trang trước
    } else {
      const newItems = [...items]
      const lastItem = newItems.pop() // Lấy phần tử cuối cùng
      newItems.unshift(lastItem) // Đưa phần tử cuối lên đầu
      setItems(newItems)
      setCurrentIndex(0) // Đặt lại index là 0
    }
  }

  const handleNext = () => {
    if (currentIndex < 3) {
      // Chỉ số hiện tại nhỏ hơn số lượng sản phẩm hiển thị trên trang
      setCurrentIndex((prevIndex) => prevIndex + 1)
    } else {
      // Khi next hết 4 sản phẩm thì chuyển sang trang mới
      if (items.length === 4) {
        setPageNumber((prevPage) => prevPage + 1)
        setCurrentIndex(0) // Reset lại index ở trang mới
      } else {
        const newItems = [...items]
        const firstItem = newItems.shift() // Lấy phần tử đầu tiên
        newItems.push(firstItem) // Đưa phần tử đầu xuống cuối
        setItems(newItems)
        setCurrentIndex(0) // Đặt lại index là 0
      }
    }
  }

  const handleCategoryClick = (index, categoryId) => {
    setActiveCategory(index)
    setCategory(categoryId)
  }

  // Hàm xử lý yêu thích
  const handleWishlistClick = async (productId, currentWishListStatus) => {
    if (!token) {
      setOpenModal(true)
    } else {
      try {
        await addToWishList(productId)

        setItems((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, wishList: !currentWishListStatus } : product,
          ),
        )
      } catch (error) {
        console.error('Error updating wishlist', error)
      }
    }
  }

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className='lg:mt-10 mt-7 py-2 bg-[#F7F7F1] lg:px-0 px-4 relative'>
      <div className='font-bold lg:text-bigPrdName text-largerPrdName text-[#282828] mt-5 lg:max-w-7xl mx-auto'>
        {t('titleNew')}
      </div>

      <div>
        <div className='lg:mt-10 mt-4 lg:max-w-7xl w-full mx-auto '>
          <ul className='flex flex-nowrap items-center gap-1 overflow-x-auto overflow-y-hidden'>
            {dataCategory &&
              dataCategory.length > 0 &&
              dataCategory?.map((e, i) => (
                <div key={i} onClick={() => handleCategoryClick(i, e.id)} className='cursor-pointer lg:h-auto pb-2'>
                  <li
                    className={`${
                      activeCategory === i
                        ? 'bg-[#D1B584] text-white font-semibold lg:text-primaryPrdName text-normal'
                        : 'text-[#8C8C8C] font-medium lg:text-primaryPrdName text-normal border bg-white'
                    } px-2 min-w-[106px] flex justify-center items-center h-10 transition-all duration-100 rounded-full`}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {e.name}
                  </li>
                </div>
              ))}
          </ul>
        </div>

        {/* Phần carousel */}
        <div className=' lg:max-w-7xl mx-auto lg:mb-10 relative'>
          {loading ? (
            <div className='flex'>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className='flex flex-col items-center lg:w-[406px] w-[206px] gap-4 mx-auto'>
                  <Skeleton.Image className='flex gap-4 w-[162px] h-[150px] rounded-lg' />
                  <div className='flex justify-between w-full'>
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='carousel-container mt-7 overflow-hidden'>
              <div className='flex transition-transform duration-300 gap-2 lg:gap-4 justify-between lg:h-[400px] h-[300px]'>
                {items && items.length > 0 ? (
                  items.map((item, index) => {
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
                      <div
                        key={item.id}
                        className='flex-none'
                        style={{
                          width: isSmallMobile
                            ? index === currentIndex % items.length
                              ? '95px' // Kích thước nhỏ hơn cho item chính
                              : '50px' // Kích thước nhỏ hơn cho các item khác
                            : isMobile
                            ? index === currentIndex % items.length
                              ? '160px' // Kích thước trung bình cho item chính
                              : '70px' // Kích thước trung bình cho các item khác
                            : index === currentIndex % items.length
                            ? '642px' // Kích thước gốc trên PC
                            : '187px',
                        }}
                      >
                        <div className='relative lg:h-[280px] h-[200px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer'>
                          <img
                            src={finalImageUrl}
                            alt={item.productName}
                            className='object-cover w-full h-full'
                            loading='lazy'
                            onClick={() => navigate(`/product/${item.id}`)}
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = ImageError
                            }}
                          />
                        </div>

                        <div className='flex flex-col gap-1 justify-between mt-2 lg:h-36 h-28'>
                          <div>
                            <div
                              className='font-medium lg:text-textPrd text-primaryPrdName cursor-pointer'
                              onClick={() => navigate(`/product/${item.id}`)}
                            >
                              <Tooltip title={item.productName}>
                                <span className='block truncate w-full'>{item.productName}</span>
                              </Tooltip>
                            </div>
                            <div className='flex flex-col gap-1 mt-1'>
                              {/* <div className='flex items-center gap-1'>
                        <img src={IconStar} alt='icon star' />
                        <div className='text-normal font-medium'>
                          4.8 <span className='text-[#8C8C8C]'>(1.230)</span>
                        </div>
                      </div> */}
                              <div className='text-normal font-medium flex items-center gap-2 mt-2'>
                                {item?.promotions && item?.promotions.some((e) => e.type === 'sale') ? (
                                  item?.promotions.map((e) => {
                                    if (e.type === 'sale') {
                                      const discountedPrice = Math.floor(item?.price * (1 - e.discountPercent / 100))
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
                                                    formatPriceMultilingual(discountedPrice * item.exChangeRate, unit)
                                                  : null}
                                              </span>
                                              <span className='w-[48px] h-[22px] bg-[#2DC033] text-white text-small rounded-full flex justify-center items-center pl-1'>
                                                -{e.discountPercent}%
                                              </span>
                                            </div>

                                            <div className='flex gap-1'>
                                              <span className='text-[#3B3B3B] font-medium text-small line-through'>
                                                {formatPrice(item?.price)}
                                              </span>
                                              <span className='font-medium text-small text-[#8C8C8C] line-through'>
                                                {unit !== 'KRW'
                                                  ? '/' +
                                                    ' ' +
                                                    formatPriceMultilingual(item?.price * item.exChangeRate, unit)
                                                  : null}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    }
                                    return null
                                  })
                                ) : (
                                  <div>
                                    <span className='font-bold sm:text-small md:text-normal lg:text-primaryPrdName  text-[#3B3B3B]'>
                                      {formatPrice(item?.price)}
                                    </span>
                                    <span className='font-bold text-min sm:text-min md:text-small lg:text-small text-[#8C8C8C]'>
                                      {unit !== 'KRW'
                                        ? '/' + ' ' + formatPriceMultilingual(item?.price * item.exChangeRate, unit)
                                        : null}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='px-2 max-w-32'>
                            {hasFreeShip && (
                              <span className='text-[#6E89E7] min-w-[64px] h-6 px-1 py-2 bg-[#EFEFEF] text-min flex justify-center items-center'>
                                {t('freeShipTag')}
                              </span>
                            )}
                          </div>
                          {/* <div className='flex gap-1 mt-1'>
                        <div className='text-[#768CD6] w-[63px] h-[22px] px-1 py-2 bg-[#EFEFEF] text-min flex justify-center items-center'>
                          무료배송
                        </div>
                        <div className='text-[#E780DC] w-[63px] h-[22px] px-1 py-2 bg-[#EFEFEF] text-min flex justify-center items-center'>
                          무료배송
                        </div>
                      </div> */}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className='font-semibold text-primaryPrdName text-[#3B3B3B] flex justify-center items-center'>
                    {t('noProduct')}
                  </div>
                )}
              </div>
            </div>
          )}

          {items && items.length > 0 ? (
            <div>
              <button
                className='carousel-button prev lg:h-12 lg:w-12 h-10 w-10 flex justify-center items-center'
                onClick={handlePrev}
              >
                <img src={IconLeft} alt='left arrow' className='lg:w-6 lg:h-6 w-2 h-2' />
              </button>
              <button
                className='carousel-button next lg:h-12 lg:w-12 h-10 w-10 flex justify-center items-center'
                onClick={handleNext}
              >
                <img src={IconRight} alt='right arrow' className='lg:w-6 lg:h-6 w-2 h-2' />
              </button>
            </div>
          ) : (
            <div></div>
          )}
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
