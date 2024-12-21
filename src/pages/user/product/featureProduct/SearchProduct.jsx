import CustomPagination from '@components/customPagination/CustomPagination'
import Loading from '@components/loadingCommon/Loading'
import Product from '@components/product/Product'
import { product } from '@services/user/product'
import { getUserInfor } from '@utils/auth'
import { Toast } from '@utils/toast'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

export default function SearchProduct() {
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
  const [dataProduct, setDataProduct] = useState([])
  // const [language, setLanguage] = useState('ko')
  const getUserId = JSON.parse(getUserInfor() || null)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()
  const [unit, setUnit] = useState('KRW')
  const [searchParams] = useSearchParams()
  const [totalProduct, setTotalProduct] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSize, setCurrentSize] = useState(15)

  const query = searchParams.get('query')

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    // const getLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'
    // setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [unit])

  const fetchDataProducts = async () => {
    try {
      setIsLoading(true)
      const response = await product.getProductByType({
        type: null,
        currency: unit,
        pageNumber: currentPage - 1,
        pageSize: 15,
        userId: getUserId?.id,
        name: query || '',
        // language,
        sort: '',
        sortBy: 'desc',
      })
      const result = await Promise.all(
        response.data.content.map(async (product) => {
          product.imageMain = product.productImages.find((el) => el.main) || product.productImages[0]
          return product
        }),
      )
      setDataProduct(result)
      setTotalProduct(response.data.totalElements)
    } catch (error) {
      console.error('Error fetching recommended products')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDataProducts()
  }, [query, unit, currentPage])

  // Yêu thích
  const addToWishList = async (productId) => {
    const bodyPayload = {
      userId: getInfonUser.id,
      productId: productId,
    }
    try {
      await product.wishListPrd(bodyPayload)
      await fetchDataProducts()
      Toast.success('찜 목록에 추가했습니다.')
    } catch (error) {
      console.error('위시리스트에 추가 실패')
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className='mx-auto max-w-7xl mt-24'>
      {isLoading && <Loading />}

      <div>
        <div className='font-medium text-normal'>
          <span className='text-[#B5955E] text-primaryPrdName font-bold'>{totalProduct}</span> results found for{' '}
          <span className='text-[#B5955E] text-primaryPrdName font-bold'>'{query}'</span>
        </div>
        {/* List Product */}
        <div className='mt-8'>
          {/* {loading && <Loading />} */}
          {dataProduct && dataProduct.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
              {dataProduct.map((item, index) => (
                <div key={index}>
                  <Product
                    item={item}
                    index={index}
                    addToWishList={addToWishList}
                    setDataProduct={setDataProduct}
                    type={'search'}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='text-primaryPrdName font-bold flex justify-center'>{t('noSearchResults')}</div>
          )}
        </div>
      </div>
      {/* Phân trang */}
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
