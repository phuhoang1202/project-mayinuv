import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import IconShoppingCartOutlet from '@assets/images/IconShoppingCartOutlet.svg'
import IconShoppingCartNone from '@assets/images/IconShoppingCartNone.svg'
import IconHeartNone from '@assets/images/IconHeartNone.svg'
import IconHeartBlack from '@assets/images/IconHeartBlack.svg'
import { useTranslation } from 'react-i18next'

export default function ShoppingCart() {
  const [activeTab, setActiveTab] = useState('cart')
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  // Cập nhật tab active dựa trên route hiện tại
  useEffect(() => {
    if (location.pathname === '/shopping-cart/favorites') {
      setActiveTab('favorites')
    } else {
      setActiveTab('cart')
    }
  }, [location.pathname])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    if (tab === 'cart') {
      navigate('/shopping-cart')
    } else if (tab === 'favorites') {
      navigate('/shopping-cart/favorites')
    }
  }

  return (
    <div className='lg:max-w-7xl mx-auto mt-24 lg:px-0 px-4 w-full'>
      <div className='flex lg:min-w-[405px] max-w-[450px] w-full'>
        <button
          className={`flex items-center justify-center h-11 gap-2 flex-1 lg:text-textPrd text-normal font-bold ${
            activeTab === 'cart'
              ? 'border-[#D1B584] bg-[#FAF4EA] border-b-2 text-[#3B3B3B]'
              : 'border-transparent bg-white text-[#8C8C8C]'
          }`}
          onClick={() => handleTabClick('cart')}
        >
          <img src={activeTab === 'cart' ? IconShoppingCartOutlet : IconShoppingCartNone} alt='Shopping Cart Icon' />
          <div>{t('shoppingCart')}</div>
        </button>
        <button
          className={`flex items-center justify-center h-11 gap-2 flex-1 lg:text-textPrd text-normal font-bold  ${
            activeTab === 'favorites'
              ? 'border-[#D1B584] bg-[#FAF4EA] border-b-2 text-[#3B3B3B]'
              : 'border-transparent bg-white text-[#8C8C8C]'
          }`}
          onClick={() => handleTabClick('favorites')}
        >
          <img src={activeTab === 'favorites' ? IconHeartBlack : IconHeartNone} alt='Favorite Products Icon' />
          <div>{t('favorites')}</div>
        </button>
      </div>

      {/* Khu vực nội dung, nơi sẽ hiển thị Outlet (nội dung của các route con) */}
      <div className='mt-4'>
        <Outlet />
      </div>
    </div>
  )
}
