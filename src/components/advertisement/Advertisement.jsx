import React from 'react'
import Advertisement1 from '@assets/images/Advertisement1.svg'
import Advertisement2 from '@assets/images/Advertisement2.svg'
import Advertisement3 from '@assets/images/Advertisement3.svg'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Advertisement() {
  const { t } = useTranslation()
  return (
    <div className='lg:mt-20 mt-4 lg:max-w-7xl mx-auto lg:px-0 px-4 w-full'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-between items-center '>
        <Link to={'/category'}>
          <div className='relative'>
            <img src={Advertisement1} alt='photo' className='w-full' />
            <p className='font-bold text-textPrd text-[#F7F7F1] w-[107px] absolute top-1/2 left-20 transform -translate-x-1/2 -translate-y-1/2'>
              {t('advertisement1')}
            </p>
          </div>
        </Link>
        <Link to={'/category'}>
          <div className='relative'>
            <img src={Advertisement2} alt='photo' className='w-full' />
            <p className='font-bold text-textPrd text-[#F7F7F1] w-[107px] absolute top-1/2 left-20 transform -translate-x-1/2 -translate-y-1/2'>
              {t('advertisement2')}
            </p>
          </div>
        </Link>
        <Link to={'/category'}>
          <div className='relative'>
            <img src={Advertisement3} alt='photo' className='w-full' />
            <p className='font-bold text-textPrd text-[#F7F7F1] w-[107px] absolute top-1/2 left-20 transform -translate-x-1/2 -translate-y-1/2'>
              {t('advertisement3')}
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
