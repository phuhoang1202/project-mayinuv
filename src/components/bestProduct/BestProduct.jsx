import Product from '@components/product/Product'
import React, { useEffect, useState } from 'react'
import Rating1 from '@assets/images/Rating1.svg'
import Rating2 from '@assets/images/Rating2.svg'
import Rating3 from '@assets/images/Rating3.svg'
import IconLeft from '@assets/images/IconLeft.svg'
import IconRight from '@assets/images/IconRight.svg'
import { product } from '@services/user/product'
import { getUserInfor } from '@utils/auth'
import { useTranslation } from 'react-i18next'

export default function BestProduct({ addToWishList }) {
  const ratings = [Rating1, Rating2, Rating3]
  let arrayRatings = []
  const [pageNumber, setPageNumber] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [bestProducts, setBestProducts] = useState([])
  const getUserId = JSON.parse(getUserInfor() || null)
  // const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('language')) || 'ko')

  const { t } = useTranslation()

  const [unit, setUnit] = useState(JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW')

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    // const getLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'
    // setLanguage(getLanguage)
    setUnit(getUnitLocal)
  }, [])

  const fetchBestProducts = async () => {
    try {
      setIsLoading(true)
      const response = await product.getProductByType({
        type: 'best',
        currency: unit,
        pageNumber: pageNumber,
        pageSize: 10,
        userId: getUserId?.id,
        // language,
        sort: 'price',
        sortBy: 'desc',
      })
      const result = await Promise.all(
        response.data.content.map(async (product) => {
          product.imageMain = product?.productImages.find((el) => el.main) || product.productImages[0]
          return product
        }),
      )
      setBestProducts(result)
    } catch (error) {
      console.error('Error fetching recommended products')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (unit) {
      fetchBestProducts()
    }
  }, [pageNumber, unit])

  if (Array.isArray(bestProducts) && bestProducts.length > 3) {
    for (let i = 3; i <= bestProducts.length; i++) {
      arrayRatings.push(i)
    }
  }

  const combinedArray = [...ratings, ...arrayRatings]

  const handlePrev = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1)
    }
  }

  const handleNext = () => {
    if (bestProducts && bestProducts.length > 4) {
      setPageNumber(pageNumber + 1)
    }
  }

  return (
    <div className='mt-10 lg:max-w-7xl mx-auto lg:px-0 px-4 w-full'>
      <div className='font-bold lg:text-bigPrdName text-largerPrdName'>{t('titleBest')}</div>
      <div className='mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:grid-cols-5 relative'>
        {bestProducts?.map((item, index) => (
          <div key={index}>
            <Product
              item={item}
              type={'best'}
              setBestProducts={setBestProducts}
              combinedArray={combinedArray}
              index={index}
              addToWishList={addToWishList}
            />
          </div>
        ))}

        {/* <div className='flex justify-between mt-4'>
          <button
            className='carousel-button lg:h-12 lg:w-12 h-10 w-10 prev flex justify-center items-center'
            onClick={handlePrev}
          >
            <img src={IconLeft} alt='left arrow' className='w-6 h-6' />
          </button>
          <button
            className='carousel-button lg:h-12 lg:w-12 h-10 w-10 next flex justify-center items-center'
            onClick={handleNext}
          >
            <img src={IconRight} alt='right arrow' className='w-6 h-6' />
          </button>
        </div> */}
      </div>
    </div>
  )
}
