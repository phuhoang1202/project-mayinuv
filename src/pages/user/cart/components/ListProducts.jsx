import { useEffect, useState } from 'react'
import { Button, Checkbox, Dropdown, Menu, Pagination, Select, ConfigProvider, Spin, Input, Modal } from 'antd'

import IconHeartActive from '@assets/images/IconHeartActive.svg'
import IconHeart from '@assets/images/IconHeart.svg'
import CloseIcon from '@assets/icons/CloseIcon'
import TicketIcon from '@assets/icons/TicketIcon'
import ChevronDownIcon from '@assets/icons/ChevronDownIcon'
import ParkSolidIcon from '@assets/icons/ParkSolidIcon'
import PaginationRight from '@assets/icons/PaginationRight'
import PaginationLeft from '@assets/icons/PaginationLeft'
import PlusIcon from '@assets/icons/PlusIcon'
import SelectIcon from '@assets/icons/SelectIcon'
import '../CartStyles.css'

import { useCartStore } from '@store/user/cartStore'
import { constants as c } from '@constants'
import { formatNumber, formatPrice } from '@utils/index'
import { useCouponStore } from '@store/user/couponStore'
import { Toast } from '@utils/toast'
import ChevonRightIcon from '@assets/icons/ChevonRightIcon'
import { useTranslation } from 'react-i18next'

const menu = (
  <Menu>
    <Menu.Item>
      <a href='#'>Option 1</a>
    </Menu.Item>
    <Menu.Item>
      <a href='#'>Option 2</a>
    </Menu.Item>
    <Menu.Item>
      <a href='#'>Option 3</a>
    </Menu.Item>
  </Menu>
)

const options = [
  {
    value: '주문 내역을 모두 확인했고, 결제에 동의합니다.',
    label: '주문 내역을 모두 확인했고, 결제에 동의합니다.',
    description:
      'Lorem ipsum dolor sit amet consectetur. Lobortis sagittis vulputate enim tincidunt vel pulvinar id enim turpis. Eget imperdiet pellentesque justo id ut tellus senectus auctor feugiat. Pellentesque convallis egestas erat urna interdum. Posuere non ac justo tortor...',
  },
]

const { confirm } = Modal

