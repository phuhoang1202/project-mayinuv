import React, { useEffect, useState } from 'react'
import { Badge, Button, Form, Input, message, Modal, Pagination, Flex, Tooltip } from 'antd'
import Card from '@pages/admin/components/card'
import ModalAdmin from '@pages/admin/components/common/ModalAdmin'
import TablleAdmin from '@pages/admin/components/common/TableAdmin'
// import {
//   postPromotion,
//   updatePromotion,
//   deletePromotion,
//   panigationPromotion,
//   searchPromotion,
//   deleteSelectedPromotion,
// } from '@services/admin/promotion'

import { getAllUsers } from '@services/admin/member'
import dayjs from 'dayjs'
import { Toast } from '@utils/toast'
import { DeleteOutlined } from '@ant-design/icons'
import IconAddProduct from '@assets/icons/admin/IconAddProduct.svg'
import IconSearch from '@assets/icons/admin/IconSearch.svg'
import IconEdit from '@assets/icons/admin/IconEdit.jsx'
import IconLock from '@assets/icons/admin/IconLock.jsx'
import MemberInformation from './featureMember/MemberInformation'
import AddNewMember from './featureMember/AddNewMember'
import HistoryMember from './featureMember/HistoryMember'
import { exportService } from '@services/admin/exportService'
import { getToken } from '@utils/auth.js'
import { useNavigate } from 'react-router-dom'
import { constants as c } from '@constants'

const ManagerMember = () => {
  const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [form] = Form.useForm()
  const [addForm] = Form.useForm()
  const accessToken = getToken('token') || ''
  const fetchAllUser = async () => {
    setLoading(true)
    try {
      const bodyPayload = {
        enable: true,
        pageNumber: 0,
        pageSize: 8,
      }
      const response = await getAllUsers(bodyPayload)

      setFilteredData(response.data.content)
    } catch (error) {
      Toast.error('Failed to fetch promotions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllUser()
  }, [])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  // const handleTableChange = (pagination) => {
  //   setPagination({
  //     ...pagination,
  //     current: pagination.current,
  //     pageSize: pagination.pageSize,
  //   })
  // }

  // const searchPromotions = async (searchParams) => {
  //   setLoading(true)
  //   try {
  //     const response = await searchPromotion(searchParams)
  //     setFilteredData(response.data.content)
  //     setPagination({
  //       ...pagination,
  //       total: response.data.totalElements,
  //     })
  //   } catch (error) {
  //     Toast.error('Failed to search promotions:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const handleSearch = () => {
  //   const searchParams = {
  //     promotionName: searchText,
  //     pageNumber: pagination.current - 1,
  //     pageSize: pagination.pageSize,
  //   }
  //   searchPromotions(searchParams)
  // }

  // const showEditModal = (category) => {
  //   setCurrentCategory(category)
  //   form.setFieldsValue({
  //     ...category,
  //     dateRange: [dayjs(category.startDate), dayjs(category.endDate)],
  //   })
  //   setIsEditModalVisible(true)
  // }

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
      fetchAllUser(pagination.current, pagination.pageSize)
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
      fetchAllUser(pagination.current, pagination.pageSize)
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
      width: '150px',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '160px',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: '80px',
    },
    {
      title: 'Birth',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (birthday) => (birthday ? dayjs(birthday).format('YYYY/MM/DD') : ''),
      width: '120px',
    },
    {
      title: 'Nation',
      dataIndex: 'nation',
      key: 'nation',
      width: '80px',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '140px',
    },
    {
      title: 'Number of purchases',
      dataIndex: 'numberOfPurchases',
      key: 'numberOfPurchases',
      width: '90px',
    },
    {
      title: 'Total purchase price',
      dataIndex: 'totalPurchasePrice',
      key: 'totalPurchasePrice',
      width: '130px',
    },
    {
      title: 'Last time of purchase',
      dataIndex: 'lastTimeOfPurchase',
      key: 'lastTimeOfPurchase',
      width: '130px',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: '110px',
    },
    {
      title: 'TYC Point',
      dataIndex: 'balance',
      key: 'balance',
      width: '110px',
    },
    {
      title: 'Coupon',
      dataIndex: 'coupon',
      key: 'coupon',
      width: '80px',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '100px',
      render: (text, record) => (
        <div className='flex items-center gap-[10px] '>
          <button type='button' className='rounded-lg' onClick={() => navigate(`edit-member/${record.id}`)}>
            <IconEdit />
          </button>

          {/* <Tooltip title='Block' color={'volcano'}> */}
          <button type='button' className='rounded-lg' onClick={() => showDeleteModal(record.id)}>
            <IconLock />
          </button>
          {/* </Tooltip> */}
        </div>
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

  function exportExcelFile() {
    exportService.exportExcelUser().then((res) => {
      window.open(`${c.DOMAIN_DOWNLOAD_FILE}${res.data}` + `?access_token=${accessToken}`, '_blank')
    })
  }
  return (
    <div>
      <Card extra={'w-full h-full py-6 px-4'}>
        <div>
          <div className='flex flex-col md:flex-row justify-between'>
            <Button
              type='button'
              onClick={() => navigate('add-new-member')}
              className='text-[#5B4DFB] bg-[#EFEEFF] font-medium text-normal h-9 rounded-lg flex items-center justify-center gap-0'
            >
              <img src={IconAddProduct} alt='icon' />
              Add New Member
            </Button>

            <div className='flex items-center flex-col lg:flex-row gap-4 lg:mt-0 mt-4'>
              <div className='flex flex-col md:flex-row items-center w-full md:w-auto relative '>
                <Input
                  placeholder='찾다'
                  onKey={handleKeyPress}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  className='lg:w-[400px] w-full h-9'
                />
                <img
                  src={IconSearch}
                  alt='icon'
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  // onClick={handleSearch}
                />
              </div>

              <div>
                <div
                  onClick={exportExcelFile}
                  className='bg-[#E6F9E7] text-[#2DC033] cursor-pointer h-9 flex items-center justify-center px-3 rounded-lg font-medium text-normal'
                >
                  Excel Download
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='h-full overflow-x-scroll xl:overflow-x-hidden mt-4'>
          <Flex gap='middle' vertical>
            <TablleAdmin
              columns={columns}
              dataSource={filteredData}
              loading={loading}
              pagination={false}
              // onTableChange={handleTableChange}
            />
            {/* <Pagination
              className='mt-6'
              align='end'
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={(page, pageSize) => setPagination({ ...pagination, current: page, pageSize })}
              itemRender={itemRender}
            /> */}
          </Flex>
        </div>
      </Card>

      {/* {currentStep === 1 && <MemberInformation setCurrentStep={setCurrentStep} />} */}
      {/* {currentStep === 2 && <AddNewMember setCurrentStep={setCurrentStep} />} */}
      {/* {currentStep === 3 && <HistoryMember setCurrentStep={setCurrentStep} />} */}

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

export default ManagerMember
