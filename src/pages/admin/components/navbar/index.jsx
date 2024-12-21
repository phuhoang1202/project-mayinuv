import React, { useEffect, useState } from 'react'
import Dropdown from '../dropdown'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsArrowBarUp } from 'react-icons/bs'
import avatar from '@pages/admin/assets/img/avatars/avatar4.png'
import { Toast } from '@utils/toast'
import { logOut } from '@services/user/auth'
import { remoteUserInfor, removeToken } from '@utils/auth'
import IconNotificationAdmin from '@assets/images/admin/IconNotificationAdmin.svg'
import IconArrowRight from '@assets/images/IconArrowRight.svg'

const Navbar = (props) => {
  const { brandText } = props

  let nameAdmin = null

  try {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      nameAdmin = JSON.parse(userInfo)
    } else {
      nameAdmin = {}
    }
  } catch (error) {
    console.error('Error parsing user information from localStorage:', error)
    nameAdmin = {}
  }

  const navigate = useNavigate()
  const location = useLocation()

  const getPageTitle = () => {
    if (location.pathname === '/admin/manager-product/add-product') {
      return 'Add Product'
    } else if (location.pathname.startsWith('/admin/manager-product/edit-product')) {
      return 'Edit Product'
    } else if (location.pathname.startsWith('/admin/manager-member/add-new-member')) {
      return 'Add New Member'
    } else if (location.pathname.startsWith('/admin/manager-member/edit-member')) {
      return 'Edit Member'
    } else {
      return ''
    }
  }

  const handleLogOut = async () => {
    const response = await logOut()
    if (response.status) {
      Toast.success('Logged out successfully')
      removeToken('token')
      remoteUserInfor()
      navigate('/login')
    }
  }

  return (
    <nav className='mx-2 sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-lg p-2 backdrop-blur-xl bg-white'>
      <div className='ml-[6px]'>
        <p className='shrink text-largerPrdName capitalize flex gap-1'>
          <Link to='/admin/manager-product' className='font-bold text-[#3B3B3B] text-largerPrdName'>
            {brandText}
          </Link>
          {getPageTitle() && (
            <>
              <img src={IconArrowRight} alt='icon' />
              <Link className='font-bold text-largerPrdName text-[#3B3B3B]'>{getPageTitle()}</Link>
            </>
          )}
        </p>
      </div>

      <div className='relative mt-[3px] flex items-center justify-end gap-2 rounded-full px-2 py-2'>
        <Dropdown
          button={
            <p className='cursor-pointer'>
              <img src={IconNotificationAdmin} alt='icon' />
            </p>
          }
          animation='origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out'
          children={
            <div className='flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]'>
              <div className='flex items-center justify-between'>
                <p className='text-base font-bold text-navy-700 dark:text-white'>Notification</p>
                <p className='text-sm font-bold text-navy-700 dark:text-white'>Mark all read</p>
              </div>

              <button className='flex w-full items-center'>
                <div className='flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white'>
                  <BsArrowBarUp />
                </div>
                <div className='ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm'>
                  <p className='mb-1 text-left text-base font-bold text-gray-900 dark:text-white'>
                    New Update: Horizon UI Dashboard PRO
                  </p>
                  <p className='font-base text-left text-xs text-gray-900 dark:text-white'>
                    A new update for your downloaded item is available!
                  </p>
                </div>
              </button>

              <button className='flex w-full items-center'>
                <div className='flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white'>
                  <BsArrowBarUp />
                </div>
                <div className='ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm'>
                  <p className='mb-1 text-left text-base font-bold text-gray-900 dark:text-white'>
                    New Update: Horizon UI Dashboard PRO
                  </p>
                  <p className='font-base text-left text-xs text-gray-900 dark:text-white'>
                    A new update for your downloaded item is available!
                  </p>
                </div>
              </button>
            </div>
          }
          classNames={'py-2 top-4 -left-[230px] md:-left-[440px] w-max'}
        />

        {/* Profile & Dropdown */}
        <Dropdown
          button={<img className='h-10 w-10 rounded-full' src={avatar} alt='Elon Musk' />}
          children={
            <div className='flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none'>
              <div className='p-4'>
                <div className='flex items-center gap-2 '>
                  <p className='text-sm font-bold text-center w-full'>👋 {nameAdmin.name} 👋</p>
                </div>
              </div>
              <div className='h-px w-full bg-gray-200' />

              <div className='flex flex-col p-4'>
                {/* <a href=' ' className='text-sm text-gray-800 dark:text-white hover:dark:text-white'>
                  Profile Settings
                </a>
                <a href=' ' className='mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white'>
                  Newsletter Settings
                </a> */}
                <button
                  onClick={handleLogOut}
                  className='text-sm font-medium text-red-500 hover:text-red-500 transition duration-150 ease-out hover:ease-in'
                >
                  Log Out
                </button>
              </div>
            </div>
          }
          classNames={'py-2 top-8 -left-[180px] w-max'}
        />
      </div>
    </nav>
  )
}

export default Navbar
