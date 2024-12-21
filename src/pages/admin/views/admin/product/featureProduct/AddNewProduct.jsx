import React, { useCallback, useEffect, useState } from 'react'
import Card from '@pages/admin/components/card'
import IconAsterisk from '@assets/images/admin/IconAsterisk.svg'
import { Form, Input, Image, Upload, Radio, Space, TreeSelect, Select, message } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { PlusOutlined } from '@ant-design/icons'
import { getCategory } from '@services/admin/category'
import { getPromotion } from '@services/admin/promotion'
import AddProductAttribule from './AddProductAttribule'
import IconBack from '@assets/images/IconBack.svg'
import { product } from '@services/admin/product'
import { constants as c } from '@constants'
import { useNavigate } from 'react-router-dom'
import Loading from '@components/loadingCommon/Loading'
import { Toast } from '@utils/toast'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

class MyUploadAdapter {
  constructor(loader, saveTemporaryUpload) {
    this.loader = loader
    this.saveTemporaryUpload = saveTemporaryUpload
  }

  upload() {
    return this.loader.file.then((file) => {
      const fileReader = new FileReader()

      return new Promise((resolve, reject) => {
        fileReader.onload = () => {
          // Lưu file dưới dạng blob vào bộ nhớ tạm thời
          this.saveTemporaryUpload({
            file,
            url: fileReader.result,
          })
          resolve({ default: fileReader.result })
        }
        fileReader.onerror = (error) => reject(error)
        fileReader.readAsDataURL(file)
      })
    })
  }

  abort() {
    // Xử lý khi upload bị hủy nếu cần
  }
}

