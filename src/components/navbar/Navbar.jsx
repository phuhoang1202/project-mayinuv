import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, Menu, Button, Modal } from 'antd'
import logo from '@assets/images/Group.svg'
import iconSearch from '@assets/images/IconSearch.svg'
import IconCart from '@assets/images/IconCart.svg'
import IconUser from '@assets/images/IconUser.svg'
import IconFavourite from '@assets/images/IconFavourite.svg'
import FlagKorea from '@assets/images/flag/FlagKorea.svg'
import FlagChina from '@assets/images/flag/FlagChina.svg'
import FlagJapan from '@assets/images/flag/FlagJapan.svg'
import FlagVN from '@assets/images/flag/FlagVN.svg'
import FlagAsia from '@assets/images/flag/FlagAsia.svg'
import ShoppingCartHover from '@assets/images/navbarHover/ShoppingCartHover.svg'
import FavouriteHover from '@assets/images/navbarHover/FavouriteHover.svg'
import LoginHover from '@assets/images/navbarHover/LoginHover.svg'
import LoginHover2 from '@assets/images/navbarHover/LoginHover2.svg'
import MenuHover from '@assets/images/navbarHover/MenuHover.svg'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import IconMenu from '@assets/images/IconMenu.svg'
import AllMenu from '@components/allMenu/AllMenu'
import { useCartStore } from '@store/user/cartStore'
import { useProductStore } from '@store/user/productStore'
import NotifyIcon from '@assets/icons/NotifyIcon'
import BreadcrumbsCommon from '@components/breadcrumbs/BreadcrumbsCommon'
import { getToken, getUserInfor } from '@utils/auth'
import { constants as c } from '@constants'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { getCartByCondition, allPrdsOnCart } = useCartStore()
  const { getAllWishList, wishListPrds } = useProductStore()
  const [isCartHovered, setIsCartHovered] = useState(false)
  const [isHeartHovered, setIsHeartHovered] = useState(false)
  const [isUserHovered, setIsUserHovered] = useState(false)
  const [isMenuHovered, setIsMenuHovered] = useState(false)
  const [valueSearch, setValueSearch] = useState('')
  const token = getToken()
  const navigate = useNavigate()

  const [language, setLanguage] = useState('')
  const { t, i18n } = useTranslation()

  const userInfor = getUserInfor() || []

  // Sử dụng state để lưu trữ thông tin người dùng
  const [getInfoUser, setInfoUser] = useState(null)
  const [isAllMenuVisible, setAllMenuVisible] = useState(false)

  useEffect(() => {
    const savedLanguage = JSON.parse(localStorage.getItem('language')) || 'ko'
    setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    if (userInfor) {
      const updatedUser = JSON.parse(getUserInfor() || null)
      setInfoUser(updatedUser)
    }
  }, [userInfor])

  useEffect(() => {
    const form = {
      pageNumber: 0,
      pageSize: 10,
    }
    getCartByCondition(form)
    getAllWishList(form)
  }, [])

  const handleLanguageChange = (lang, exchangePrice) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
    localStorage.setItem('language', JSON.stringify(lang))
    localStorage.setItem('exchangePrice', JSON.stringify(exchangePrice))
    window.location.reload()
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <div className='flex items-center gap-3 border-b' onClick={() => handleLanguageChange('ko', 'KRW')}>
          <img src={FlagKorea} alt='icon' />
          Korea
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className='flex items-center gap-3' onClick={() => handleLanguageChange('zh-CN', 'CNH')}>
          <img src={FlagChina} alt='icon' />
          China
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className='flex items-center gap-3' onClick={() => handleLanguageChange('ja', 'JPY')}>
          <img src={FlagJapan} alt='icon' />
          Japan
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className='flex items-center gap-3' onClick={() => handleLanguageChange('vi', 'VND')}>
          <img src={FlagVN} alt='icon' />
          Việt Nam
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className='flex items-center gap-3' onClick={() => handleLanguageChange('en', 'USD')}>
          <img src={FlagAsia} alt='icon' />
          Global
        </div>
      </Menu.Item>
    </Menu>
  )

  // Search Product
  const handleSearch = async () => {
    try {
      navigate(`/search-product?query=${encodeURIComponent(valueSearch)}`)
    } catch (error) {
      console.error('Error translating text:', error)
    }
  }

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

  const handleNavigate = (page) => {
    if (!token) {
      setOpenModal(true)
    } else {
      switch (page) {
        case '/shopping-cart':
          navigate('/shopping-cart')
          break
        case '/shopping-cart/favorites':
          navigate('/shopping-cart/favorites')
          break
        default:
          navigate('/')
          break
      }
    }
  }

  return (
    <div className='border-b pb-2'>
      {/* Trademark */}
      <div className='border-b fixed top-0 w-full bg-white' style={{ zIndex: 60 }}>
        {/* Header */}
        <div className='flex items-center justify-between lg:max-w-7xl w-full mx-auto lg:px-0 px-2 py-2 lg:gap-4 gap-2'>
          <Link to={'/'}>
            <div className='lg:w-[124px] lg:h-[62px] w-[92px]'>
              <img src={logo} alt='photo' className='h-full w-full object-cover' />
            </div>
          </Link>

          <div className='relative'>
            <input
              type='text'
              className='rounded-xl lg:pr-10 pr-8 py-3 lg:w-[405px] w-28 md:w-96 lg:h-10 h-9 pl-4 custom-placeholder'
              style={{ border: '1px solid #D3D2D2' }}
              placeholder={t('inputSearch')}
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
            />
            <button onClick={handleSearch}>
              <img
                src={iconSearch}
                alt='icon search'
                className='absolute top-1/2 right-3 transform -translate-y-1/2 lg:h-auto lg:w-auto w-5 h-5'
              />
            </button>
          </div>

          <div className='flex justify-between lg:justify-end lg:flex-row items-center gap-4 '>
            <div className='flex lg:justify-between justify-end items-center gap-2'>
              {/* Cart */}
              <div
                className='relative cursor-pointer h-10 w-10'
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
                onClick={() => handleNavigate('/shopping-cart')}
              >
                {isCartHovered ? (
                  <img src={ShoppingCartHover} alt='icon' />
                ) : (
                  <>
                    <img
                      src={IconCart}
                      alt='icon'
                      className='opacity-100 transition-opacity duration-300 h-full w-full object-cover'
                    />
                    {/* <img src={IconCart} alt='icon' /> */}
                    <NotifyIcon className='absolute top-2.5 right-2' />
                  </>
                )}
              </div>
              {/* Heart */}
              <div
                className='hidden lg:block cursor-pointer relative h-10 w-10'
                onMouseEnter={() => setIsHeartHovered(true)}
                onMouseLeave={() => setIsHeartHovered(false)}
                onClick={() => handleNavigate('/shopping-cart/favorites')}
              >
                {isHeartHovered ? (
                  <img src={FavouriteHover} alt='icon' className='h-full w-full object-cover' />
                ) : (
                  <>
                    <img src={IconFavourite} alt='icon' />
                    {wishListPrds && wishListPrds.length > 0 && <NotifyIcon className='absolute top-2.5 right-2' />}
                  </>
                )}
              </div>
              {/* User */}
              <div
                className='cursor-pointer rounded-full h-10 w-10'
                onMouseEnter={() => setIsUserHovered(true)}
                onMouseLeave={() => setIsUserHovered(false)}
                onClick={() => (getInfoUser ? navigate('/account/change-information') : navigate('/login'))}
              >
                {isUserHovered ? (
                  getInfoUser && Object.keys(getInfoUser).length > 0 ? (
                    <img src={LoginHover2} alt='icon' className='w-full h-full object-cover' />
                  ) : (
                    <img src={LoginHover} alt='icon' className='w-full h-full object-cover' />
                  )
                ) : (
                  <img
                    src={getInfoUser && getInfoUser.img ? `${c.DOMAIN_IMG}${getInfoUser.img}` : IconUser}
                    alt='icon'
                    loading='lazy'
                    className='w-full h-full object-cover rounded-full'
                  />
                )}
              </div>
              {/* Menu */}
              <div
                className='flex items-center gap-4 relative h-10 w-10'
                // onMouseEnter={() => setIsMenuHovered(true)}
                // onMouseLeave={() => setIsMenuHovered(false)}
                onClick={() => setAllMenuVisible(!isAllMenuVisible)}
              >
                {/* {isMenuHovered ? (
                  <img src={MenuHover} alt='icon' />P
                ) : ( */}
                <img src={IconMenu} alt='icon menu' className='cursor-pointer h-full w-full object-cover' />
                {/* )} */}

                {isAllMenuVisible && (
                  <div className='absolute top-12 -right-2 z-50'>
                    <AllMenu setAllMenuVisible={setAllMenuVisible} isAllMenuVisible={isAllMenuVisible} />
                  </div>
                )}
              </div>
              {/* Language */}
              <Dropdown
                overlay={menu}
                trigger={['click']}
                className='hidden lg:flex w-[82px] h-12'
                style={{ zIndex: '9999' }}
              >
                <Button
                  className='flex items-center justify-between'
                  style={{
                    border: '1px solid black',
                    borderRadius: '30px',
                    padding: '8px 12px',
                    zIndex: '9999',
                  }}
                >
                  <img
                    src={
                      language === 'ko'
                        ? FlagKorea
                        : language === 'zh-CN'
                        ? FlagChina
                        : language === 'ja'
                        ? FlagJapan
                        : language === 'vi'
                        ? FlagVN
                        : language === 'en'
                        ? FlagAsia
                        : FlagKorea
                    }
                    alt='Selected Flag'
                  />
                  <img src={IconArrowDownFill} alt='icon korea' />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Modal navigate login */}
      <Modal open={openModal} confirmLoading={confirmLoading} onCancel={handleCancel} footer={false} centered>
        <div>
          <div className='font-semibold text-textPrd flex flex-col justify-center items-center mt-4 gap-2'>
            {/* <div>{t('loginText1')} </div> */}
            <div>{t('loginText2')}</div>
          </div>
        </div>

        <div className='flex items-center justify-center gap-6 mt-8'>
          <div>
            <button
              className='font-semibold text-normal h-11 min-w-36 rounded-lg'
              style={{ border: '2px solid black' }}
              onClick={handleCancel}
            >
              {t('btnCancel')}
            </button>
          </div>
          <div>
            <button
              className='text-white bg-[#D1B584] font-semibold text-normal h-11 min-w-36 rounded-lg'
              onClick={handleOk}
            >
              {t('loginBtn')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
