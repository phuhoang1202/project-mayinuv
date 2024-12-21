import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Tabs } from 'antd'

import './CartStyles.css'
import CartIcon from '@assets/icons/CartIcon'
import HeartIcon from '@assets/icons/HeartIcon'
import ListProducts from './components/ListProducts'
import WishList from './components/WishList'

const Cart = () => {
  const location = useLocation()
  const tab = location.state?.tab || '1'
  const [activeKey, setActiveKey] = useState(tab)

  const handleTabChange = (key) => {
    setActiveKey(key)
  }

  useEffect(() => {
    setActiveKey(tab)
  }, [location.state?.tab])

  const tabItems = [
    {
      key: '1',
      label: (
        <div className='flex justify-between py-1.5 px-3.5 gap-1 items-center w-full'>
          <CartIcon filled={activeKey === '1'} />
          <span className={`font-semibold text-[20px] ml-1 ${activeKey === '1' ? 'text-[#282828]' : 'text-[#D1B584]'}`}>
            장바구니
          </span>
        </div>
      ),
      children: <ListProducts />,
    },
    {
      key: '2',
      label: (
        <div className='flex justify-between py-1.5 px-3.5 gap-1 items-center w-full'>
          <HeartIcon filled={activeKey === '2'} />
          <span className={`font-semibold text-[20px] ${activeKey === '2' ? 'text-[#282828]' : 'text-[#D1B584]'}`}>
            찜
          </span>
        </div>
      ),
      children: <WishList />,
    },
  ]

  return (
    <div className='max-w-7xl mx-auto'>
      {' '}
      <Tabs
        activeKey={activeKey}
        onChange={handleTabChange}
        className='custom-tabs mt-6'
        tabBarStyle={{ margin: '0' }}
        items={tabItems}
      />
    </div>
  )
}

export default Cart
