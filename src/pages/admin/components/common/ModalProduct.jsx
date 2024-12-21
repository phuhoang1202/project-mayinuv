import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select, TreeSelect, Button, Spin, Upload, Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { constants as c } from '@constants'
import { useCategoryStore } from '@store/admin/categoryStore'
import { usePromotionStore } from '@store/admin/promotionStore'
import { Toast } from '@utils/toast'

const ModalProduct = ({
  visible,
  onCancel,
  onOk,
  form,
  listImg,
  setListImg,
  initialValues,
  fields,
  title,
  loading,
}) => {
  const { allCategories, getAllCate, loadingAllCategories } = useCategoryStore((state) => state)
  const { allPromotions, getAllPromotions, loadingAllPromotions } = usePromotionStore()

  const [fileList, setFileList] = useState([])
  const [previewImage, setPreviewImage] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    getAllCate()
    getAllPromotions()
  }, [])
  useEffect(() => {
    if (initialValues) {
      const categoryIds = initialValues.categories ? initialValues.categories.id : {}
      const promotions = initialValues.promotions ? initialValues.promotions.map((promo) => promo.id) : []
      form.setFieldsValue({
        ...initialValues,
        categoriesId: categoryIds,
        promotions: promotions,
      })

      const updatedFileList = initialValues.productImages
        ? initialValues.productImages.map((image, index) => ({
            uid: image.uid,
            name: image.name || 'image.png',
            status: 'done',
            url: `${c.DOMAIN_IMG}${image.imageUrl}`,
          }))
        : []
      setFileList(updatedFileList)
      setListImg(updatedFileList)
    }
  }, [initialValues, form])

  const validateFile = (file) =>
    new Promise((resolve, reject) => {
      const isImage = file.type.startsWith('image/')
      const isLessThan20MB = file.size / 1024 / 1024 < 20
      const isfileLessThan20MB = fileList / 1024 / 1024 < 20

      if (!isImage) {
        reject(new Error('File upload is not an image !'))
        return
      }

      if (!isLessThan20MB || isfileLessThan20MB) {
        reject(new Error('File upload must smaller than 20MB !.'))
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid)
    setFileList(newFileList)
    setListImg(newFileList)
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await validateFile(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const handleGetImage = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    setListImg(newFileList)
  }

  const handleCancel = () => {
    setFileList([])
    onCancel()
  }

  const handleSubmit = () => {
    if (fileList.length > 0) {
      setFileList([])
      onOk(() => {
        setListImg([])
      })
    } else {
      Toast.error('Please upload image product !')
    }
  }

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type='button'
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  )

  const transformCategoriesToTreeData = (categories) => {
    return categories.map((category) => {
      if (category?.categories && category?.categories?.length > 0) {
        return {
          title: category?.name,
          value: category?.id,
          disabled: true,
          children: transformCategoriesToTreeData(category?.categories),
        }
      }
      return { title: category.name, value: category.id }
    })
  }

  const treeData = transformCategoriesToTreeData(allCategories)

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          Cancel
        </Button>,

        <Button key='submit' type='primary' onClick={handleSubmit} loading={loading}>
          {title.includes('Add') ? 'Create' : 'Update'}
        </Button>,
      ]}
    >
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      {/* form data */}
      <Form form={form} layout='vertical' initialValues={initialValues}>
        <div className='max-h-[550px] overflow-y-scroll'>
          {fields.map((field) => {
            switch (field.name) {
              case 'description':
                return (
                  <Form.Item
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    rules={[{ required: false, message: `Please input the ${field.label.toLowerCase()}!` }]}
                    initialValues={initialValues?.description}
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>
                )
              case 'productName':
                return (
                  <Form.Item
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    rules={[{ required: true, message: `Please select the ${field.label.toLowerCase()}!` }]}
                    initialValues={initialValues?.productName}
                  >
                    <Input placeholder='product name' initialValues />
                  </Form.Item>
                )

              case 'categories':
                return (
                  <Form.Item
                    key={field.name}
                    name='categoriesId'
                    label={field.label}
                    rules={[{ required: true, message: 'This field is required' }]}
                  >
                    <>
                      {loadingAllCategories ? (
                        <Spin />
                      ) : (
                        <TreeSelect
                          treeData={treeData}
                          value={selectedCategories}
                          onChange={(value) => setSelectedCategories(value)}
                          // treeCheckable={true}
                          showCheckedStrategy={TreeSelect.SHOW_PARENT}
                          placeholder='Select categories'
                          style={{ width: '100%' }}
                        />
                      )}
                    </>
                  </Form.Item>
                )

              case 'price':
                return (
                  <Form.Item
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    rules={[{ required: true, message: 'Please enter correct format' }]}
                  >
                    <Input type='number' placeholder='product price' />
                  </Form.Item>
                )
              case 'stockQuantity':
                return (
                  <Form.Item
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    rules={[{ required: true, message: 'Please enter correct format' }]}
                  >
                    <Input type='number' placeholder='product stock quality' />
                  </Form.Item>
                )
              case 'promotions':
                return (
                  <Form.Item
                    key={field.name}
                    name='promotionIds'
                    label={field.label}
                    // rules={[{ required: true, message: 'Please enter correct format' }]}
                  >
                    <>
                      {loadingAllPromotions ? (
                        <Spin />
                      ) : (
                        <Select
                          mode='multiple'
                          placeholder='You can choose multiple promotions!'
                          optionLabelProp='label'
                        >
                          {allPromotions?.length > 0
                            ? allPromotions.map((promo, index) => (
                                <Select.Option value={promo.id} key={index} label={promo.name}>
                                  {promo.name}
                                </Select.Option>
                              ))
                            : null}
                        </Select>
                      )}
                    </>
                  </Form.Item>
                )

              default:
                return (
                  <Form.Item
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    rules={[{ required: true, message: `Please input the ${field.label.toLowerCase()}!` }]}
                  >
                    <Input placeholder={field.label} />
                  </Form.Item>
                )
            }
          })}
          <p className='my-2'>Image Product</p>
          <Upload
            listType='picture-card'
            multiple={true}
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleGetImage}
            onRemove={handleRemove}
            beforeUpload={() => false}
          >
            {fileList.length >= 10 ? null : uploadButton}
          </Upload>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalProduct
