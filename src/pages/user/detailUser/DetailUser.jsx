import React, { useEffect, useState } from 'react'
import { Upload, message } from 'antd'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import IconUser from '@assets/icons/user/IconUser.svg'
import IconWallet from '@assets/icons/user/IconWallet.svg'
import IconCoupon from '@assets/icons/user/IconCoupon.svg'
import IconHistory from '@assets/icons/user/IconHistory.svg'
import IconEdit from '@assets/images/IconEdit.svg'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { user } from '@services/user/user'
import { constants as c } from '@constants'
import { getToken, getUserInfor, setUserInfor } from '@utils/auth'
import { useTranslation } from 'react-i18next'

export default function DetailUser() {
  let userInforCookie = []
  const [getInfo, setGetInfo] = useState([])

  try {
    const userInfo = getUserInfor('')
    if (userInfo) {
      userInforCookie = JSON.parse(userInfo)
    } else {
      userInforCookie = []
    }
  } catch (error) {
    console.error('Error parsing user information from cookie:', error)
    userInforCookie = []
  }
  const { t } = useTranslation()
  const [avatar, setAvatar] = useState(userInforCookie.img)
  const [loading, setLoading] = useState(false)
  const tokenUser = getToken()

  const navigate = useNavigate()

  // Hàm xử lý upload
  const handleUpload = async (file) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('img', file)

    try {
      const response = await user.uploadAvatar(formData, tokenUser)

      if (response.status === 200) {
        const newAvatarUrl = URL.createObjectURL(file)
        setAvatar(newAvatarUrl)

        // Cập nhật cookie với ảnh mới
        const updatedUserInfor = {
          ...userInforCookie,
          img: newAvatarUrl,
        }

        // Lưu dữ liệu mới vào cookie
        setUserInfor(JSON.stringify(updatedUserInfor))
        message.success('Upload thành công!')
      } else {
        message.error('Upload thất bại, vui lòng thử lại.')
      }
    } catch (error) {
      message.error('Upload thất bại, vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  // Cấu hình Upload
  const uploadProps = {
    name: 'file',
    showUploadList: false,
    beforeUpload: (file) => {
      handleUpload(file)
      return false // Ngăn không cho upload mặc định
    },
    accept: 'image/*',
  }

  useEffect(() => {
    let userInforCookie = []

    try {
      const userInfo = getUserInfor('')
      if (userInfo) {
        userInforCookie = JSON.parse(userInfo)
        setGetInfo(userInforCookie)
      }
    } catch (error) {
      console.error('Error parsing user information in useEffect:', error)
      userInforCookie = []
    }

    if (userInforCookie?.img) {
      setAvatar(userInforCookie.img)
    }
  }, [])

  return (
    <div className='lg:max-w-7xl mx-auto mt-24'>
      <div className='flex flex-col lg:flex-row gap-8 lg:px-0 px-4 lg:mx-0 mx-auto'>
        {/* Avatar */}
        <div className='lg:mx-0 mx-auto lg:w-auto w-full'>
          <div className='lg:w-[296px] w-full py-4 px-8 bg-[#F8F8F8] flex items-center gap-6 p-2 rounded-t-lg border-b'>
            <div className='relative'>
              <img
                src={loading ? DefaultAvatar : avatar ? `${c.DOMAIN_IMG}${avatar}` : DefaultAvatar}
                alt='avatar'
                className='w-[60px] h-[60px] rounded-full object-cover'
              />
              <div className='absolute -right-1 -bottom-3 cursor-pointer'>
                {/* Ant Design Upload */}
                <Upload {...uploadProps}>
                  <img src={IconEdit} alt='icon edit' />
                </Upload>
              </div>
            </div>

            <div>
              <div className='font-bold text-textPrd'>{getInfo.name}</div>
              <div className='font-medium text-small'>{t('membershipLevel')}</div>
            </div>
          </div>

          <div className='px-8 bg-[#F8F8F8] pt-8 pb-4'>
            <div className='flex flex-col gap-3'>
              {/* <div className='flex items-center gap-[10px] cursor-pointer' onClick={() => navigate('/')}>
                <img src={IconUser} alt='icon' />
                <div className='text-[#3B3B3B] text-normal font-medium'>내 정보</div>
              </div> */}

              <div
                className='flex items-center gap-[10px] cursor-pointer'
                onClick={() => navigate('tyc/transaction-history')}
              >
                <img src={IconWallet} alt='icon' />
                <div className='text-[#3B3B3B] text-normal font-medium'>{t('TYCPoints')}</div>
              </div>

              <div className='flex items-center gap-[10px] cursor-pointer' onClick={() => navigate('coupon')}>
                <img src={IconCoupon} alt='icon' />
                <div className='text-[#3B3B3B] text-normal font-medium'>{t('coupon')}</div>
              </div>

              <div className='flex items-center gap-[10px] cursor-pointer' onClick={() => navigate('/order-history')}>
                <img src={IconHistory} alt='icon' />
                <div className='text-[#3B3B3B] text-normal font-medium'>{t('orderDetails')}</div>
              </div>
            </div>
          </div>

          {/* Router */}
          <div className='mt-4'>
            <ul className='flex flex-col gap-1'>
              <NavLink
                to='/account/change-information'
                className={({ isActive }) =>
                  `h-12 p-4 flex justify-start items-center border rounded-lg ${
                    isActive ? 'bg-[#EFEFEF] font-bold' : ''
                  }`
                }
              >
                <li>{t('changePassword')}</li>
              </NavLink>

              <NavLink
                to='/account/additional-info'
                className={({ isActive }) =>
                  `h-12 p-4 flex justify-start items-center border rounded-lg ${
                    isActive ? 'bg-[#EFEFEF] font-bold' : ''
                  }`
                }
              >
                <li>{t('additionalInformation')}</li>
              </NavLink>
            </ul>
          </div>
        </div>

        {/* Thông tin */}
        <div className='lg:w-[624px] flex flex-col gap-2 '>
          <div className='border-b pb-2'>
            <div className='font-bold text-textPrd'>{t('personalInformation')}</div>
            <div className='flex items-center gap-2 mt-2'>
              <div className='font-normal'>{t('personalId')}: </div>
              {getInfo ? <div className='font-medium'>{getInfo.email}</div> : <div>email@naver.com</div>}
            </div>
          </div>

          <div className='mt-4'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
