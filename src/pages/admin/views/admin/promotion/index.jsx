import React, { useEffect, useState } from 'react'
import { Badge, Button, Form, Input, message, Modal, Tag, Pagination, Flex } from 'antd'
import moment from 'moment'
import Card from '@pages/admin/components/card'
import IconAddProduct from '@assets/icons/admin/IconAddProduct.svg'
import IconSearch from '@assets/icons/admin/IconSearch.svg'
import ModalAdmin from '@pages/admin/components/common/ModalAdmin'
import TablleAdmin from '@pages/admin/components/common/TableAdmin'
import {
  getPromotion,
  postPromotion,
  updatePromotion,
  deletePromotion,
  panigationPromotion,
  searchPromotion,
  deleteSelectedPromotion,
} from '@services/admin/promotion'
import { Toast } from '@utils/toast'
import { DeleteOutlined, EditOutlined, LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const ManagerPromotion = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8, total: 0 })
  const [loading, setLoading] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const [form] = Form.useForm()
  const [addForm] = Form.useForm()

  useEffect(() => {
    fetchPromotions(pagination.current, pagination.pageSize)
  }, [pagination.current, pagination.pageSize])

  const fetchPromotions = async (pageNumber, pageSize) => {
    setLoading(true)
    try {
      const response = await panigationPromotion({ pageNumber: pageNumber - 1, pageSize })
      let result = response.data.content
      result = result.map((el) => {
        if (el.type == 'new_product') el.type = 'new'
        return el
      })
      setData(result)
      setFilteredData(result)
      setPagination({
        ...pagination,
        total: response.data.totalElements,
      })
    } catch (error) {
      Toast.error('Failed to fetch promotions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getColor = (type) => {
    switch (type) {
      case 'sale':
        return 'magenta'
      case 'ship':
        return 'volcano'
      case 'event':
        return 'green'
      case 'bonus':
        return 'cyan'
      case 'recommend':
        return 'blue'
      case 'new':
        return 'purple'
      case 'best':
        return 'gold'
      default:
        return ''
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
  }

  const searchPromotions = async (searchParams) => {
    setLoading(true)
    try {
      const response = await searchPromotion(searchParams)
      setFilteredData(response.data.content)
      setPagination({
        ...pagination,
        total: response.data.totalElements,
      })
    } catch (error) {
      Toast.error('Failed to search promotions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    const searchParams = {
      promotionName: searchText,
      pageNumber: pagination.current - 1,
      pageSize: pagination.pageSize,
    }
    searchPromotions(searchParams)
  }

  const showEditModal = (category) => {
    setCurrentCategory(category)
    form.setFieldsValue({
      ...category,
      dateRange: [dayjs(category.startDate), dayjs(category.endDate)],
    })
    setIsEditModalVisible(true)
  }

  const handleEdit = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      const updatedCategory = {
        ...currentCategory,
        ...values,
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
      }
      await updatePromotion(updatedCategory)
      fetchPromotions(pagination.current, pagination.pageSize)
      setIsEditModalVisible(false)
      message.success('Promotion updated successfully')
    } catch (error) {
      console.error('Failed to update promotion:', error)
      message.error('Failed to update promotion')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setLoading(true)
    try {
      await deletePromotion(id)
      fetchPromotions(pagination.current, pagination.pageSize)
      setIsDeleteModalVisible(false)
      message.success('Promotion deleted successfully')
    } catch (error) {
      console.error('Error deleting promotion:', error)
      message.error('Failed to delete promotion')
    } finally {
      setLoading(false)
    }
  }

  const handleBulkDelete = async () => {
    setLoading(true)
    try {
      await deleteSelectedPromotion({
        productIds: selectedRowKeys,
      })
      fetchPromotions(pagination.current, pagination.pageSize)
      setSelectedRowKeys([])
      message.success('Selected promotions deleted successfully')
    } catch (error) {
      console.error('Error deleting promotions:', error)
      message.error('Failed to delete selected promotions')
    } finally {
      setLoading(false)
    }
  }

  const showDeleteModal = (id) => {
    setDeleteCategoryId(id)
    setIsDeleteModalVisible(true)
  }

  const showAddModal = () => {
    addForm.resetFields()
    setIsAddModalVisible(true)
  }

  const handleAdd = async () => {
    setLoading(true)
    try {
      const values = await addForm.validateFields()
      const newPromotion = {
        ...values,
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
      }
      await postPromotion(newPromotion)
      fetchPromotions(pagination.current, pagination.pageSize)
      setIsAddModalVisible(false)
      message.success('Promotion added successfully')
    } catch (error) {
      message.error('Failed to add promotion')
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      align: 'center',
    },
    {
      title: 'Discount Percent',
      dataIndex: 'discountPercent',
      key: 'discountPercent',
      align: 'center',
      render: (text) => `${text} %`,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
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
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      render: (text) => (
        <Tag color={getColor(text)} style={{ textTransform: 'capitalize' }}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      render: (text) => <Badge color={text ? 'green' : 'volcano'} text={text ? 'Active' : 'Inactive'} />,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      render: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
      render: (text) => (text ? moment(text).format('DD-MM-YYYY HH:mm:ss') : ''),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <span>
          <Button
            type='button'
            className='text-[#333333]  hover:bg-cyan-600 hover:text-white focus:ring-4 focus:ring-cyan-300 rounded-lg text-sm px-2 py-2 me-2 focus:outline-none'
            onClick={() => showEditModal(record)}
          >
            <EditOutlined style={{ fontSize: '18px' }} />
          </Button>
          <Button
            type='button'
            className='text-[#333333] hover:bg-red-400 hover:text-white focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-2 py-2'
            onClick={() => showDeleteModal(record.id)}
          >
            <DeleteOutlined style={{ fontSize: '18px' }} />
          </Button>
        </span>
      ),
    },
  ]

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0

  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <LeftOutlined />
    }
    if (type === 'next') {
      return <RightOutlined />
    }
    if (type === 'page') {
      return originalElement
    }
    if (type === 'jump-next' || type === 'jump-prev') {
      return '...'
    }
  }

  return (
    <div>
      <Card extra={'w-full h-full p-4'}>
        <div>
          <div className='flex flex-col md:flex-row justify-between m-6'>
            <Button
              type='button'
              onClick={showAddModal}
              className='text-[#5B4DFB] bg-[#EFEEFF] font-medium text-normal h-9 rounded-lg flex items-center justify-center gap-0'
            >
              <img src={IconAddProduct} alt='icon' />
              Add New Promotion
            </Button>

            <div className='flex items-center flex-col lg:flex-row gap-4 lg:mt-0 mt-4'>
              <div className='flex flex-col md:flex-row items-center w-full md:w-auto relative '>
                <Input
                  placeholder='검색 프로모션'
                  onKey={handleKeyPress}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  className='lg:w-[400px] w-full h-9'
                />
                <img
                  src={IconSearch}
                  alt='icon'
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={handleSearch}
                />

                {hasSelected && (
                  <Button
                    type='button'
                    onClick={handleBulkDelete}
                    className='text-white bg-red-500 hover:bg-red-400 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-2 py-2'
                  >
                    <DeleteOutlined /> Delete Selected
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='h-full overflow-x-scroll xl:overflow-x-hidden mt-4'>
          <Flex gap='middle' vertical>
            <TablleAdmin
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredData}
              loading={loading}
              pagination={false}
              onTableChange={handleTableChange}
            />
            <Pagination
              className='mt-6'
              align='end'
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={(page, pageSize) => setPagination({ ...pagination, current: page, pageSize })}
              itemRender={itemRender}
            />
          </Flex>
        </div>
      </Card>

      <ModalAdmin
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEdit}
        form={form}
        initialValues={currentCategory}
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'discountPercent', label: 'Discount Percent' },
          { name: 'description', label: 'Description' },
          { name: 'type', label: 'Type' },
          { name: 'active', label: 'Active' },
          { name: 'dateRange', label: 'Date Range' },
        ]}
        title='Edit Promotion'
      />

      <ModalAdmin
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={handleAdd}
        form={addForm}
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'discountPercent', label: 'Discount Percent' },
          { name: 'description', label: 'Description' },
          { name: 'type', label: 'Type' },
          { name: 'active', label: 'Active' },
          { name: 'dateRange', label: 'Date Range' },
        ]}
        title='Add Promotion'
      />

      <Modal
        title='Delete Promotion'
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={() => handleDelete(deleteCategoryId)}
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </div>
  )
}

export default ManagerPromotion
