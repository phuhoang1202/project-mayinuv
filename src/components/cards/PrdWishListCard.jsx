import React, { useState } from 'react'
import { Checkbox, Modal } from 'antd'
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import BellIcon from '@assets/icons/BellIcon'
import noImg from '@assets/images/productImages/no_image.png'
import PrimaryButton from '../buttons/PrimaryButton'

import { formatPrice } from '@utils'
import { useProductStore } from '@store/user/productStore'
import { useUserStore } from '@store/user/userStore'
import Loading from '@components/loadingCommon/Loading'
import { Toast } from '@utils/toast'

const { confirm } = Modal

const PrdOnCartCard = ({ id, name, properties, discount, price, linkImg, soldOut }) => {
  const { wishListPrd, loadingWisPrd, getAllWishList } = useProductStore()
  const { userInfo } = useUserStore()
  const discountValue = parseFloat(discount) / 100
  const discountedPrice = price * (1 - discountValue)

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }

  const onClose = (e) => {
    e.preventDefault()
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <p className='text-[#333333]'>Do you want to remove the item from your wish list?</p>,
      onOk() {
        delItemOfWishList()
      },
      onCancel() {
        Modal.destroyAll()
      },
    })
  }

  const delItemOfWishList = () => {
    const onSuccess = () => {
      setLiked(true)
      getPrdById(id)
      getAllWishList()
    }
    const onFail = () => {
      Toast.error('Add to wish list fail! please try again !')
    }
    const form = {
      userId: userInfo?.id,
      productId: id,
    }
    wishListPrd(form, onSuccess, onFail)
  }

  return loadingWisPrd ? (
    <Loading />
  ) : (
    <div>
      <div className='w-full relative flex items-center'>
        <Checkbox onChange={onChange} className='mr-4' />
        <div className='group relative flex flex-1 gap-x-6 rounded-lg p-4 hover:bg-gray-50'>
          <div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
            <img src={linkImg || noImg} alt='image prd' className='object-cover w-full h-full rounded-lg' />
          </div>

          <div className='flex-1'>
            <div className='font-semibold text-gray-900'>
              {name || 'No name'}
              <span className='absolute inset-0' />
            </div>
            <p className='mt-1 text-gray-600'>{properties || '100g, 에스프레소'}</p>

            {!soldOut ? (
              <div>
                <strong className='text-gray-900'>{formatPrice(discountedPrice)}</strong>
                <span className='line-through text-gray-500 ml-2'>{formatPrice(price)}</span>
              </div>
            ) : (
              <div className='flex items-center'>
                <strong className='text-gray-900 opacity-50'>{formatPrice(price)}</strong>
                <span className='ml-2 text-gray-500'>품절</span>
              </div>
            )}
          </div>
        </div>
        <div className='cursor-pointer text-lg p-2 text-gray-900' onClick={onClose}>
          <CloseOutlined />
        </div>
      </div>
    </div>
  )
}

export default PrdOnCartCard
