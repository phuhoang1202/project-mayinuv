import { useEffect, useState } from 'react'
import { Spin, Pagination, Modal, Select, Input, Form } from 'antd'
import { useNavigate } from 'react-router-dom'

import CheckedIcon from '@assets/icons/CheckedIcon'
import IconStar from '@assets/images/IconStar.svg'
import PaginationRight from '@assets/icons/PaginationRight'
import PaginationLeft from '@assets/icons/PaginationLeft'
import IconHeartActive from '@assets/images/IconHeartActive.svg'
import IconHeart from '@assets/images/IconHeart.svg'
import SelectIcon from '@assets/icons/SelectIcon'

import { constants as c } from '@constants'
import { useProductStore } from '@store/user/productStore'
import { formatNumber } from '@utils/index'
import { Toast } from '@utils/toast'
import { useCartStore } from '@store/user/cartStore'
import { useUserStore } from '@store/user/userStore'

const { confirm } = Modal

const WishList = () => {
  const navigate = useNavigate()
  const { getAllWishList, allDataPrdSortByCate, wishListPrds, tickWishList, loadingGetWisPrd } = useProductStore()
  const { userInfo, getCurrentUserInfo } = useUserStore()
  const { addToCart, loadingCreateOrderByPrdIds } = useCartStore()
  const [checkedItems, setCheckedItems] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemSelected, setItemSelected] = useState({})
  const [attributeSelected, setAttributeSelected] = useState([])
  const [quantities, setQuantities] = useState('')
  const [prdSelectedId, setPrdSelectedId] = useState('')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  })

  useEffect(() => {
    getCurrentUserInfo()
  }, [])

  useEffect(() => {
    const form = {
      pageNumber: pagination.current - 1,
      pageSize: pagination.pageSize,
    }
    getAllWishList(
      form,
      (res) => {
        setPagination({
          ...pagination,
          total: res?.totalElements,
        })
      },
      () => {},
    )
  }, [pagination.current])

  const handleCancel = () => {
    setIsModalOpen(false)
    setPrdSelectedId('')
    setAttributeSelected([])
    setQuantities('')
    setItemSelected({})
    setCheckedItems([])
  }

  const handleTotalChange = (total) => {
    const maxTotal = itemSelected.stockQuantity
    total <= maxTotal ? setQuantities(total) : setQuantities(maxTotal)
  }

  const handleSelectChange = (item, value) => {
    console.log('handleSelectChange', item, value)

    const attributeTarget = item.attributeOptions?.find((option) => option.optionValue === value)

    // Kiểm tra xem attributeTarget.productAttributeId có trong attributeSelected không
    const existingAttribute = attributeSelected.find(
      (attr) => attr.productAttributeId === attributeTarget.productAttributeId,
    )

    if (existingAttribute) {
      // Nếu đã có, loại bỏ mục cũ và thêm mục mới vào state
      setAttributeSelected((prevState) =>
        prevState.map((attr) =>
          attr.productAttributeId === existingAttribute.productAttributeId ? attributeTarget : attr,
        ),
      )
    } else {
      // Nếu không có, thêm mục mới vào state
      setAttributeSelected((prevState) => [...prevState, attributeTarget])
    }
  }

  const handleCheck = (prd) => {
    setCheckedItems([prd.id])
    setIsModalOpen(true)
    setItemSelected(prd)
    setPrdSelectedId(prd.id)
  }

  const handleOrderByPrdIds = () => {
    const form = {
      attributeOptions: attributeSelected,
      productId: prdSelectedId,
      quantity: Number(quantities),
    }
    addToCart(
      form,
      (res) => {
        if (res.data) {
          Toast.success('Order success !')
          setTimeout(() => {
            console.log('Navigating to /cart')
            navigate('/cart', { state: { tab: '1' } })
          }, 800)
        } else {
          Toast.error('Order error !')
        }
      },
      () => {
        Toast.error('Order error !')
      },
    )
    setCheckedItems([])
    setAttributeSelected([])
    setIsModalOpen(false)
    setPrdSelectedId('')
    setQuantities('')
    setItemSelected({})
  }

  const handleTickWishList = (id) => {
    const callApiTickWishList = () => {
      const form = {
        productId: id,
        userId: userInfo?.id,
      }

      tickWishList(
        form,
        () => {
          const form = {
            pageNumber: 0,
            pageSize: pagination.pageSize,
          }
          getAllWishList(
            form,
            (res) => {
              setPagination({
                ...pagination,
                total: res?.totalElements,
              })
            },
            () => {},
          )
        },
        () => {},
      )
      Modal.destroyAll()
    }
    confirm({
      icon: null,
      centered: true,
      header: null,
      className: 'w-2/3 md:w-[390px] md:h-[180px]',
      content: (
        <div className='flex flex-1 justify-center'>
          <span className='font-medium text-[16px] leading-6 text-[#3B3B3B]'>
            선택한 상품이 찜 리스트에서 삭제됩니다.
          </span>
        </div>
      ),
      cancelText: '취소',
      okText: '구매하기',
      footer: (
        <div className='flex justify-between py-2 w-full gap-6 mt-6'>
          <button
            className='bg-[#D1B584] px-2.5 rounded-lg h-11 flex-1 text-[#FFFFFF] text-[16px] font-semibold'
            onClick={() => Modal.destroyAll()}
          >
            취소
          </button>
          <button
            className='bg-white border border-solid border-[#3B3B3B] px-2.5 rounded-lg h-11 flex-1 text-[#3B3B3B] text-[16px] font-semibold '
            onClick={callApiTickWishList}
          >
            삭제하기
          </button>
        </div>
      ),
    })
  }

  return (
    <div className='w-full'>
      <Modal
        open={isModalOpen}
        centered='true'
        className='w-2/3 md:w-[390px] md:h-[180px]'
        closable={false}
        footer={null}
      >
        <div className='flex flex-1 flex-col gap-4 justify-center'>
          {/* attribute */}
          {itemSelected?.productAttributes?.length > 0
            ? itemSelected?.productAttributes.map((item) => (
                <div key={item.id}>
                  <span className='font-bold text-[16px] leading-6 text-[#282828]'>{item.attributeName}</span> <br />
                  <Select
                    className='w-full flex flex-1 mt-0.5'
                    suffixIcon={<SelectIcon />}
                    onChange={(value) => handleSelectChange(item, value)}
                    options={item.attributeOptions.map((option) => ({
                      value: option.optionValue,
                      label: option.optionValue,
                    }))}
                    placeholder={`${item.attributeName}`}
                  />
                </div>
              ))
            : null}

          {/* total */}
          <div>
            <span className='font-bold text-[16px] leading-6 text-[#282828]'>수량</span> <br />
            <Input
              className='h-[32px] mt-0.5'
              placeholder='수량 입력'
              value={quantities}
              onChange={(e) => handleTotalChange(e.target.value)}
            />
          </div>

          <div className='flex justify-between py-2 w-full gap-6 mt-6'>
            <button
              className='bg-white border border-solid border-[#3B3B3B] px-2.5 rounded-lg h-11 flex-1 text-[#3B3B3B] text-[16px] font-semibold '
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              className='bg-[#D1B584] px-2.5 rounded-lg h-11 flex-1 text-[#FFFFFF] text-[16px] font-semibold'
              onClick={handleOrderByPrdIds}
            >
              장바구니에 추가
            </button>
          </div>
        </div>
      </Modal>
      {/* <div className='relative'>
        <div
          className='rounded-lg bg-[#D1B584] flex justify-center items-center w-[187px] h-11 absolute right-0 -top-[5.5rem] cursor-pointer'
          onClick={handleOrderByPrdIds}
        >
          <span className='text-white text-[16px] leading-6 font-semibold'>장바구니에 추가 </span>
          <ChevonRightIcon className='ml-2' />
        </div>
      </div> */}

      <div className='mt-[32px]'>
        {loadingGetWisPrd ? (
          <div className='w-full my-4 flex justify-center'>
            <Spin />
          </div>
        ) : null}

        {wishListPrds?.length > 0 ? (
          <>
            <div className=' grid gap-y-[32px] gap-x-5 md:gap-x-3 lg:gap-x-4 lg:grid-cols-5 grid-cols-2 mt-6  '>
              {wishListPrds.map((item, index) => (
                <div
                  key={index}
                  className='flex-none w-auto max-w-[240px]'
                  style={{
                    flexShrink: 0,
                    transition: 'width 0.3s',
                  }}
                >
                  <div
                    className={`relative w-full h-[280px] ${
                      checkedItems.includes(item.id) ? 'bg-[#64ff2c]' : 'bg-gray-200'
                    } rounded-lg overflow-hidden flex items-center justify-center`}
                  >
                    <img
                      src={
                        item?.productImages?.find((image) => image.main === true)
                          ? `${c.DOMAIN_IMG}${item.productImages.find((image) => image.main === true)?.imageUrl}`
                          : `${c.DOMAIN_IMG}${item.productImages[0]?.imageUrl}`
                      }
                      alt={item.text}
                      className='object-cover w-full h-full'
                    />
                    <div className='absolute top-4 right-14 w-[30px] h-[30px] bg-[#28282899] rounded-full flex justify-center items-center'>
                      <img
                        src={item.wishList ? IconHeartActive : IconHeart}
                        alt='icon heart'
                        className='cursor-pointer'
                        onClick={() => handleTickWishList(item.id)}
                      />
                    </div>
                    <div
                      className={`absolute top-4 right-4 w-[30px] h-[30px] rounded-full flex justify-center items-center cursor-pointer ${
                        checkedItems.includes(item.id) ? 'bg-[#36BDF7]' : 'bg-transparent'
                      }`}
                      onClick={() => handleCheck(item)}
                    >
                      <span className='flex justify-center align-middle w-full h-full rounded-full border-[1.5px] border-white '>
                        {checkedItems.includes(item.id) && <CheckedIcon className='mt-2' />}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1 justify-between mt-2.5'>
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
              ))}
            </div>
          </>
        ) : null}

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

export default WishList
