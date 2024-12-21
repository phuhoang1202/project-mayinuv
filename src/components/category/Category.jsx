import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Category0 from '@assets/images/category/Category0.svg'
import Category1 from '@assets/images/category/Category1.svg'
import Category2 from '@assets/images/category/Category2.svg'
import Category3 from '@assets/images/category/Category3.svg'
import Category4 from '@assets/images/category/Category4.svg'
import Category5 from '@assets/images/category/Category5.svg'
import Category6 from '@assets/images/category/Category6.svg'
import Category7 from '@assets/images/category/Category7.svg'
import Category8 from '@assets/images/category/Category8.svg'
import Category9 from '@assets/images/category/Category9.svg'
import Category10 from '@assets/images/category/Category10.svg'
import Category12 from '@assets/images/category/Category12.svg'
import { useTranslation } from 'react-i18next'

export default function Category() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const categories = [
    { image: Category12, name: `${t('category11')}`, index: 10, idCategory: 59 },
    { image: Category1, name: `${t('category1')}`, index: 0, idCategory: 3 },
    { image: Category2, name: `${t('category2')}`, index: 1, idCategory: 4 },
    { image: Category3, name: `${t('category3')}`, index: 2, idCategory: 5 },
    { image: Category4, name: `${t('category4')}`, index: 3, idCategory: 6 },
    { image: Category5, name: `${t('category5')}`, index: 4, idCategory: 7 },
    { image: Category6, name: `${t('category6')}`, index: 5, idCategory: 8 },
    { image: Category7, name: `${t('category7')}`, index: 6, idCategory: 9 },
    { image: Category8, name: `${t('category8')}`, index: 7, idCategory: 10 },
    { image: Category9, name: `${t('category9')}`, index: 8, idCategory: 11 },
    { image: Category10, name: `${t('category10')}`, index: 9, idCategory: 12 },
  ]
  return (
    <div className='max-w-7xl mx-auto mt-10 px-2'>
      <div className='overflow-x-auto sm:overflow-x-hidden pb-4'>
        <div className='flex items-start gap-6 lg:justify-center'>
          {/* <Link to={'category'} state={{ activeIndex: 11, idCategory: 59 }} key={11}>
            <div className='flex flex-col gap-[2px] items-center cursor-pointer'>
              <div className='w-[60px] h-[60px]'>
                <img src={Category12} alt='icon' className='w-full h-full object-cover' />
              </div>
              <p className='text-[#3B3B3B] font-medium text-min'>{t('category')}</p>
            </div>
          </Link> */}

          <div className='flex flex-col gap-[2px] items-center cursor-pointer' onClick={() => navigate('/news-page')}>
            <div className='w-[60px] h-[60px]'>
              <img src={Category0} alt='icon' className='w-full h-full object-cover' />
            </div>
            <p className='text-[#3B3B3B] font-medium text-min'>{t('category0')}</p>
          </div>
          {categories.map((category) => (
            <Link
              to={'category'}
              state={{ activeIndex: category.index, idCategory: category.idCategory }}
              key={category.index}
            >
              <div className='flex flex-col gap-[2px] items-center'>
                <div className='w-[60px] h-[60px]'>
                  <img src={category.image} alt='icon' className='w-full h-full object-cover' />
                </div>
                <p className='text-[#3B3B3B] font-medium text-min '>{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
