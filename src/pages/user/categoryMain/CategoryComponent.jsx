import CarouselCommon from '@components/carousel/CarouselCommon'
import Loading from '@components/loadingCommon/Loading'
import { category } from '@services/admin/category'
import { Toast } from '@utils/toast'
import React, { useEffect, useState } from 'react'
import { Select, Space } from 'antd'
import { product } from '@services/user/product'
import Product from '@components/product/Product'
import { getUserInfor } from '@utils/auth'
import { useLocation } from 'react-router-dom'
import CustomPagination from '@components/customPagination/CustomPagination'

import Banner1 from '@assets/images/carouselBanner/Banner1.png'
import Banner6 from '@assets/images/carouselBanner/Banner6.svg'
import Banner7 from '@assets/images/carouselBanner/Banner7.svg'
import Banner8 from '@assets/images/carouselBanner/Banner8.svg'
import Banner9 from '@assets/images/carouselBanner/Banner9.svg'
import Banner10 from '@assets/images/carouselBanner/Banner10.svg'
import { useTranslation } from 'react-i18next'

export default function CategoryComponent() {
  const { t } = useTranslation()
  const [dataCategory, setDataCategory] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSize, setCurrentSize] = useState(15)
  const [totalProduct, setTotalProduct] = useState(0)
  // Category Children
  const [selectedChildId, setSelectedChildId] = useState(0)
  const [selectedActive, setSelectedActive] = useState(-1)
  // Data product
  const [dataProduct, setDataProduct] = useState([])
  // Active Category router
  const location = useLocation()
  const [optionSelect, setOptionSelect] = useState('')
  const [optionSort, setOptionSort] = useState('desc')

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

  // banner Img
  const items = [
    {
      image: Banner1,
      title1: `${t('bannerTitle1')}`,
      text: `${t('bannerText')}`,
    },
    // {
    //   image: Banner6,
    //   title1: `${t('bannerTitle1')}`,
    //   text: `${t('bannerText')}`,
    // },
    // {
    //   image: Banner7,
    //   tag: 'tag',
    //   title1: `${t('bannerTitle1')}`,
    //   text: `${t('bannerText')}`,
    // },
    // {
    //   image: Banner8,
    //   title1: `${t('bannerTitle1')}`,
    //   text: `${t('bannerText')}`,
    // },
    // {
    //   image: Banner9,
    //   title1: `${t('bannerTitle1')}`,
    //   text: `${t('bannerText')}`,
    // },
    {
      image: Banner10,
      title1: `${t('bannerTitle2')}`,
      text: `${t('bannerText2')}`,
    },
  ]

  // Select
  const handleChange = (value) => {
    setOptionSelect(value)
    if (value === 'asc' || value === 'desc') {
      setOptionSort(value)
      setOptionSelect('price')
    }
  }

  const getUserId = JSON.parse(getUserInfor() || null)
  const [unit, setUnit] = useState(JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW')

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    setUnit(getUnitLocal)
  }, [])

  useEffect(() => {
    // Kiểm tra nếu có state được truyền qua router
    if (location.state?.activeIndex !== undefined) {
      setActiveIndex(location.state.activeIndex)
      setSelectedChildId(location.state.idCategory)
    }
  }, [location.state])

  const getDataCategory = async () => {
    try {
      setLoading(true)
      const response = await category.getAllCategory()
      setDataCategory(response.data)
    } catch (error) {
      Toast.error('카테고리 데이터 검색에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDataCategory()
  }, [])

  const handleChangeParent = (category, index) => {
    setActiveIndex(index)
    setSelectedChildId(category.id)
    setSelectedActive(-1)
  }

  const handleClickCategoryChild = (childCategory) => {
    setSelectedChildId(childCategory === -1 ? dataCategory[activeIndex].id : childCategory.id)
    setSelectedActive(childCategory === -1 ? -1 : childCategory.id)
    setCurrentPage(1)
  }

  const getListDataProduct = async () => {
    try {
      setLoading(true)
      const bodyPayload = {
        categoryId: selectedChildId,
        pageNumber: currentPage - 1,
        pageSize: 15,
        sort: optionSelect,
        sortBy: optionSort,
        type: null,
        currency: unit,
        userId: getUserId && getUserId?.id,
      }

      const response = await product.getProductByType(bodyPayload)
      setDataProduct(response.data.content)
      setTotalProduct(response.data.totalElements)
    } catch (error) {
      Toast.error('카테고리 데이터 검색에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // Hàm thêm sản phẩm vào danh sách yêu thích
  const addToWishList = async (productId) => {
    const bodyPayload = {
      userId: getInfonUser.id,
      productId: productId,
    }
    try {
      await product.wishListPrd(bodyPayload)
      await getListDataProduct()
      Toast.success('찜 목록에 추가했습니다.')
    } catch (error) {
      Toast.error('위시리스트에 추가 실패')
    }
  }

  // useEffect(() => {
  //   // Khi activeIndex thay đổi, chọn mặc định phần tử đầu tiên của danh mục con
  //   if (dataCategory[activeIndex]?.categories?.length > 0) {
  //     setSelectedChildId(dataCategory[activeIndex].categories[0].id)
  //   }
  // }, [activeIndex, dataCategory])

  useEffect(() => {
    getListDataProduct()
  }, [selectedChildId, currentPage, optionSelect, optionSort])

  // Phân trang
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className='mx-auto max-w-7xl lg:mt-24 mt-20'>
      {/* Category Parent */}
      <div>
        {dataCategory && (
          <div className='flex flex-nowrap items-center overflow-x-auto overflow-y-hidden lg:px-0 px-2 lg:pb-0 pb-2'>
            {/* Các danh mục khác */}
            {dataCategory.map((categoryParent, index) => {
              return (
                <div style={{ whiteSpace: 'nowrap' }}>
                  <button
                    key={index}
                    className={`px-2 min-w-20 flex justify-center items-center h-10 transition-all duration-100 rounded-full capitalize ${
                      activeIndex === index ? 'text-white bg-[#D1B584] font-semibold' : 'text-[#8C8C8C] font-medium '
                    }`}
                    onClick={() => handleChangeParent(categoryParent, index)}
                  >
                    {categoryParent.name}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* CarouselCommon */}
      <CarouselCommon items={items} />

      {/* Category Children */}
      <div className='mt-8'>
        <div className='mt-8 flex items-center justify-between overflow-x-auto overflow-y-hidden lg:px-0 px-2 lg:pb-0 pb-2'>
          <div className='flex items-center gap-[2px]'>
            <button
              onClick={() => handleClickCategoryChild(-1)}
              className={`min-w-10 px-4 h-10 font-medium rounded-full transition-all duration-75 ${
                selectedActive === -1
                  ? 'bg-[#EFEFEF] text-[#3B3B3B] font-semibold'
                  : 'bg-white text-primaryPrdName text-[#8C8C8C]'
              }`}
            >
              All
            </button>

            {dataCategory[activeIndex]?.categories.map((childCategory) => (
              <button
                key={childCategory.id}
                style={{ whiteSpace: 'nowrap' }}
                onClick={() => handleClickCategoryChild(childCategory)}
                className={`min-w-10 px-4 h-10 font-medium rounded-full transition-all duration-75  ${
                  selectedActive === childCategory.id
                    ? 'bg-[#EFEFEF] text-[#3B3B3B] font-semibold'
                    : 'bg-white text-primaryPrdName text-[#8C8C8C]'
                }`}
              >
                {childCategory.name}
              </button>
            ))}
          </div>

          <div>
            <Select
              defaultValue={`${t('sortByPopularity')}`}
              className='h-12'
              style={{
                width: 147,
              }}
              onChange={handleChange}
              options={[
                { value: 'wishlist', label: `${t('sortByPopularity')}` },
                { value: 'createdDate', label: `${t('sortByRecent')}` },
                { value: 'asc', label: `${t('sortByPriceASC')}` },
                { value: 'desc', label: `${t('sortByPriceDESC')}` },
                { value: 'quantity', label: `${t('sortByPriceQuantity')}` },
              ]}
            />
          </div>
        </div>
      </div>

      {/* List Product */}
      <div className='mt-8 lg:px-0 px-2'>
        <div>
          {loading && <Loading />}
          {dataProduct && dataProduct.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
              {dataProduct.map((item, index) => (
                <div key={index}>
                  <Product
                    item={item}
                    index={index}
                    addToWishList={addToWishList}
                    setDataCategory={setDataCategory}
                    type={'category'}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='text-primaryPrdName font-bold flex justify-center'>{t('noProduct')}</div>
          )}
        </div>
      </div>

      {/* Panigation */}
      {dataProduct && dataProduct.length > 0 && (
        <div className='mt-8'>
          <CustomPagination
            totalItems={totalProduct}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            currentSize={currentSize}
          />
        </div>
      )}
    </div>
  )
}