export default function AddNewProduct() {
  const [valueAttribule, setValueAttribule] = useState(1)
  const [categoryTreeData, setCategoryTreeData] = useState([])
  const [promotions, setPromotions] = useState([])
  const [currentStepAdd, setCurrentStepAdd] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  // validate
  const [form] = Form.useForm()
  // CKEditor
  const [editorData, setEditorData] = useState()
  const [temporaryUploads, setTemporaryUploads] = useState([])

  // image state
  const [images, setImages] = useState([])
  const [previewImage, setPreviewImage] = useState([])
  const [fileList, setFileList] = useState([])

  // Update img main
  const [imagesMain, setImagesMain] = useState('')
  const [fileListMain, setFileListMain] = useState([])
  const [previewImageMain, setPreviewImageMain] = useState([])
  const [previewOpenMain, setPreviewOpenMain] = useState(false)

  let isPathMain = ''

  const [dataInput, setDataInput] = useState({
    productName: '',
    generalDescription: '',
    categoriesId: '',
    price: 0,
    productSkus: [],
    promotionIds: [],
    stockQuantity: '',
    description: '',
    platformType: 'tyc',
  })

  const { productName, generalDescription, categoriesId, price, stockQuantity } = dataInput

  const handleAttribute = (e) => {
    setValueAttribule(e.target.value)
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

  // Lấy dữ liệu vào input
  // Category
  const convertToTreeData = (categories) => {
    return categories.map((category) => ({
      title: category.name,
      value: category.id,
      children: category.categories ? convertToTreeData(category.categories) : [],
    }))
  }

  const fetchCategory = async () => {
    try {
      const response = await getCategory()
      const treeData = convertToTreeData(response.data)
      setCategoryTreeData(treeData)
    } catch (error) {
      message.error('Failed to fetch categories')
      console.log(error)
    }
  }

  // Promotion
  const fetchPromotion = async () => {
    try {
      const response = await getPromotion()
      setPromotions(response.data)
    } catch (error) {
      message.error('Failed to fetch Promotion')
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategory()
    fetchPromotion()
  }, [])

  // ckeditor
  // Lưu trữ upload tạm thời
  function saveTemporaryUpload(upload) {
    setTemporaryUploads((prev) => [...prev, upload])
  }

  // Plugin CKEditor cho upload
  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader, saveTemporaryUpload)
    }
  }

  const handleSubmitDescription = async (productId) => {
    let contentCopy = editorData

    const uploadPromises = temporaryUploads.map(async (upload, index) => {
      const formData = new FormData()
      formData.append('file', upload.file)
      formData.append('position', index + 1)
      formData.append('productId', productId)
      formData.append('list', [])

      // Call API
      return await product.uploadPrdImgsDetail(formData).then((res) => {
        const urlImg = `${c.DOMAIN_IMG}${res.data.url}`
        contentCopy = contentCopy.replace(upload.url, urlImg)
        return urlImg
      })
    })

    // Xử lý submit với dữ liệu cuối cùng
    Promise.all(uploadPromises)
      .then(() => {
        const payload = {
          description: contentCopy,
          productId: productId,
        }
        return product.uploadDescription(payload)
      })
      .then(() => {
        console.log('Form submitted successfully')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  // Upload ảnh
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    const newImages = newFileList.map((file) => file.originFileObj)
    setImages(newImages)
  }

  const handleUploadImage = async (productId) => {
    const formData = new FormData()
    const arrMerge = [...images, ...imagesMain]
    arrMerge.forEach((file) => {
      formData.append('files', file)
    })

    formData.append('productId', productId)
    formData.append('list', [])
    formData.append('isMain', isPathMain)

    try {
      await product.uploadPrdImgs(formData)
    } catch (error) {
      message.error('Upload failed')
    }
  }

  // Update img main ***************
  const handlePreviewMain = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImageMain(file.url || file.preview)
    setPreviewOpenMain(true)
  }

  const handleChangeMain = ({ fileList: newFileListMain }) => {
    setFileListMain(newFileListMain)
    const newImages = newFileListMain.map((file) => file.originFileObj)
    setImagesMain(newImages)
  }

  const handleUploadImageMain = async (productId) => {
    let nameImg = ''
    if (imagesMain && imagesMain.length > 0) {
      nameImg = imagesMain[0]?.name?.substring(0, imagesMain[0]?.name?.lastIndexOf('.'))
      isPathMain = `product/${productId}/${nameImg}.jpeg`
    }
  }

  // Submit form
  const handleChangeInput = (e) => {
    setDataInput({ ...dataInput, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await product.createNewPrd(dataInput)
      const productId = res.data.id
      // Gọi tiếp hàm xử lý mô tả và đợi phản hồi
      await handleSubmitDescription(productId)

      await handleUploadImageMain(productId)
      // Kiểm tra và tải lên hình ảnh nếu cần thiết
      if (images && images.length > 0) {
        await handleUploadImage(productId)
      }
      Toast.success('Product created successfully!')
      setDataInput({
        productName: '',
        generalDescription: '',
        categoriesId: '',
        price: 0,
        productSkus: [],
        promotionIds: [],
        stockQuantity: '',
        description: '',
      })
      navigate('/admin/manager-product')
    } catch (error) {
      Toast.error('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  const handleFormValidation = () => {
    form
      .validateFields()
      .then(() => {
        // Handle valid form case
      })
      .catch((errorInfo) => {
        // Handle error case
      })
  }

  const handleNextStep = () => {
    setCurrentStepAdd(1)
  }

  return (
    <Card extra={'w-full h-[85vh] overflow-y-auto lg:px-40 md:px-20 sm:px-14 py-10'}>
      <div className='absolute top-4 left-4 cursor-pointer' onClick={() => navigate('/admin/manager-product')}>
        <img src={IconBack} alt='icon' />
      </div>
      {loading && <Loading />}
      <div className='flex flex-col gap-8'>
        {currentStepAdd === 0 && (
          <div>
            <Form form={form} onFinish={handleSubmit} onValuesChange={() => handleFormValidation()}>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                    Name <img src={IconAsterisk} alt='icon' />
                  </label>
                  <Form.Item
                    name='productName'
                    rules={[
                      { required: true, message: 'Please input the product name!' },
                      { max: 200, message: 'Product name must be less than 200 characters' },
                    ]}
                  >
                    <Input
                      placeholder='Giới hạn 200 kí tự'
                      className='border px-2 rounded-lg h-11'
                      value={productName}
                      name='productName'
                      onChange={handleChangeInput}
                    />
                  </Form.Item>
                </div>

                <div className='flex flex-col gap-1 flex-1'>
                  <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                    General Description <img src={IconAsterisk} alt='icon' />
                  </label>
                  <Form.Item
                    name='generalDescription'
                    rules={[{ required: true, message: 'Please input the general description!' }]}
                  >
                    <Input
                      placeholder='AAAAAAA'
                      className='border px-2 rounded-lg h-11'
                      value={generalDescription}
                      name='generalDescription'
                      onChange={handleChangeInput}
                    />
                  </Form.Item>
                </div>

                <div className='flex flex-col gap-6'>
                  <div className='flex items-center gap-6'>
                    <div className='flex flex-col gap-1 flex-1'>
                      <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                        Category <img src={IconAsterisk} alt='icon' />
                      </label>
                      <Form.Item name='categoriesId' rules={[{ required: true, message: 'Please select a category!' }]}>
                        <TreeSelect
                          placeholder='Select a category'
                          treeData={categoryTreeData}
                          className='rounded-lg h-11 w-full'
                          allowClear
                          treeDefaultExpandAll
                          value={categoriesId}
                          onChange={(value) => setDataInput({ ...dataInput, categoriesId: value })}
                        />
                      </Form.Item>
                    </div>

                    <div className='flex flex-col gap-1 flex-1'>
                      <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                        Price <img src={IconAsterisk} alt='icon' />
                      </label>
                      <Form.Item
                        name='price'
                        rules={[
                          { required: true, message: 'Please input the price!' },
                          {
                            validator: (_, value) => {
                              if (value && (isNaN(value) || value < 0)) {
                                return Promise.reject('Price must be a positive number')
                              }
                              return Promise.resolve()
                            },
                          },
                        ]}
                      >
                        <Input
                          placeholder='AAAAAAA'
                          className='border px-2 rounded-lg h-11'
                          value={price}
                          name='price'
                          onChange={handleChangeInput}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className='flex items-center gap-6'>
                    <div className='flex flex-col gap-1 flex-1'>
                      <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                        Promotions <img src={IconAsterisk} alt='icon' />
                      </label>
                      <Form.Item
                        name='promotionIds'
                        rules={[{ required: true, message: 'Please select at least one promotion!' }]}
                      >
                        <Select
                          mode='multiple'
                          placeholder='Select a promotion'
                          className='h-11'
                          value={dataInput.promotionIds}
                          onChange={(value) => setDataInput({ ...dataInput, promotionIds: value })}
                        >
                          {promotions.map((promotion) => (
                            <Select.Option key={promotion.id} value={promotion.id}>
                              {promotion.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                      <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                        Stock Quantity <img src={IconAsterisk} alt='icon' />
                      </label>
                      <Form.Item
                        name='stockQuantity'
                        rules={[
                          { required: true, message: 'Please input the stock quantity!' },
                          {
                            validator: (_, value) => {
                              if (value && (isNaN(value) || value < 0)) {
                                return Promise.reject('Stock quantity must be a positive number')
                              }
                              return Promise.resolve()
                            },
                          },
                        ]}
                      >
                        <Input
                          placeholder='AAAAAAA'
                          className='border px-2 rounded-lg h-11'
                          value={stockQuantity}
                          type='number'
                          name='stockQuantity'
                          onChange={handleChangeInput}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>Description</label>
                  <div>
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        extraPlugins: [CustomUploadAdapterPlugin],
                      }}
                      data={editorData}
                      onChange={(event, editor) => {
                        setEditorData(editor.getData())
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <div className='font-semibold text-normal text-[#3B3B3B]'>
                  Image Product: (JPG, JPEG, PNG) (건당 30MB 이내) (10장까지 가능)
                </div>
                <div className='mt-1'>
                  <Form.Item
                    name='images'
                    valuePropName='fileList'
                    getValueFromEvent={(e) => e && e.fileList}
                    className='flex text-left'
                    rules={[
                      {
                        // required: true,
                        // message: 'Please upload at least one image!',
                        validator: (_, value) => {
                          const hasSVGFile = value.some((file) => file.name.toLowerCase().endsWith('.svg'))
                          console.log('hasSVGFile', hasSVGFile)

                          if (hasSVGFile) {
                            return Promise.reject(new Error('SVG files are not allowed'))
                          }

                          if (!value || value.length === 0) {
                            return Promise.reject(new Error('Please upload at least one image'))
                          }
                          // Check if any file has a .svg extension

                          return Promise.resolve()
                        },
                      },
                    ]}
                  >
                    <Upload
                      listType='picture-card'
                      fileList={fileList}
                      multiple
                      onPreview={handlePreview}
                      onChange={handleChange}
                      beforeUpload={() => false}
                      maxCount={6}
                    >
                      {fileList.length >= 10 ? null : uploadButton}
                    </Upload>
                  </Form.Item>

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
                </div>
              </div>

              <div className='mt-8'>
                <div className='font-semibold text-normal text-[#3B3B3B]'>
                  Image Main: (JPG, JPEG, PNG) (건당 30MB 이내)
                </div>
                <div className='mt-1'>
                  <Form.Item
                    name='imagesMain'
                    valuePropName='fileList'
                    getValueFromEvent={(e) => e && e.fileList}
                    className='flex text-left'
                    rules={[
                      {
                        // required: true,
                        // message: 'Please upload at least one main image!',
                        validator: (_, value) => {
                          const hasSVGFile = value.some((file) => file.name.toLowerCase().endsWith('.svg'))

                          if (hasSVGFile) {
                            return Promise.reject(new Error('SVG files are not allowed'))
                          }

                          if (!value || value.length === 0) {
                            return Promise.reject(new Error('Please upload at least one main image'))
                          }
                          return Promise.resolve()
                        },
                      },
                    ]}
                  >
                    <Upload
                      listType='picture-card'
                      fileList={fileListMain}
                      multiple
                      onPreview={handlePreviewMain}
                      onChange={handleChangeMain}
                      beforeUpload={() => false}
                      maxCount={6}
                    >
                      {fileListMain.length == 1 ? null : uploadButton}
                    </Upload>
                  </Form.Item>

                  {previewImageMain && (
                    <Image
                      wrapperStyle={{
                        display: 'none',
                      }}
                      preview={{
                        visible: previewOpenMain,
                        onVisibleChange: (visible) => setPreviewOpenMain(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImageMain(''),
                      }}
                      src={previewImageMain}
                    />
                  )}
                </div>
              </div>

              <div className='mt-8'>
                <h4 className='text-normal font-bold text-[#3B3B3B]'>Product attributes</h4>
                <Radio.Group onChange={handleAttribute} value={valueAttribule} className='mt-3'>
                  <Space direction='vertical'>
                    <Radio value={1}>No properties</Radio>
                    <Radio value={2}>Has properties</Radio>
                  </Space>
                </Radio.Group>
              </div>

              <div>
                {valueAttribule === 1 && (
                  <div className='flex items-center justify-end'>
                    <button
                      className='bg-[#5B4DFB] text-white h-11 rounded-lg w-52 font-semibold text-normal flex items-center justify-center'
                      // onClick={handleSubmit}
                      type='submit'
                      disabled={
                        !form.isFieldsTouched(true) ||
                        form
                          .getFieldsError()
                          .some(({ errors }) => errors.length > 0 || images.length === 0 || imagesMain == '')
                      }
                    >
                      Submit
                    </button>
                  </div>
                )}

                {valueAttribule === 2 && (
                  <div className='flex items-center justify-end gap-6'>
                    <button
                      className='bg-[#EFEFEF] text-[#3B3B3B] h-11 rounded-lg w-32 font-semibold text-normal flex items-center justify-center'
                      onClick={() => navigate('/admin/manager-product')}
                    >
                      Cancel
                    </button>

                    <button
                      className='bg-[#5B4DFB] text-white h-11 rounded-lg w-52 font-semibold text-normal flex items-center justify-center'
                      onClick={handleNextStep}
                      disabled={
                        !form.isFieldsTouched(true) ||
                        form
                          .getFieldsError()
                          .some(({ errors }) => errors.length > 0 || images.length === 0 || imagesMain == '')
                      }
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </Form>
          </div>
        )}

        {/* Có Attribule */}
        {currentStepAdd === 1 && (
          <AddProductAttribule
            setCurrentStepAdd={setCurrentStepAdd}
            dataInput={dataInput}
            setDataInput={setDataInput}
            handleSubmit={handleSubmit}
            form={form}
          />
        )}
      </div>
    </Card>
  )
}
