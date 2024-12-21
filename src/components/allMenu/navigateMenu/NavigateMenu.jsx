import React, { useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getToken } from '@utils/auth'
import { Dropdown, Menu, Modal } from 'antd'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'

export default function NavigateMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const [openModal, setOpenModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const token = getToken()

  const menuItems = [
    { label: `${t('askedQuestions')}`, path: '/menu/asked-question', requiresAuth: false },
    { label: `${t('11Inquiry')}`, path: '/menu/question', requiresAuth: false },
    { label: `${t('featureFooter2')}`, path: '/menu/terms-of-use', requiresAuth: false },
    { label: `${t('featureFooter3')}`, path: '/menu/privacy-policy', requiresAuth: false },
    { label: `${t('countrySettings')}`, path: '/menu/setting-country', requiresAuth: false },
  ]

  const handleOk = () => {
    setConfirmLoading(true)
    setOpenModal(false)
    setConfirmLoading(false)
    navigate('/login')
  }

  const handleCancel = () => {
    setOpenModal(false)
  }

  const renderMenuItems = menuItems.map((item) => (
    <Menu.Item
      key={item.path}
      onClick={() => handleNavigate(item.path, item.requiresAuth)}
      className={location.pathname === item.path ? 'bg-white' : ''}
    >
      {item.label}
    </Menu.Item>
  ))

  const mobileMenu = <Menu>{renderMenuItems}</Menu>

  const handleNavigate = (path, requiresAuth) => {
    if (requiresAuth && !token) {
      setOpenModal(true)
    } else {
      navigate(path)
    }
  }

  return (
    <div className='max-w-7xl mx-auto lg:mt-24 mt-20'>
      {/* Dropdown menu for mobile */}
      <div className='lg:hidden block w-full px-4'>
        <Dropdown overlay={mobileMenu} placement='bottomCenter' trigger={['click']}>
          <div className='flex items-center justify-center gap-2 px-4 py-2 bg-[#F8F8F8] rounded-md text-textPrd font-semibold cursor-pointer'>
            {t('featureFooter4')} <img src={IconArrowDownFill} alt='icon' />
          </div>
        </Dropdown>
      </div>

      <div className='flex gap-8 lg:mt-0 mt-4 lg:px-0 px-2'>
        {/* Menu responsive */}
        <div className='lg:block hidden'>
          <div className='px-4 bg-[#F8F8F8] pt-6 pb-4 lg:w-72 w-full rounded-md sticky top-24'>
            <h3 className='font-semibold text-textPrd text-center'>{t('featureFooter4')}</h3>
            <div className='flex flex-col gap-3 mt-4'>
              {menuItems.map((item) => (
                <div
                  key={item.path}
                  className={`flex items-center gap-[10px] px-8 py-2 cursor-pointer ${
                    location.pathname === item.path ? 'bg-white' : ''
                  }`}
                  onClick={() => handleNavigate(item.path, item.requiresAuth)}
                >
                  <div className='text-[#3B3B3B] text-normal font-medium'>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Outlet />

        {/* Modal navigate login */}
        {/* <Modal open={openModal} confirmLoading={confirmLoading} onCancel={handleCancel} footer={false} centered>
          <div>
            <div className='font-semibold text-textPrd flex flex-col justify-center items-center mt-4 gap-2'>
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
        </Modal> */}
      </div>
    </div>
  )
}
