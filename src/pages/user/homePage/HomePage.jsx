import Advertisement from '@components/advertisement/Advertisement'
import BestProduct from '@components/bestProduct/BestProduct'
import ProductNew from '@components/product/ProductNew'
import ProductSuggest from '@components/product/ProductSuggest'
import CarouselCommon from '@components/carousel/CarouselCommon'
import { product } from '@services/user/product'
import { getUserInfor } from '@utils/auth'
import { Toast } from '@utils/toast'
import { useTranslation } from 'react-i18next'
import Category from '@components/category/Category'
import Banner1 from '@assets/images/carouselBanner/Banner1.png'
import Banner6 from '@assets/images/carouselBanner/Banner6.svg'
import Banner7 from '@assets/images/carouselBanner/Banner7.svg'
import Banner8 from '@assets/images/carouselBanner/Banner8.svg'
import Banner9 from '@assets/images/carouselBanner/Banner9.svg'
import Banner10 from '@assets/images/carouselBanner/Banner10.svg'

export default function HomePage() {
  const { t } = useTranslation()
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

  // Hàm thêm sản phẩm vào danh sách yêu thích
  const addToWishList = async (productId) => {
    try {
      const bodyPayload = {
        userId: getInfonUser.id,
        productId: productId,
      }
      await product.wishListPrd(bodyPayload)
      Toast.success('찜 목록에 추가했습니다.')
    } catch (error) {
      console.error('위시리스트에 추가 실패')
    }
  }

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

  return (
    <div className='lg:mt-24 mt-14'>
      <CarouselCommon items={items} />
      <Category />
      <ProductSuggest />
      <ProductNew />
      <BestProduct />
      {/* <Advertisement /> */}
    </div>
  )
}
