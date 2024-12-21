import { useEffect, useState } from 'react'
import { ExclamationCircleOutlined, InboxOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Tag, Pagination, Select, Upload, message, Spin } from 'antd'
import moment from 'moment'
import TableAdmin from '@pages/admin/components/common/TableAdmin'
import Card from '@pages/admin/components/card'
import IconAddProduct from '@assets/icons/admin/IconAddProduct.svg'
import IconSearch from '@assets/icons/admin/IconSearch.svg'
import { constants as c } from '@constants'
import { formatPrice } from '@utils'
import { useProductStore } from '@store/admin/productStore'
import { Toast } from '@utils/toast'
import { getColorTableAdmin } from '@utils/index'
import IconEdit from '@assets/icons/admin/IconEdit.jsx'
import IconTrash from '@assets/images/admin/IconTrash.svg'
import { product } from '@services/admin/product'
import { useLocation, useNavigate } from 'react-router-dom'
const { Dragger } = Upload
const { confirm } = Modal
import ImageError from '@assets/images/ImageError.svg'
import Loading from '@components/loadingCommon/Loading'

const ManagerBoard = () => {
  const { deleteListPrd, findPrdByConditions, deletePrdById, loadingDeletePrdById } = useProductStore((state) => state)

  // const { allCategories } = useCategoryStore((state) => state)
  // const { allPromotions } = usePromotionStore()
  const [searchText, setSearchText] = useState('')
  const [searchTextTranslate, setSearchTextTranslate] = useState('')
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [dataProduct, setDataProduct] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // import file
  const [fileImport, setFileImport] = useState([])
  // time import fil
  const [timeImport, setTimeImport] = useState(0)

  // Add pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  })

  const location = useLocation()

  const handleSearchTable = async () => {
    try {
      setSearchTextTranslate(searchText)
      fetchDataProduct(0, 8, searchText)
    } catch (error) {
      console.error('Error translating text:', error)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const fetchDataProduct = async (pageNumber = 0, pageSize = 8, translatedText = searchTextTranslate) => {
    try {
      setLoading(true)
      const bodyPayload = {
        pageNumber,
        pageSize: 8,
        name: translatedText,
        sort: 'desc',
        platformType: 'tyc',
        status: 'active',
      }
      const response = await product.getProductByCondition(bodyPayload)
      setDataProduct(response.data.content)
      setPagination((prev) => ({
        ...prev,
        total: response.data.totalElements,
      }))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const page = parseInt(queryParams.get('page'), 10) || 1
    const pageSize = parseInt(queryParams.get('pageSize'), 10) || 8

    fetchDataProduct(page - 1, pageSize)
    setPagination((prev) => ({ ...prev, current: page, pageSize }))
  }, [location.search])

  // useEffect(() => {
  //   if (pagination.current > 0 && pagination.pageSize > 0) {
  //     fetchDataProduct(pagination.current - 1, pagination.pageSize)
  //   }
  // }, [pagination.current])

  const handlePageChange = (page) => {
    navigate(`/admin/manager-product?page=${page}`)

    // setPagination((prev) => ({
    //   ...prev,
    //   current: page,
    //   pageSize,
    // }))
  }

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const showDeleteListPrd = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <p className='text-[#333333]'>Do you want to delete there products?</p>,
      onOk() {
        const listPrd = {
          productIds: [...selectedRowKeys],
        }
        deleteListPrd(
          listPrd,
          () => {
            Toast.success('Delete products success !')
            fetchDataProduct(pagination.current - 1, pagination.pageSize)
          },
          () => {
            Toast.error('Delete product failed !')
          },
        )
      },
      onCancel() {
        Modal.destroyAll()
      },
    })
  }

  const showDeleteModal = (productId) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <p className='text-[#333333] font-medium'>Do you want to delete this product?</p>,
      onOk() {
        const payload = {
          productId: productId,
          status: 'deleted',
        }

        deletePrdById(
          payload,
          () => {
            Toast.success('Delete product success !')
            fetchDataProduct(pagination.current - 1, pagination.pageSize)
          },
          () => {
            Toast.error('Delete product failed !')
          },
        )
      },
      onCancel() {
        Modal.destroyAll()
      },
    })
  }

  const columnsTable = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      render: (_, stt) => {
        console.log(stt)
      },
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'start',
      width: '130px',
    },
    {
      title: 'Name',
      dataIndex: 'productName',
      key: 'productName',
      sorter: (a, b) => a.name.localeCompare(b.name),
      align: 'start',
      width: '200px',
    },
    {
      title: 'Images',
      dataIndex: 'productImages',
      key: 'productImages',
      align: 'start',
      render: (text, record) => {
        const arrCheck = ['detail', 'product']
        const mainImage = record.productImages.find((image) => image.main === true)
        const productImage = record.productImages.find((image) => image.imageType === 'product')
        const imageToShow = mainImage || productImage

        const imageUrl = imageToShow?.imageUrl || ''
        const isImageMatched = arrCheck.some((prefix) => imageUrl?.startsWith(prefix))
        const finalImageUrl = isImageMatched ? `${c.DOMAIN_IMG}${imageUrl}` : imageUrl

        return (
          <img
            className='w-[100px] h-[60px] object-cover'
            src={finalImageUrl}
            alt='images'
            loading='lazy'
            onError={(e) => {
              console.log('Image load failed:')
              e.target.onerror = null
              e.target.src = ImageError
            }}
          />
        )
      },
    },
    {
      title: 'Category',
      dataIndex: 'categories',
      key: 'lastModcategoriesifiedDate',
      align: 'start',
      width: '120px',
      render: (record) => <span>{record.name}</span>,
    },
    {
      title: 'Short Desc',
      dataIndex: 'generalDescription',
      key: 'generalDescription',
      align: 'start',
      render: (text) => (
        <div
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 200,
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'start',
      render: (text) => <span>{formatPrice(text)}</span>,
    },
    {
      title: 'Stock',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
      align: 'start',
    },
    {
      title: 'Promotions',
      dataIndex: 'promotions',
      key: 'promotions',
      align: 'start',
      render: (promotions, _) => {
        return promotions?.length > 0
          ? promotions.map((promotion, index) => {
              const { color, bgColor } = getColorTableAdmin(promotion.type) // Lấy màu chữ và màu nền từ getColorTableAdmin

              return (
                <Tag
                  className='m-[1px]'
                  key={index}
                  style={{
                    color: color, // Áp dụng màu chữ
                    backgroundColor: bgColor, // Áp dụng màu nền
                    textTransform: 'capitalize', // Biến đổi chữ cái đầu tiên thành viết hoa
                  }}
                >
                  {promotion.name}
                </Tag>
              )
            })
          : null
      },
    },
    {
      title: 'Create Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'start',
      render: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   align: 'center',
    // },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <div>
          <div>
            <Button
              type='button'
              onClick={() =>
                navigate(
                  `/admin/manager-product/edit-product/${record.id}?page=${pagination.current}&pageSize=${pagination.pageSize}`,
                )
              }
            >
              <IconEdit />
            </Button>
          </div>
          <div>
            <Button type='button' onClick={() => showDeleteModal(record.id)}>
              <img src={IconTrash} alt='icon' />
            </Button>
          </div>
        </div>
      ),
    },
  ]

  const navigate = useNavigate()

  // function modal import file
  const showModal = () => {
    setFileImport([])
    setIsModalOpen(true)
  }

  const handleOk = () => {
    const formData = new FormData()
    formData.append('file', fileImport[0].originFileObj)
    if (Array.isArray(fileImport) && fileImport.length == 0) return

    product.importFile(formData).then((res) => {
      setTimeImport(res.data)
      setFileImport([])
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setFileImport([])
  }

  const props = {
    name: 'file',
    multiple: false,
    fileList: fileImport, // Đảm bảo đây luôn là một mảng
    customRequest: ({ file, onSuccess }) => {
      const isExcel = file.name.endsWith('.xlsx') // Kiểm tra định dạng file
      if (!isExcel) {
        message.error(`${file.name} is not a valid .xlsx file.`)
        return isExcel // Chỉ chấp nhận file .xlsx
      }
      // Cập nhật file mới vào state
      setFileImport([file])

      // Giả lập upload thành công
      setTimeout(() => {
        onSuccess('ok')
      }, 1000)
    },
    onChange(info) {
      const isExcel = info.file.name.endsWith('.xlsx') // Kiểm tra định dạng file
      if (!isExcel) {
        message.error(`${file.name} is not a valid .xlsx file.`)
        return isExcel // Chỉ chấp nhận file .xlsx
      }
      // Cập nhật file mới
      setFileImport([info.file]) // Chuyển thành mảng chỉ chứa file mới
    },
    onRemove: (file) => {
      setFileImport([]) // Xóa tất cả file
    },
    onDrop: (e) => {
      const isExcel = e.dataTransfer.files.name.endsWith('.xlsx') // Kiểm tra định dạng file
      if (!isExcel) {
        message.error(`${file.name} is not a valid .xlsx file.`)
        return isExcel // Chỉ chấp nhận file .xlsx
      }
      setFileImport([e.dataTransfer.files])
    },
  }

  return (
    <div>
      <Card extra={'w-full h-[87vh] p-4'}>
        <div>
          <div className='flex justify-between m-6'>
            <div className='flex justify-between'>
              <Button
                type='button'
                onClick={() => navigate('/admin/manager-product/add-product')}
                className='text-[#5B4DFB] bg-[#EFEEFF] font-medium text-normal h-9 rounded-lg flex items-center justify-center gap-0'
              >
                <img src={IconAddProduct} alt='icon' />
                Add New Product
              </Button>

              {selectedRowKeys?.length > 0 && (
                <Button
                  type='button'
                  onClick={showDeleteListPrd}
                  className='text-white  bg-[#F14646] hover:bg-[#f15b5b] font-medium text-normal rounded-lg px-4 h-9 ml-2'
                >
                  Delete products
                </Button>
              )}
              <Button
                type='button'
                onClick={showModal}
                className='text-[#5B4DFB] bg-[#EFEEFF] font-medium text-normal h-9 rounded-lg flex items-center justify-center gap-0 ml-2'
              >
                <img src={IconAddProduct} alt='icon' />
                Import file
              </Button>
            </div>
            {/* <Input.Search
            placeholder='Search by product name'
            onSearch={handleSearchTable}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            className='w-1/3'
          /> */}

            <div className='flex items-center flex-col lg:flex-row gap-4 lg:mt-0 mt-4'>
              <div className='flex flex-col md:flex-row items-center w-full md:w-auto relative '>
                <Input
                  placeholder='검색 프로모션'
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  className='lg:w-[400px] w-full h-9'
                />
                <img
                  src={IconSearch}
                  alt='icon'
                  onClick={handleSearchTable}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                />
              </div>

              <div>
                <Select
                  showSearch
                  placeholder='Select a person'
                  className='h-9 w-[170px]'
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={[
                    {
                      value: '1',
                      label: 'Jack',
                    },
                    {
                      value: '2',
                      label: 'Lucy',
                    },
                    {
                      value: '3',
                      label: 'Tom',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='h-full  mt-4'>
          {loading && <Loading />}
          <TableAdmin columns={columnsTable} dataSource={dataProduct} pagination={false} rowSelection={rowSelection} />
        </div>
        <div className='flex justify-end'>
          <Pagination
            className='mt-6'
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper
          />
        </div>

        <Modal
          loading={loadingDeletePrdById}
          title='Delete Product'
          visible={isDeleteModalVisible}
          onCancel={() => setIsDeleteModalVisible(false)}
        >
          <p>Are you sure you want to delete this category?</p>
        </Modal>
      </Card>

      <Modal title='Import file' open={isModalOpen} okText='Submit' onOk={handleOk} onCancel={handleCancel}>
        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>Click or drag file to this area to upload</p>
          <p className='ant-upload-hint'>
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
          </p>
          <p className='ant-upload-hint'>Format file import .xlsx</p>
        </Dragger>
        {timeImport > 0 && (
          <div className='time-import mt-4 text-[primary]'>
            <div className='w-full'>
              <span className='font-bold'>Product addition is in progress</span>
              <Spin className='ml-4'></Spin>
            </div>
            <div className='time-import text-[#00000073]'>
              <span className='ant-upload-hint'>Estimated time: </span>
              <span>~ {Math.round(timeImport / 60) < 5 ? 5 : Math.round(timeImport / 60)} minutes</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ManagerBoard
