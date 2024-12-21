import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

export default function CouponPage() {
  const [activeTab, setActiveTab] = useState('available')
  const navigate = useNavigate()
  const location = useLocation()

  // Update active tab based on the current route
  useEffect(() => {
    if (location.pathname === '/account/coupon/last-coupon') {
      setActiveTab('last-coupon')
    } else {
      setActiveTab('available')
    }
  }, [location.pathname])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    if (tab === 'available') {
      navigate('/account/coupon')
    } else if (tab === 'last-coupon') {
      navigate('/account/coupon/last-coupon')
    }
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex w-[405px]'>
        <button
          className={`flex items-center justify-center h-11 gap-2 flex-1 ${
            activeTab === 'available' ? 'border-[#D1B584] bg-[#FAF4EA] border-b-2' : 'border-transparent bg-white'
          }`}
          onClick={() => handleTabClick('available')}
        >
          <span className={`text-textPrd font-bold ${activeTab === 'available' ? 'text-[#3B3B3B]' : 'text-[#8C8C8C]'}`}>
            사용가능 쿠폰
          </span>
        </button>
        <button
          className={`flex items-center justify-center h-11 gap-2 flex-1 ${
            activeTab === 'last-coupon' ? 'border-[#D1B584] bg-[#FAF4EA] border-b-2' : 'border-transparent bg-white'
          }`}
          onClick={() => handleTabClick('last-coupon')}
        >
          <span
            className={`text-textPrd font-bold ${activeTab === 'last-coupon' ? 'text-[#3B3B3B]' : 'text-[#8C8C8C]'}`}
          >
            지난 쿠폰
          </span>
        </button>
      </div>

      {/* Content area for rendering Outlet (sub-routes) */}
      <div className='mt-4'>
        <Outlet />
      </div>
    </div>
  )
}
