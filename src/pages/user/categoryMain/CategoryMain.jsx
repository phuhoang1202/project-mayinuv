import { Dropdown, Menu, Pagination, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import CarouselCommon from '@components/carousel/CarouselCommon'
import IconChevronDown from '@assets/images/IconChevronDown.svg'
import IconHeartActive from '@assets/images/IconHeartActive.svg'
import IconHeart from '@assets/images/IconHeart.svg'
import IconStar from '@assets/images/IconStar.svg'
import PaginationRight from '@assets/icons/PaginationRight'
import PaginationLeft from '@assets/icons/PaginationLeft'
import './paginationStyles.css'

import { useCategoryStore } from '@store/user/categoryStore'
import { useProductStore } from '@store/user/productStore'
import { constants as c } from '@constants'
import { formatNumber } from '@utils/index'
import Loading from '@components/loadingCommon/Loading'

const CategoryMain = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  })
  const [subcategories, setSubcategories] = useState([])
  const [selectedSubcategory, setSelectedSubcategory] = useState()
  const [sortValue, setSortValue] = useState('quantity')

  const [searchParams, setSearchParams] = useSearchParams()
  const currentCategoryParent = searchParams.get('cate')

  const { allCategory, loadingGetAllCategory, getAllCategory } = useCategoryStore()
  const { allPrdSortByCate, getProductFindByType, loadingPrdByCategory, allDataPrdSortByCate } = useProductStore()

  useEffect(() => {
    getAllCategory()
  }, [])

  useEffect(() => {
    const form = {
      pageNumber: pagination.current - 1,
      categoryId: selectedSubcategory?.id,
      pageSize: 15,
      sort: sortValue ? (sortValue === 'quantity' ? 'quantity' : 'price') : 'quantity',
      sortBy: sortValue ? (sortValue === 'quantity' ? 'desc' : sortValue.toString()) : '',
      type: null,
    }
    getProductFindByType(
      form,
      (res) => {
        setPagination({
          ...pagination,
          total: res?.totalElements,
        })
      },
      () => {},
    )
  }, [pagination.current, sortValue])

  const callApiGetPrds = (page, cateId, pageSize, sortQuery, sortByQuery, sortType) => {
    const form = {
      pageNumber: page,
      categoryId: cateId,
      pageSize: pageSize,
      sort: sortQuery,
      sortBy: sortByQuery || '',
      type: sortType,
    }
    getProductFindByType(
      form,
      () => {},
      () => {},
    )
  }

  useEffect(() => {
    if (currentCategoryParent) {
      const category = allCategory.find((cat) => cat.name === currentCategoryParent)
      setSubcategories(category ? category.categories : [])
    } else {
      setSubcategories([])
    }
  }, [currentCategoryParent, allCategory])

  const handleCategoryClick = (categoryName) => {
    setSearchParams({ cate: categoryName })
    setCurrentPage(0)
  }

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory)
    callApiGetPrds(
      0,
      selectedSubcategory?.id,
      15,
      sortValue ? (sortValue === 'quantity' ? 'quantity' : 'price') : 'quantity',
      sortValue ? (sortValue === 'quantity' ? 'desc' : sortValue.toString()) : '',
      null,
    )
    setCurrentPage(0)
  }

  const dropdownItems = [
    {
      key: '1',
      label: 'quantity',
    },
    {
      key: '2',
      label: 'desc',
    },
    {
      key: '3',
      label: 'asc',
    },
  ]

  const menu = (
    <Menu
      onClick={(e) => {
        const selectedLabel = dropdownItems.find((item) => item.key === e.key)?.label
        setSortValue(selectedLabel)
        setCurrentPage(0)
        callApiGetPrds(
          0,
          selectedSubcategory?.id,
          15,
          selectedLabel === 'quantity' ? 'quantity' : 'price',
          selectedLabel === 'quantity' ? 'desc' : selectedLabel.toString(),
          null,
        )
      }}
    >
      {dropdownItems.map((item) => (
        <Menu.Item key={item.key}>
          <span>{item.label}</span>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div className='max-w-7xl mx-auto mt-20'>
      {/* banner */}
      <div className='mt-[26px] w-full flex justify-start items-center align-middle'>
        {loadingGetAllCategory && <Loading />}

        {allCategory && allCategory.length > 0 && (
          <>
            <div
              onClick={() => {
                setSearchParams({})
                setSelectedSubcategory(null)
                callApiGetPrds(0, null, 15, sortValue, sortValue === 'quantity' ? 'desc' : sortValue.toString(), null)
                setPagination({ ...pagination, current: 1 })
              }}
              className={`font-medium text-[12px] md:text-[16px] lg:text-[18px] rounded-3xl px-[14px] py-[6px] cursor-pointer ${
                !currentCategoryParent ? 'text-white bg-[#D1B584]' : 'text-[#8C8C8C]'
              }`}
            >
              All
            </div>

            {allCategory.map((category, index) => (
              <div
                onClick={() => handleCategoryClick(category.name)}
                key={index}
                className={`font-medium text-[12px] md:text-[16px] lg:text-[18px] rounded-3xl px-[14px] py-[6px] cursor-pointer ${
                  currentCategoryParent === category.name ? 'text-white bg-[#D1B584]' : 'text-[#8C8C8C]'
                }`}
              >
                {category.name}
              </div>
            ))}
          </>
        )}
      </div>

      {/* slider */}
      <CarouselCommon />

      {/* products */}
      <div className='my-10'>
        <div className='flex justify-between items-center align-middle '>
          {/* left */}
          <div className='md:flex justify-between block align-middle items-center'>
            {subcategories &&
              subcategories.length > 0 &&
              subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  onClick={() => handleSubcategoryClick(subcategory)}
                  className={`font-medium text-[12px] md:text-[14px] lg:text-[18px] rounded-3xl px-[14px] py-[6px] cursor-pointer ${
                    selectedSubcategory?.name === subcategory?.name ? 'text-[#282828] bg-[#EFEFEF]' : 'text-[#8C8C8C]'
                  }`}
                >
                  {subcategory.name}
                </div>
              ))}
          </div>
          {/* right */}
          <Dropdown overlay={menu} trigger={['click']}>
            <div className='rounded-lg lg:px-3 lg:py-2.5 px-1.5 py-1.25 border-solid border border-1 border-[#D3D2D2] flex justify-between w-[90px] mr-2 lg:mr-0 lg:w-[147px] cursor-pointer'>
              <>
                <span>{sortValue || '판매 인기순'}</span>
                <img src={IconChevronDown} alt='icon arrow' />
              </>
            </div>
          </Dropdown>
        </div>

        {/* products list */}
        <div className=' grid gap-y-[32px] gap-x-5 md:gap-x-3 lg:gap-x-4 lg:grid-cols-5 grid-cols-2 mt-6 '>
          {allPrdSortByCate?.length > 0
            ? allPrdSortByCate.map((item, index) => (
                <div
                  key={index}
                  className='flex-none lg:w-[240px]'
                  style={{
                    flexShrink: 0,
                    transition: 'width 0.3s',
                  }}
                >
                  <div className='relative w-full h-[280px] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center'>
                    <div className='lg:h-[280px] h-[200px]'>
                      <Link to={`/product/${item.id}`}>
                        <img
                          src={
                            item?.productImages?.find((image) => image.main === true)
                              ? `${c.DOMAIN_IMG}${item.productImages.find((image) => image.main === true)?.imageUrl}`
                              : `${c.DOMAIN_IMG}${item.productImages[0]?.imageUrl}`
                          }
                          alt={item.text}
                          className='object-cover w-full h-full'
                        />
                      </Link>
                    </div>
                    <div className='absolute top-4 right-4 w-[30px] h-[30px] bg-[#28282899] rounded-full flex justify-center items-center'>
                      <img src={item?.product?.wishList ? IconHeartActive : IconHeart} alt='icon heart' />
                    </div>
                  </div>
                  <div className='flex flex-col gap-1 justify-between mt-2'>
                    <div className='font-medium text-textPrd'>{item.productName || ''}</div>
                    <div className='flex flex-col gap-1 mt-1'>
                      <div className='flex items-center gap-1'>
                        <img src={IconStar} alt='icon star' />
                        <div className='text-normal font-medium'>
                          {item.averageRating || 0} <span className='text-[#8C8C8C]'>({item.reviewCount || 0})</span>
                        </div>
                      </div>
                      <div className='text-normal font-medium flex items-center gap-2'>
                        {item?.promotions?.find((promo) => promo.type === 'sale')
                          ? formatNumber(
                              item.price -
                                (item.price * item.promotions.find((promo) => promo.type === 'sale').discountPercent) /
                                  100,
                            )
                          : formatNumber(item?.price)}{' '}
                        <span className='text-[#8C8C8C] text-small line-through'>{item.price}</span>
                        {item?.promotions?.find((promo) => promo.type === 'sale') && (
                          <div className='w-[48px] h-[22px] bg-[#2DC033] text-white text-small rounded-full flex justify-center items-center'>
                            -{item.promotions.find((promo) => promo.type === 'sale').discountPercent}%
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='flex gap-1 mt-1'>
                      <div className='text-[#768CD6] w-[63px] h-[22px] px-1 py-2 bg-[#EFEFEF] text-min flex justify-center items-center'>
                        무료배송
                      </div>
                      <div className='text-[#E780DC] w-[63px] h-[22px] px-1 py-2 bg-[#EFEFEF] text-min flex justify-center items-center'>
                        무료배송
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>

        {/* pagination */}
        <div className='custom-pagination w-fit mx-auto mt-12 flex justify-between flex-1 items-center'>
          <PaginationLeft
            className='cursor-pointer'
            onClick={() => {
              setPagination({ ...pagination, current: 1 })
            }}
          />
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={(page, pageSize) => setPagination({ ...pagination, current: page, pageSize })}
          />

          <PaginationRight
            className='cursor-pointer'
            onClick={() => {
              setPagination({ ...pagination, current: allDataPrdSortByCate?.totalPages })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CategoryMain
