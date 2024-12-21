import React, { useEffect } from 'react'
import BackRightIcon from '@assets/icons/BackRightIcon'
import ClockIcon from '@assets/icons/ClockIcon'
import FlashDealImg from '@assets/images/productImages/Rectangle62.jpg'
import Loading from '@components/loadingCommon/Loading'
import { constants as c } from '@constants'
import ProductCard from '@components/cards/ProductCard'
import CountdownTimer from '@components/CountdownTimer'
import FlashDealCard from '@components/cards/FlashDealCard'
import PrimaryButton from '@components/buttons/PrimaryButton'
import { useNavigate } from 'react-router-dom'
import { useProductStore } from '@store/user/productStore'
import { useUserStore } from '@store/user/userStore'

export default function RecommendProducts() {
  const navigate = useNavigate()
  const initialTime = new Date()
  initialTime.setHours(initialTime.getHours() + 24) // Set the initial time to 24 hours from now
  const { allPrds, loadingGetAllPrd, getAllPrds } = useProductStore()
  const { getCurrentUserInfo } = useUserStore()

  useEffect(() => {
    getAllPrds()
    getCurrentUserInfo() // to get user id
  }, [navigate])

  return (
    <div className='bg-white '>
      {/* list prd */}
      <div className='mt-10 pb-8 p-5'>
        <div className='flex justify-between items-center'>
          <div className=''>
            <p className='font-bold text-[22px] mb-2'>상품</p>
            <p className='text-small'>재구매가 많은 상품</p>
          </div>
          <BackRightIcon className='cursor-pointer ' />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-y-12 gap-x-4 sm:gap-x-12 sm:gap-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 p-5'>
        {allPrds?.length > 0 ? (
          allPrds.map((prd, index) => (
            <ProductCard
              id={prd.id}
              key={index}
              name={prd.productName}
              discount={prd.promotions?.find((promo) => promo.type === 'sale')?.discountPercent || 0}
              price={prd.price}
              linkImg={prd.productImages[0]?.imageUrl ? `${c.DOMAIN_IMG}${prd.productImages[0].imageUrl}` : null}
              promotion={prd.promotions}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>

      {/* flash deal */}
      <div className='bg-top bg-hero py-8 sm:py-20 lg:py-32'>
        <div className='py-8 bg-white h-fit p-5'>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-[22px]'>오늘의 특가</span>
            <PrimaryButton rounded large black leftIcon={ClockIcon}>
              <CountdownTimer initialTime={initialTime} className='text-[17px]' />
            </PrimaryButton>
          </div>
          <div className='my-8 sm:my-16'>
            <FlashDealCard
              name='코퍼주전자'
              desc='적정한 온도의 물을 고르게 분사해주는 드립커피를 위한 필수 아이템'
              discount='10%'
              price='177777'
              linkImg={FlashDealImg}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