const ListProducts = () => {
  const {
    allData,
    allPrdsOnCart,
    getCartByCondition,
    updateCartItem,
    deleteListOrderByCartIds,
    loadingGetAllPrdsOnCart,
    loadingUpdateCartItem,
    loadingCreateOrderByPrdIds,
  } = useCartStore()

  const { t } = useTranslation()

  const { getAllCoupon, loadingGetAllCoupon, allCoupon } = useCouponStore()
  const [selectedPrd, setSelectedPrd] = useState([])
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [isAgreed, setIsAgreed] = useState(false)
  const [discountSelected, setDiscountSelected] = useState({})
  const [quantities, setQuantities] = useState(0)

  useEffect(() => {
    const form = {
      pageNumber: pagination?.current - 1,
      pageSize: pagination?.pageSize,
    }
    getCartByCondition(
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

  const handleGetCoupon = () => {
    if (allCoupon.length === 0) {
      // Chỉ gọi API nếu chưa có dữ liệu
      const form = {
        pageNumber: 0,
        pageSize: 10,
        sortBy: null,
      }
      getAllCoupon(form)
    } else {
      return
    }
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  // calc total price
  const totalPrice = selectedPrd?.reduce((total, item) => {
    const discountedPrice = item?.promotions?.find((promo) => promo.type === 'sale')
      ? item.price - (item.price * item.promotions.find((promo) => promo.type === 'sale').discountPercent) / 100
      : item?.price
    return total + discountedPrice
  }, 0)

  // calculate price after discount
  const totalDiscount = !discountSelected.discountType
    ? 0
    : discountSelected.discountType === 'fixed'
    ? Number(discountSelected?.discountValue)
    : Number(totalPrice) * (Number(discountSelected?.discountValue) / 100)

  // checkbox all
  const onCheckAll = (e) => {
    const checked = e.target.checked
    setIsCheckAll(checked)
    if (checked) {
      const allPrdOfOnePage = allPrdsOnCart.map((item) => item.product)
      const newPrdToAdd = allPrdOfOnePage.filter((id) => !selectedPrd.includes(id))
      setSelectedPrd((prev) => [...prev, ...newPrdToAdd])
    } else {
      setSelectedPrd([])
      return
    }
    setIsCheckAll(checked)
  }

  // check box 1 product
  const onCheckedPrd = (e, product) => {
    const checked = e.target.checked
    if (checked) {
      setSelectedPrd((prev) => [...prev, product])
    } else {
      setSelectedPrd((prev) => {
        const newSelected = prev.filter((prd) => prd.id !== product.id)
        // Nếu uncheck một sản phẩm thì bỏ check "Chọn tất cả"
        setIsCheckAll(false)
        return newSelected
      })
    }
  }

  // checkbox confirm agree to privacy policy
  const onCheckboxChange = (e) => {
    setIsAgreed(e.target.checked)
  }

  // handle delete cart by cart id
  const handleRemove = (id) => {
    const form = {
      cartItemIds: [id],
    }
    const callApiDelete = () => {
      deleteListOrderByCartIds(
        form,
        (response) => {
          if (response?.data) {
            const form = {
              pageNumber: pagination?.current - 1,
              pageSize: pagination?.pageSize,
            }
            getCartByCondition(
              form,
              (res) => {
                setPagination({
                  ...pagination,
                  total: res?.totalElements,
                })
              },
              () => {},
            )
            Toast.success('선택한 상품이 장바구니에서 성공적으로 삭제되었습니다 !')
            return
          }
          Toast.error('장바구니에서 삭제하지 못했습니다. 다시 시도해 주세요 !')
        },
        () => {
          Toast.error('장바구니에서 삭제하지 못했습니다. 다시 시도해 주세요 !')
        },
      )
      Modal.destroyAll()
    }
    confirm({
      icon: null,
      centered: true,
      className: 'w-2/3 md:w-[390px] md:h-[180px]',
      content: (
        <div className='flex flex-1 justify-center'>
          <span className='font-medium text-[16px] leading-6 text-[#3B3B3B]'>
            선택한 상품이 장바구니에서 삭제됩니다.
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
            onClick={callApiDelete}
          >
            삭제하기
          </button>
        </div>
      ),
    })
  }

  // handle pagination
  const onPageChange = (page, pageSize) => {
    setPagination({ ...pagination, current: page, pageSize })
    setIsCheckAll(false)
  }

  // ui dropdown ticket coupon
  const menuTicket = (
    <Menu className='bg-gray-100 rounded-lg shadow-lg p-4 max-w-xs'>
      {allCoupon?.length > 0 ? (
        allCoupon.map((item, index) => (
          <Menu.Item key={index} className='mb-4 last:mb-0' onClick={() => setDiscountSelected(item)}>
            <div className='bg-white p-4 rounded-xl shadow-md relative overflow-hidden border border-gray-200'>
              {/* Vẽ đường cắt ticket ở đầu */}
              <div className='absolute top-0 left-0 h-full w-2 bg-gray-200'></div>

              <div className='text-left'>
                <p className='font-bold text-green-500 mb-2'>Discount Type: {item.discountType}</p>
                <p className='text-gray-700'>
                  Discount Value:{' '}
                  {item.discountType === 'fixed' ? formatPrice(item.discountValue) : item.discountValue + '%'}
                </p>
                <p className='text-gray-700'>Min order: {item.minOrderValue ? formatNumber(item.minOrderValue) : 0}</p>
                <p className='text-gray-700'>
                  Max discount money: {item.maxDiscountAmount ? formatNumber(item.maxDiscountAmount) : 0}
                </p>
              </div>

              {/* Vẽ đường cắt ticket ở cuối */}
              <div className='absolute bottom-0 right-0 h-full w-2 bg-gray-200'></div>
            </div>
          </Menu.Item>
        ))
      ) : (
        <span className='text-gray-500'>No coupon found!</span>
      )}
    </Menu>
  )

  const handleSelectChange = (value, attribute) => {
    console.log('handleSelectChange', value, attribute)
    const attributeTarget = attribute?.attributeOptions?.find((item) => item.optionValue === value)
    // handle change total quanlities
    setQuantities(attributeTarget.quantity)
    const form = {
      attributeOptions: [attributeTarget],
      cardId: attribute?.cart?.id,
      quantity: 0,
    }
    console.log('vào đây nè ', form)
    // updateCartItem(
    //   form,
    //   () => {},
    //   () => {},
    // )
  }

  return (
    <div className='flex'>
      <div className='max-w-[843px] w-2/3'>
        <div className='flex justify-between items-center'>
          <div className=''>
            <Checkbox onChange={onCheckAll} checked={isCheckAll} className='text-[#282828] font-medium text-[16px] '>
              전체선택
            </Checkbox>
          </div>
          <div className='flex gap-3'>
            <Button
              className='text-[#8C8C8C] font-medium text-[16px] w-[128px] h-[36px] items-center'
              // onClick={() => setIsCheckAll(!isCheckAll)}
            >
              전체선택
            </Button>
            <Button className='text-[#8C8C8C] font-medium text-[16px] w-[128px] h-[36px] items-center ml-2'>
              주문불삭제
            </Button>
          </div>
        </div>

        <div className='mt-3 bg-[#F8F8F8] p-3 rounded-lg'>
          {loadingGetAllPrdsOnCart && (
            <div className='w-full flex justify-center my-4'>
              <Spin />
            </div>
          )}
          {allPrdsOnCart?.length > 0 ? (
            allPrdsOnCart.map((item, index) => (
              <div className='w-full flex flex-1 mb-3 p-3 justify-between  gap-4 bg-white ' key={index}>
                <Checkbox
                  onChange={(e) => onCheckedPrd(e, item.product)}
                  checked={selectedPrd.some((prd) => prd.id === item.product.id)}
                  className='flex flex-1 w-full'
                >
                  <div className='relative rounded-lg overflow-hidden flex items-center justify-center'>
                    <img
                      src={
                        item?.product?.productImages?.find((image) => image.main === true)
                          ? `${c.DOMAIN_IMG}${
                              item.product.productImages.find((image) => image.main === true)?.imageUrl
                            }`
                          : `${c.DOMAIN_IMG}${item.product.productImages[0]?.imageUrl}`
                      }
                      alt={item.text}
                      className='object-cover w-auto max-w-[307px] h-auto max-h-[190px]'
                    />

                    <div className='absolute top-4 right-4 w-[30px] h-[30px] bg-[#28282899] rounded-full flex justify-center items-center'>
                      <img src={item?.product?.wishList ? IconHeartActive : IconHeart} alt='icon heart' />
                    </div>
                  </div>
                </Checkbox>

                <div className='w-full '>
                  <div className='flex justify-between'>
                    <p className='text-[#282828] font-semibold text-[18px] leading-[26px]'>
                      {item?.product?.productName}
                    </p>
                    <CloseIcon className='cursor-pointer' onClick={() => handleRemove(item?.id)} />
                  </div>

                  <div className='text-normal font-medium flex items-center gap-2'>
                    {item?.product?.promotions?.find((promo) => promo.type === 'sale')
                      ? formatNumber(
                          item.product.price -
                            (item.product.price *
                              item.product.promotions.find((promo) => promo.type === 'sale').discountPercent) /
                              100,
                        )
                      : formatNumber(item?.product?.price)}
                    <span className='text-[#8C8C8C] text-small line-through'>{formatNumber(item?.product?.price)}</span>
                    {item?.product?.promotions?.find((promo) => promo.type === 'sale') && (
                      <div className='w-[48px] h-[22px] bg-[#2DC033] text-white text-small rounded-full flex justify-center items-center'>
                        -{item.product.promotions.find((promo) => promo.type === 'sale').discountPercent}%
                      </div>
                    )}
                  </div>

                  <div className='grid grid-cols-[85%_9%] gap-4 mt-2'>
                    <div className=''>
                      {item?.product?.productAttributes?.length > 0
                        ? item?.product?.productAttributes.map((attribute, index) => {
                            return (
                              <div className='flex gap-4' key={attribute.id}>
                                <div className='flex gap-4 '>
                                  <div className='flex w-[130px] justify-between align-middle gap-2 border border-solid border-[#EFEFEF] rounded px-2 '>
                                    <div className='flex items-center font-medium text-lg'>
                                      {attribute.attributeName}:
                                    </div>
                                    <Select
                                      className='w-1/2 selectAttribute'
                                      suffixIcon={<SelectIcon />}
                                      defaultValue={
                                        attribute?.attributeOptions?.find((att) => att.selected === true)?.optionValue
                                      }
                                      onChange={(value) => handleSelectChange(value, attribute)}
                                      options={attribute.attributeOptions.map((option) => ({
                                        value: option.optionValue,
                                        label: option.optionValue,
                                      }))}
                                      placeholder={`Select ${attribute.attributeName}`}
                                    />
                                  </div>
                                </div>

                                {/* total */}
                                <div className='w-[30%]'>
                                  <div
                                    key={attribute.id}
                                    className='flex justify-between align-middle gap-2 border border-solid border-[#EFEFEF] rounded px-2 '
                                  >
                                    <div className='flex items-center font-medium text-lg'>수량:</div>

                                    <Input
                                      className=' custom-input h-[32px] w-2/3 border-0'
                                      suffix={<SelectIcon />}
                                      defaultValue={200}
                                      value={quantities}
                                      onChange={(e) => setQuantities(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        : null}
                    </div>

                    <div className='w-[32px] h-[32px] rounded-[4px] flex justify-center items-center bg-[#282828] cursor-pointer'>
                      <PlusIcon />
                    </div>
                  </div>

                  <div className='mt-4'>
                    <span className='font-medium text-[12px] leading-[18px] text-[#F14646]'>플러스 270점</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>no thing on your cart</>
          )}
        </div>

        {/* Cart pagination */}
        <div className='custom-pagination w-fit mx-auto mt-11 flex justify-between flex-1 items-center'>
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
            onChange={onPageChange}
          />

          <PaginationRight
            className='cursor-pointer'
            onClick={() => {
              setPagination({ ...pagination, current: allData?.totalPages })
            }}
          />
        </div>

        {/* footer */}
        <div className='mt-9 w-full'>
          <Select
            defaultValue='꼭 읽어주세요! (유의사항)'
            className='w-full text-[30px] font-bold custom-select'
            suffixIcon={<SelectIcon />}
            dropdownRender={() => (
              <div className='p-4 '>
                {options.map((item) => (
                  <div key={item.value} className='mb-4'>
                    <div className='font-bold mb-2 text-[#282828] text-[20px] leading-[30px]'>{item.label}</div>
                    <p className='text-[16px] font-medium leading-6 bg-white h-fit'>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          />

          <div className='flex w-full mt-4'>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#000000',
                },
              }}
            >
              <Checkbox className='text-[#333333] font-medium text-[12px]' onChange={onCheckboxChange}>
                정기결제 약관에 동의합니다. <span className='text-[#C17C00]'>필수</span>
              </Checkbox>
            </ConfigProvider>

            <span className='text-[#666666] text-[12px] font-medium ml-10'>정기결제 약관</span>
          </div>

          <div
            className={`mt-10 bg-[#D1B584] rounded-lg w-full h-11 flex justify-center items-center  ${
              isAgreed ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
            onClick={() => {
              // do something
              console.log('123')
            }}
          >
            <span className='text-[16px] font-semibold leading-6 text-white'>장바구니에 추가</span>
            <ChevonRightIcon className='ml-2' />
          </div>
        </div>
      </div>

      {/* caculator price */}
      <div className='w-1/3 max-w-[405px] ml-9 mt-12'>
        <div className=' h-fit rounded-t-lg bg-[#F8F8F8] py-3 px-4 flex flex-col gap-6 '>
          <div className=''>
            <div className='border border-solid border-[#D3D2D2] border-x-0 border-t-0 text-[#282828] text-[18px] font-semibold h-10 pt-1.5'>
              제품
            </div>
            <div className='mt-2 flex justify-between '>
              <div className=''>
                {selectedPrd?.length > 0
                  ? selectedPrd.map((item, index) => (
                      <p className='text-[#282828] text-[16px] font-medium mt-2' key={index}>
                        {item.productName}
                      </p>
                    ))
                  : null}
                <p className='text-[#333333] text-[16px] font-bold mt-2'>총 ({selectedPrd?.length || 0}개 제품)</p>
              </div>
              <div className=''>
                {selectedPrd?.length > 0
                  ? selectedPrd.map((item, index) => (
                      <p className='text-[#282828] text-[16px] font-medium mt-2' key={index}>
                        {item?.promotions?.find((promo) => promo.type === 'sale')
                          ? formatPrice(
                              item.price -
                                (item.price * item.promotions.find((promo) => promo.type === 'sale').discountPercent) /
                                  100,
                            )
                          : formatPrice(item?.price)}
                      </p>
                    ))
                  : null}

                {/* total price here */}
                <p className='text-[#333333] text-[16px] font-bold mt-2 text-right'>{formatPrice(totalPrice)}</p>
              </div>
            </div>
          </div>
          <div className=''>
            <div className='border border-solid border-[#D3D2D2] border-x-0 border-t-0  h-10 flex justify-between items-center'>
              <span className='text-[#282828] text-[18px] font-semibold'>요금</span>
              <Dropdown overlay={menuTicket} trigger={['click']}>
                <div
                  className=' rounded-[4px] px-1.5 h-7 w-[60px] flex justify-between align-middle items-center cursor-pointer'
                  onClick={handleGetCoupon}
                >
                  <TicketIcon />
                  {loadingGetAllCoupon ? <Spin /> : <SelectIcon />}
                </div>
              </Dropdown>
            </div>

            <div className='mt-2 flex justify-between '>
              <div className=''>
                <p className='text-[#282828] text-[16px] font-medium mt-2'>{t('shippingFee')}</p>
                <p className='text-[#282828] text-[16px] font-medium mt-2 flex '>
                  쿠폰사용
                  <div className='bg-[#D3D2D2] rounded-[4px] px-1 h-[22px] w-fit flex justify-around align-middle items-center ml-2'>
                    <TicketIcon className='w-4.5 h-4.5' width='18' />
                    <span className='text-[#282828] text-[12px] font-medium leading-4'>
                      {discountSelected && discountSelected.discountType ? (
                        discountSelected.discountType === 'fixed' ? (
                          <span className='ml-0.5'>{formatPrice(discountSelected.discountValue)}</span>
                        ) : (
                          <span className='ml-0.5'>{discountSelected.discountValue}%</span>
                        )
                      ) : (
                        <span>0</span>
                      )}{' '}
                      할인
                    </span>
                  </div>
                </p>
                <p className='text-[#282828] text-[16px] font-medium mt-2'>충전포인트 결제</p>
                <p className='text-[#333333] text-[16px] font-bold mt-2'>총</p>
              </div>
              <div className=''>
                {' '}
                <p className='text-[#282828] text-[16px] font-medium mt-2 text-right'>17.000원</p>
                <p className='text-[#282828] text-[16px] font-medium mt-2 text-right'>
                  -{formatPrice(Number(totalDiscount))}
                </p>
                <p className='text-[#282828] text-[16px] font-medium mt-2 text-right'>17.000원</p>
                <p className='text-[#333333] text-[16px] font-bold mt-2 text-right'>17.000원</p>
              </div>
            </div>
            <div className='text-[#F14646] text-[10px] font-bold mt-2 flex flex-1 justify-end items-center align-middle'>
              <ParkSolidIcon />
              <span className='ml-1'>150개 상품부터 무료배송해드립니다</span>
            </div>
          </div>
          <div className=''>
            <div className='h-10 flex justify-between items-center'>
              <span className='text-[#282828] text-[18px] font-semibold'>지불 방식</span>
              <Dropdown overlay={menu} trigger={['click']}>
                <div className='bg-[#D3D2D2] rounded-[4px] px-3 py-1.5 h-9 w-[112px] flex justify-evenly align-middle items-center cursor-pointer'>
                  <span className='text-[#282828] text-[16px] font-medium leading-6'>착불택배</span>
                  <ChevronDownIcon />
                </div>
              </Dropdown>
            </div>
            <div className='mt-2 flex flex-1 justify-end'>
              <span className='text-[#666666] leading-6.5 text-[12px] font-medium'>
                상품에 세금이 포함되어 있습니다
              </span>
            </div>
          </div>
        </div>

        <div className='rounded-b-lg py-[17px] px-4 justify-between flex h-[100px] bg-[#282828] items-center'>
          <span className='text-[20px] text-white font-bold '>총 ({selectedPrd?.length || 0}개 제품)</span>
          <div className='text-right'>
            <span className='text-[20px] text-white font-bold '>99.000 원</span> <br />
            <span className='text-[20px] text-white font-bold '>적립예정 237원 (1%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListProducts
