import React, { useEffect, useState } from 'react'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import SettingsOutline from '@assets/images/SettingsOutline.svg'
import IconWallet from '@assets/images/IconWallet.svg'
import IconDiscount from '@assets/images/IconDiscount.svg'
import IconCartOutline from '@assets/images/IconCartOutline.svg'
import IconHeartOutline from '@assets/images/IconHeartOutline.svg'
import IconTimeOutline from '@assets/images/IconTimeOutline.svg'
import IconRight from '@assets/images/IconRight.svg'
import IconArrowDown from '@assets/images/IconArrowDown.svg'
import IconArrowUp from '@assets/images/IconArrowUp.svg'
import IconLogOut from '@assets/images/IconLogOut.svg'
import CloseIcon from '@assets/icons/CloseIcon'
import { Link, useNavigate } from 'react-router-dom'
import { getUserInfor, remoteUserInfor, removeToken } from '@utils/auth'
import { constants as c } from '@constants'
import { logOut } from '@services/user/auth'
import { Toast } from '@utils/toast'
import { walletservice } from '@services/user/walletservice'
import { formatPrice } from '@utils/index'
import { coupon } from '@services/user/coupon'
import { cart } from '@services/user/cart'
import { product } from '@services/user/product'
import { useTranslation } from 'react-i18next'
import { Modal } from 'antd'

