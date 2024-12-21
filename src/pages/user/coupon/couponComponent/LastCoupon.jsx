import React, { useEffect, useState } from 'react'
import CouponNumber from '@assets/images/coupon/CouponNumber.svg'
import CouponPercent from '@assets/images/coupon/CouponPercent.svg'
import CouponPercentExpired from '@assets/images/coupon/CouponPercentExpired.svg'
import CouponPrice from '@assets/images/coupon/CouponPrice.svg'
import CouponPriceExpired from '@assets/images/coupon/CouponPriceExpired.svg'
import { coupon } from '@services/user/coupon'
import { Toast } from '@utils/toast'

export default function LastCoupon() {
  const [dataCoupon, setDataCoupon] = useState([])
  useEffect(() => {
    const getCouponStatus = async () => {
      try {
        const response = await coupon.getAllCouponStatus()
        setDataCoupon(response.data)
      } catch (error) {
        Toast.error('쿠폰 데이터 검색 오류')
      }
    }

    getCouponStatus()
  }, [])

  return (
    <div>
      {dataCoupon && dataCoupon.length > 0 ? (
        dataCoupon.map((coupon, index) => (
          <div key={index}>
            <div className='relative w-[312px]'>
              <img src={coupon.discountType === 'percentage' ? CouponPercentExpired : CouponPriceExpired} alt='icon' />
              <div
                className={`${
                  coupon.discountType === 'percentage' ? 'absolute top-4 left-6' : 'absolute top-4 left-4'
                } w-[189px] text-center`}
              >
                <div className='flex flex-col items-center text-[#3B3B3B]'>
                  <div
                    className={`${
                      coupon.discountType === 'percentage' ? 'text-[#707070]' : 'text-[#8C8C8C]'
                    } font-bold text-textPrd`}
                  >
                    {coupon.discountType === 'fixed' ? '할인쿠폰 구매' : '무료 배송'}
                  </div>
                  <div
                    className={`${
                      coupon.discountType === 'percentage' ? 'text-[#8C8C8C]' : 'text-[#8C8C8C]'
                    } font-bold text-bigPrdName`}
                  >
                    {coupon.discountType === 'percentage'
                      ? `-${coupon.discountValue}%`
                      : `-${coupon.discountValue} KRW`}
                  </div>
                  <div className='text-[10px] font-medium text-[#8C8C8C]'>
                    최소 주문 금액: {coupon.minOrderValue} 원
                  </div>
                  <div className='text-[10px] font-medium text-[#8C8C8C]'>
                    유효기간: {new Date(coupon.startDate).toLocaleDateString()} -
                    {new Date(coupon.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Mã ID */}
              <div
                className={`${
                  coupon.discountType === 'percentage'
                    ? 'transform rotate-90 text-[#AFAEAE] top-12 right-6 absolute font-bold'
                    : 'text-[#3B3B3B] absolute top-14 right-8 font-medium'
                }  text-center text-small`}
              >
                <div>{coupon.code.slice(0, 3)}</div>
                <div>{coupon.code.slice(3)}</div>
              </div>

              {/* Số lượng */}
              <div className='absolute top-5 right-0'>
                {coupon.timeUsed > 0 && (
                  <div className='relative flex justify-center items-center'>
                    <img src={CouponNumber} alt='icon' />
                    <p className='absolute top-1/2 right-1/2 transform translate-x-5 -translate-y-3 font-bold text-min text-white'>
                      X{coupon.timeUsed}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>쿠폰 없음</div>
      )}
    </div>
  )
}