export default function AllMenu({ setAllMenuVisible, isAllMenuVisible }) {
  const [activeMenus, setActiveMenus] = useState([])
  const [activeSubMenus, setActiveSubMenus] = useState([])
  const navigate = useNavigate()
  const getInfoUser = JSON.parse(getUserInfor() || null)
  const { t } = useTranslation()
  const [unit, setUnit] = useState('KRW')

  const items = [
    {
      key: 'sub1',
      label: `${t('news')}`,
      href: 'news-page',
    },

    {
      key: 'sub3',
      label: `${t('history')}`,
      href: '#',
      children: [
        // { key: 'g3-1-1', label: '공지사항', href: '#' },
        { key: 'g3-1-2', label: `${t('askedQuestions')}`, href: '/menu/asked-question' },
        { key: 'g3-1-3', label: `${t('11Inquiry')}`, href: '/menu/question' },
        { key: 'g3-1-4', label: `${t('featureFooter2')}`, href: '/menu/terms-of-use' },
        { key: 'g3-1-5', label: `${t('featureFooter3')}`, href: '/menu/privacy-policy' },
        { key: 'g3-1-6', label: `${t('countrySettings')}`, href: '/menu/setting-country' },
      ],
    },

    // {
    //   key: 'sub4',
    //   label: `${t('aboutUs')}`,
    //   href: 'about-us',
    // },

    // {
    //   key: 'sub5',
    //   label: `${t('serviceIntroduction')}`,
    //   href: 'service',
    // },
  ]

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    setUnit(getUnitLocal)
  }, [unit])

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

  // Coupon
  const [dataCoupon, setDataCoupon] = useState([])

  // CartData
  const [cartData, setCartData] = useState([])

  // Wish list
  const [wishList, setWishList] = useState([])

  // state dsp vs wallet
  const [dataWallet, setDataWallet] = useState({})

  // const toggleMenu = (key) => {
  //   setActiveMenus((prevActiveMenus) =>
  //     prevActiveMenus.includes(key) ? prevActiveMenus.filter((menuKey) => menuKey !== key) : [...prevActiveMenus, key],
  //   )
  // }

  const toggleSubMenu = (key) => {
    setActiveMenus(
      (prevActiveMenus) =>
        prevActiveMenus.includes(key)
          ? prevActiveMenus.filter((menuKey) => menuKey !== key) // Xóa key nếu đã tồn tại
          : [...prevActiveMenus, key], // Thêm key nếu chưa tồn tại
    )
  }

  const handleLogOut = async () => {
    await logOut()
    removeToken('token')
    remoteUserInfor()
    Toast.success('성공적으로 로그아웃되었습니다')
    window.location.reload()
  }

  const getDataWallet = async () => {
    try {
      const response = await walletservice.getInfoWallet()
      setDataWallet(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const getCouponStatus = async () => {
    try {
      const response = await coupon.getAllCouponStatus()
      setDataCoupon(response.data)
    } catch (error) {
      console.log('쿠폰 데이터 검색 오류')
    }
  }

  const fetchCartData = async () => {
    try {
      const response = await cart.getCartByCondition({
        currency: unit,
        pageNumber: 0,
        pageSize: 8,
      })
      setCartData(response.data.content)
    } catch (error) {
      console.log('Error fetching cart data')
    }
  }

  const fetchAllWishList = async () => {
    try {
      const response = await product.getAllWishList({
        pageNumber: 0,
        pageSize: 8,
      })
      setWishList(response.data.content)
    } catch (error) {
      console.log('Error fetching cart data')
    }
  }

  useEffect(() => {
    getDataWallet()
    getCouponStatus()
    fetchCartData()
    fetchAllWishList()
  }, [])

  console.log('cartData', cartData)

  return (
    <div
      className={`${
        !getInfoUser ? 'w-[22rem]' : 'w-full'
      } bg-white lg:p-8 p-6 shadow-lg rounded-lg lg:max-w-lg overflow-y-auto h-[90vh]`}
      style={{
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.1)',
        height: '',
      }}
    >
      <div className='relative p-2'>
        <div className='absolute top-[-10px] right-[-10px]'>
          <CloseIcon className='cursor-pointer' onClick={() => setAllMenuVisible(false)} />
        </div>
      </div>
      {/* 1 */}
      {getInfoUser ? (
        <div className='flex justify-between items-center pb-2 border-b border-gray-200 '>
          <div
            className='flex items-center gap-2 cursor-pointer '
            onClick={() => navigate('/account/change-information')}
          >
            <div className='w-[60px] h-[60px]'>
              <img
                src={getInfoUser?.img ? `${c.DOMAIN_IMG}${getInfoUser.img}` : DefaultAvatar}
                alt='icon'
                loading='lazy'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <div>
              <div className='font-semibold'>{getInfoUser ? getInfoUser.name : `${t('memberName')}`}</div>
              <div className='text-gray-500 text-min'>{t('membershipLevel')}</div>
            </div>
          </div>
          <div className='cursor-pointer' onClick={() => navigate('/account/change-information')}>
            <img src={SettingsOutline} alt='icon setting' />
          </div>
        </div>
      ) : (
        <div className='text-primaryPrdName font-bold'>{t('pleaseLogin')} </div>
      )}

      {getInfoUser ? (
        <div>
          {/* 2 */}
          <div className='flex lg:justify-between  items-center mt-8 gap-4'>
            <div
              className='flex justify-between items-center gap-4 lg:w-[219px] w-[180px] cursor-pointer bg-[#F8F8F8] p-4 rounded-lg'
              onClick={() => navigate('/account/tyc/transaction-history')}
            >
              <div>
                <div className='font-bold text-largerPrdName'>{dataWallet.balance}</div>
                <div className='text-gray-500 text-sm'>{t('TYCPoints')}</div>
              </div>
              <img src={IconWallet} alt='icon wallet' />
            </div>

            <div
              className='flex justify-between items-center gap-4 lg:w-[219px] w-[180px] bg-[#F8F8F8] p-4 rounded-lg cursor-pointer'
              onClick={() => navigate('/account/coupon')}
            >
              <div>
                <div className='font-bold text-largerPrdName'>
                  {dataCoupon && dataCoupon.length > 0 ? dataCoupon.length : 0}
                </div>
                <div className='text-gray-500 text-sm'>{t('couponHave')}</div>
              </div>
              <img src={IconDiscount} alt='icon discount' />
            </div>
          </div>

          {/* 3 */}
          <div className='flex justify-between gap-6 mt-8 pb-4 border-b border-gray-200 '>
            <div className='relative'>
              <div
                className='flex flex-col items-center gap-2 w-20 cursor-pointer'
                onClick={() => navigate('/shopping-cart')}
              >
                <img src={IconCartOutline} alt='cart icon' />
                <div className='text-sm'>{t('shoppingCart')}</div>
                <div className='absolute top-0 right-0 w-5 h-5 bg-[#F14646] text-white rounded-full flex justify-center items-center text-small font-medium'>
                  {cartData && cartData.length > 0 ? cartData.length : 0}
                </div>
              </div>
            </div>
            <div className='relative'>
              <div
                className='flex flex-col items-center gap-2 w-20 cursor-pointer'
                onClick={() => navigate('/shopping-cart/favorites')}
              >
                <img src={IconHeartOutline} alt='heart icon ' />
                <div className='text-sm'>{t('favorites')}</div>
                <div className='absolute top-0 right-0 w-5 h-5 bg-[#F14646] text-white rounded-full flex justify-center items-center text-small font-medium'>
                  {wishList && wishList.length > 0 ? wishList.length : 0}
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center gap-2 cursor-pointer' onClick={() => navigate('order-history')}>
              <img src={IconTimeOutline} alt='history icon' />
              <div className='text-sm'>{t('orderDetails')}</div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {/* 4 */}
      <div className='mt-4'>
        {items.map((item) => (
          <div key={item.key}>
            <button
              className='text-left w-full p-2 text-normal font-semibold border-b border-gray-200 hover:bg-gray-100 mt-2'
              onClick={() => {
                if (item.children) {
                  toggleSubMenu(item.key)
                } else {
                  // Chuyển hướng nếu không có children
                  setAllMenuVisible(!isAllMenuVisible)
                  navigate(item.href)
                }
              }}
            >
              {item.label}
              {item.children && (
                <span className='float-right'>
                  {activeMenus.includes(item.key) ? (
                    <img src={IconRight} alt='icon' />
                  ) : (
                    <img src={IconArrowDown} alt='icon' />
                  )}
                </span>
              )}
            </button>
            {item.children && (
              <div className='pl-2'>
                {item.children.map((subItem) => (
                  <Link
                    key={subItem.key}
                    to={subItem.href}
                    className='block py-2 px-4 text-normal font-medium text-[#282828] bg-[#F8F8F8] hover:underline'
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 5 */}
      {getInfoUser && (
        <div className='mt-6 px-2'>
          <div className='flex items-center gap-4 cursor-pointer' onClick={handleLogOut}>
            <img src={IconLogOut} alt='icon' />
            <div className='text-normal font-medium'>{t('logout')}</div>
          </div>
        </div>
      )}
    </div>
  )
}
