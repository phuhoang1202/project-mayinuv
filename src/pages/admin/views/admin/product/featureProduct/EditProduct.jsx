import React, { useEffect, useState } from 'react'
import Card from '@pages/admin/components/card'
import IconAsterisk from '@assets/images/admin/IconAsterisk.svg'
import { Form, Input, Image, Upload, Radio, Space, TreeSelect, Select, message, Divider, Tabs, Button } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { PlusOutlined } from '@ant-design/icons'
import { getCategory } from '@services/admin/category'
import { getPromotion } from '@services/admin/promotion'
import IconBack from '@assets/images/IconBack.svg'
import { product } from '@services/admin/product'
import { constants as c } from '@constants'
import IconClose from '@assets/images/IconClose.svg'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Loading from '@components/loadingCommon/Loading'
import ImageError from '@assets/images/ImageError.svg'

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

export default function EditProduct() {
  // validate
  const [form] = Form.useForm()
  // OLD
  const [valueAttribule, setValueAttribule] = useState(1)
  const [categoryTreeData, setCategoryTreeData] = useState([])
  const [promotionsState, setPromotionsState] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const navigate = useNavigate()
  const param = useParams()
  const { id } = param

  // CKEditor
  const [editorData, setEditorData] = useState()
  const [temporaryUploads, setTemporaryUploads] = useState([])
  const [listImgDescription, setListImgDescription] = useState([])

  const [isUpdate, setIsUpdate] = useState(false)

  // image state
  const [images, setImages] = useState([])
  const [previewImage, setPreviewImage] = useState([])
  const [fileList, setFileList] = useState([])
  const [listImgProductId, setListImgProductId] = useState([])

  // state img main
  const [imagesMain, setImagesMain] = useState('')
  const [fileListMain, setFileListMain] = useState([])
  const [previewImageMain, setPreviewImageMain] = useState([])
  const [previewOpenMain, setPreviewOpenMain] = useState(false)

  let isPathMain = ''

  const [dataInput, setDataInput] = useState({
    averageRating: 0,
    categories: {},
    description: '',
    exChangeRate: 0,
    generalDescription: '',
    price: 0,
    productAttributeModels: [],
    productImages: [],
    productName: '',
    productSkus: [],
    promotions: [],
    reviewCount: 0,
    salePrice: 0,
    stockQuantity: 0,
    useVariantPricing: true,
    wishList: false,
    status: null,
    platformType: null,
  })

  const {
    productName,
    generalDescription,
    categories,
    price,
    stockQuantity,
    productSkus,
    productImages,
    promotionIds,
  } = dataInput

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

  const [productAttributeModels, setProductAttributeModels] = useState([])

  // Call Dữ liệu
  const fetchDataProduct = async () => {
    try {
      if (id) {
        const response = await product.getProductById(id)
        const productData = response.data
        setDataInput((prevData) => ({
          ...prevData,
          id: productData.id,
          productName: productData.productName ?? prevData.productName,
          generalDescription: productData.generalDescription ?? prevData.generalDescription,
          categories: productData.categories,
          price: productData.price ?? prevData.price,
          productSkus: productData.productSkus ?? prevData.productSkus,
          promotionIds: productData.promotions?.map((promotion) => promotion.id) ?? prevData.promotionIds,
          promotions: productData.promotions,
          stockQuantity: productData.stockQuantity ?? prevData.stockQuantity,
          description: productData.description ?? prevData.description,
          productAttributeModels: productData.productAttributeModels,
          wishList: productData.wishList,
          lastModifiedBy: productData.lastModifiedBy,
          productImages: productData.productImages,
          createdBy: productData.createdBy,
          salePrice: productData.salePrice,
          createdDate: productData.createdDate,
          status: productData.status,
          platformType: productData.platformType,
          code: productData.code,
        }))
        setEditorData(productData.description || '')
        setPreviewImage(productData.productImages)
        console.log(productData)

        setValueAttribule(productData.productSkus.length > 0 ? 2 : 1)
        setProductAttributeModels(productData.productAttributeModels)
        setImages(productData.productImages)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Category
  const findCategoryByValue = (treeData, value, parentId = null) => {
    for (const category of treeData) {
      if (category.value === value) {
        // Thêm thông tin parentId khi tìm thấy category
        return {
          id: category.value,
          name: category.title,
          description: category.title,
          parentId: parentId,
          categories: null,
        }
      }
      if (category.children && category.children.length > 0) {
        const found = findCategoryByValue(category.children, value, category.value)
        if (found) {
          return found
        }
      }
    }
    return null
  }

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
      setPromotionsState(response.data)
    } catch (error) {
      message.error('Failed to fetch Promotion')
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataProduct()
    fetchCategory()
    fetchPromotion()
  }, [])

  const handleChangePromotion = (e) => {
    // Tính toán lại filteredPromotions với giá trị mới nhất của e
    const newFilteredPromotions = promotionsState?.filter((promotion) => e.includes(promotion.id))

    // Cập nhật state với giá trị mới
    setDataInput((prevDataInput) => ({
      ...prevDataInput,
      promotionIds: e,
      promotions: newFilteredPromotions, // Sử dụng giá trị đã lọc mới nhất
    }))
  }

  // Lấy page
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const page = queryParams.get('page') || 1 // Mặc định là 1 nếu không có
  const pageSize = queryParams.get('pageSize') || 10 // Mặc định là 10 nếu không có

  // Sử dụng page và pageSize để gọi API hoặc hiển thị dữ liệu tương ứng

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
    let index = 0
    let arrPosition = []
    if (listImgDescription && listImgDescription.length > 0) {
      arrPosition = listImgDescription.map((el) => el.position)
      index = Math.max(...arrPosition)
    }

    const uploadPromises = temporaryUploads.map(async (upload, indexUpload) => {
      const formData = new FormData()
      formData.append('file', upload.file)
      formData.append('position', index + indexUpload + 1)
      formData.append('productId', productId)
      formData.append('list', arrPosition)

      // Call API
      return await product.uploadPrdImgsDetail(formData).then((res) => {
        const urlImg = `${c.DOMAIN_IMG}${res.data.url}`
        contentCopy = contentCopy.replace(upload.url, urlImg)
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

  useEffect(() => {
    const arrCheck = ['detail', 'product']

    const productImagesFiltered = productImages.filter((image) => image.imageType === 'product')
    const DescriptionPrd = productImages.filter((image) => image.imageType === 'description')
    const productImgMainData = productImages.filter((image) => image.main === true)

    const productImgMain = productImages
      .filter((image) => image.main === true)
      .map((image) => {
        // Kiểm tra nếu image.imageUrl bắt đầu bằng 'detail' hoặc 'product'
        const startsWithCheck = arrCheck.some((prefix) => image.imageUrl.startsWith(prefix))

        return {
          uid: image.uid || image.id,
          name: image.imageUrl.split('/').pop(),
          status: 'done',
          url: startsWithCheck
            ? `${c.DOMAIN_IMG}${image.imageUrl}` // Nếu bắt đầu bằng 'detail' hoặc 'product'
            : image.imageUrl, // Nếu không
        }
      })

    setListImgProductId(productImagesFiltered)
    setListImgDescription(DescriptionPrd)
    setFileListMain(productImgMain)
    setImagesMain(productImgMainData)
  }, [productImages])

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const handleDeleteId = (id) => {
    const newProductImages = productImages.filter((item) => item.imageType !== 'product' || item.id !== id)

    setDataInput((prevData) => ({
      ...prevData,
      productImages: newProductImages,
    }))
  }

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    const newImages = newFileList.map((file) => file.originFileObj)
    setImages(newImages)
    setIsUpdate(true)
  }

  const handleUploadImage = async (productId) => {
    const arrImgProduct = productImages.filter((value) => value.imageType === 'product')
    const arrImg = arrImgProduct.map((el) => el.id)

    const formData = new FormData()
    if (isUpdate) {
      const arrMerge = [...images, ...imagesMain]
      arrMerge.forEach((file) => {
        formData.append('files', file)
      })

      formData.append('productId', productId)
      formData.append('list', arrImg)
      formData.append('isMain', isPathMain)
    } else {
      return null
    }

    try {
      await product.uploadPrdImgs(formData)
    } catch (error) {
      message.error('Upload failed')
    }
  }

  // Update img main ***************

  const handleRemoveFile = (imgMain) => {
    // Lọc phần tử khỏi mảng images dựa trên id
    const updatedImages = images.filter((image) => image.id !== imgMain.uid)

    // Cập nhật lại state
    setDataInput((prevData) => ({ ...prevData, productImages: updatedImages }))
  }

  const handlePreviewMain = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImageMain(file.url || file.preview)
    setPreviewOpenMain(true)
  }

  const handleChangeMain = ({ fileList: newFileList }) => {
    setFileListMain(newFileList)
    const newImages = newFileList.map((file) => file.originFileObj)
    setImagesMain(newImages)
    setIsUpdate(true)
  }

  const handleUploadImageMain = async (productId) => {
    let nameImg = ''
    if (imagesMain && imagesMain.length > 0) {
      nameImg = imagesMain[0]?.name?.substring(0, imagesMain[0]?.name?.lastIndexOf('.'))
      isPathMain = `product/${productId}/${nameImg}.jpeg`
    }
  }

  // Attribute
  const [activeKey, setActiveKey] = useState('0')

  // Lấy danh sách các giá trị duy nhất của thuộc tính `COLOR` từ productSkus

  // Hàm để xử lý thay đổi tab
  const handleTabChange = (key) => {
    setActiveKey(key)
  }

  // Lấy danh sách các giá trị duy nhất của thuộc tính `COLOR` từ productSkus
  const uniqueColors = [
    ...new Set(
      productSkus
        .flatMap((sku) => sku.attributes)
        .filter((attr) => attr.type === 'COLOR')
        .map((attr) => attr.attributeName),
    ),
  ]

  const handleInputChange = (sku, field, value) => {
    setDataInput((prevData) => {
      // Tạo bản sao của productSkus từ dataInput
      const updatedProductSkus = prevData.productSkus.map((productSku) => {
        if (productSku.sku === sku) {
          return {
            ...productSku,
            [field]: value, // Gán giá trị mới cho trường cụ thể
          }
        }
        return productSku // Giữ nguyên các phần tử khác
      })

      // Trả về state đã cập nhật với mảng productSkus mới
      return {
        ...prevData,
        productSkus: updatedProductSkus,
      }
    })
  }

  // Submit form
  const handleChangeInput = (e) => {
    const { name, value, type } = e.target
    const parsedValue = type === 'number' ? Number(value) : value

    // Cập nhật cả [name] và promotions với giá trị của filteredPromotions
    setDataInput((prevDataInput) => ({
      ...prevDataInput,
      [name]: parsedValue,
    }))
  }

  const handleSubmit = async () => {
    try {
      const res = await product.updateProduct(dataInput)
      const productId = res.data.id
      // Gọi tiếp hàm xử lý mô tả và đợi phản hồi
      await handleSubmitDescription(productId)

      await handleUploadImageMain(productId)
      // Kiểm tra và tải lên hình ảnh nếu cần thiết
      if (imagesMain && imagesMain.length > 0) {
        await handleUploadImage(productId)
      }
      message.success('Product created successfully!')
      navigate(`/admin/manager-product?page=${page}`)
    } catch (error) {
      console.log('Failed to create product')
    }
  }

  return (
    <Card extra={'w-full h-[87vh] overflow-y-auto lg:px-20 px-14 py-10'}>
      <div className='absolute top-4 left-4 cursor-pointer' onClick={() => navigate('/admin/manager-product')}>
        <img src={IconBack} alt='icon' />
      </div>
      <div className='flex flex-col gap-8 overflow-y-auto'>
        <div>
          {dataInput?.productName ? (
            <Form initialValues={{ productName, generalDescription, categories, price, stockQuantity }}>
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

                <div className='flex flex-col gap-2'>
                  <div className='flex items-start gap-6 flex-1'>
                    <div className='flex gap-1 flex-col flex-1'>
                      <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                        Category <img src={IconAsterisk} alt='icon' />
                      </label>
                      <TreeSelect
                        placeholder='Select a category'
                        treeData={categoryTreeData}
                        className='rounded-lg h-11'
                        allowClear
                        treeDefaultExpandAll
                        value={categories.name}
                        onChange={(value, label, extra) => {
                          const selectedCategory = findCategoryByValue(categoryTreeData, value)
                          setDataInput({
                            ...dataInput,
                            categoriesId: value,
                            categories: selectedCategory ? selectedCategory : {},
                          })
                        }}
                      />
                    </div>

                    <div className='flex gap-1 flex-col flex-1'>
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
                          type='number'
                          value={price}
                          name='price'
                          onChange={handleChangeInput}
                          onWheel={(e) => e.target.blur()}
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className='flex items-start gap-6 flex-1'>
                    <div className='flex flex-col gap-1 flex-1'>
                      <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                        Promotions <img src={IconAsterisk} alt='icon' />
                      </label>
                      <Select
                        mode='multiple'
                        placeholder='Select a promotion'
                        className='h-11'
                        value={dataInput.promotionIds}
                        onChange={(e) => handleChangePromotion(e)}
                      >
                        {promotionsState &&
                          promotionsState.length > 0 &&
                          promotionsState?.map((promotion) => (
                            <Select.Option key={promotion.id} value={promotion.id}>
                              {promotion.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>

                    <div className='flex flex-col gap-1  flex-1'>
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
                          type='number'
                          className='border px-2 rounded-lg h-11'
                          value={stockQuantity}
                          name='stockQuantity'
                          onChange={handleChangeInput}
                          onWheel={(e) => e.target.blur()}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-2'>
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
                  <Upload
                    listType='picture-card'
                    fileList={fileList}
                    multiple
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={() => false}
                  >
                    {fileList.length + listImgProductId.length >= 10 ? null : uploadButton}
                  </Upload>

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

                  <div className='flex items-center gap-2'>
                    {listImgProductId &&
                      listImgProductId.length > 0 &&
                      listImgProductId
                        .filter((img) => img.main === false)
                        .map((img, index) => {
                          const arrCheck = ['detail', 'product']
                          const startsWithCheck = arrCheck.some((prefix) => img.imageUrl.startsWith(prefix))
                          return (
                            <div key={index} className='mt-2'>
                              <div className='w-[120px] h-[120px] mt-2 border p-2 rounded-lg relative flex justify-center items-center'>
                                <Image
                                  src={startsWithCheck ? `${c.DOMAIN_IMG}${img.imageUrl}` : `${img.imageUrl}`}
                                  style={{ height: '90px', width: '90px' }}
                                  className='rounded-lg w-full h-full object-cover'
                                  loading='lazy'
                                  onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = ImageError
                                  }}
                                />
                                <button className='absolute top-0 right-0 z-30' onClick={() => handleDeleteId(img.id)}>
                                  <img src={IconClose} alt='icon' className='w-4 h-4' />
                                </button>
                              </div>
                            </div>
                          )
                        })}
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <div className='font-semibold text-normal text-[#3B3B3B]'>
                  Image Main: (JPG, JPEG, PNG) (건당 30MB 이내)
                </div>
                <div className='mt-1'>
                  <Form.Item
                    name='imagesMain'
                    valuePropName='fileListMain'
                    getValueFromEvent={(e) => e && e.fileList}
                    className='flex text-left'
                    rules={[
                      {
                        required: true,
                        message: 'Please upload at least one main image!',
                        validator: () => {
                          if (fileListMain && fileListMain.length === 0) {
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
                      onPreview={handlePreviewMain}
                      onChange={handleChangeMain}
                      beforeUpload={() => false}
                      onRemove={(file) => {
                        // Gọi hàm tùy chỉnh để set lại state
                        handleRemoveFile(file)
                      }}
                    >
                      {fileListMain.length || imagesMain.length === 1 ? null : uploadButton}
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

              <div className='mt-10'>
                <h4 className='text-normal font-bold text-[#8C8C8C]'>Product attributes</h4>
                <Radio.Group onChange={handleAttribute} value={valueAttribule} className='mt-3' disabled>
                  <Space direction='vertical'>
                    <Radio value={1}>No properties</Radio>
                    <Radio value={2}>Has properties</Radio>
                  </Space>
                </Radio.Group>
              </div>

              {/* Start Attribute */}
              {valueAttribule === 2 && (
                <div>
                  <div className='mt-10'>
                    <Form name='dynamic_form_nest_item' autoComplete='off' disabled>
                      <Form.List name='product'>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name }) => (
                              <div key={key} className='mt-5 bg-[#F4F4F4] p-8 rounded-lg w-full relative'>
                                <div className='flex items-center gap-4'>
                                  <div className='flex flex-col gap-1 flex-1'>
                                    <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                                      Attribute <img src={IconAsterisk} alt='icon' />
                                    </label>
                                    <Form.Item
                                      name={[name, 'attribute']}
                                      rules={[{ required: true, message: 'Please select an attribute' }]}
                                    >
                                      <Select
                                        onChange={(value) => handleAttributeChange(value, name)}
                                        options={options.filter(
                                          (option) =>
                                            !selectedAttributes.some((attr) => attr.attribute === option.value),
                                        )}
                                        className='h-11'
                                      />
                                    </Form.Item>
                                  </div>
                                  <div className='flex flex-col gap-1 flex-1'>
                                    <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                                      Value <img src={IconAsterisk} alt='icon' />
                                    </label>

                                    <Select
                                      className='h-11'
                                      mode='multiple'
                                      placeholder='custom dropdown render'
                                      dropdownRender={(menu) => (
                                        <>
                                          {menu}
                                          <Divider style={{ margin: '8px 0' }} />
                                          <div
                                            style={{ padding: '0 8px 4px', width: '100%' }}
                                            className='flex items-center'
                                          >
                                            <Input
                                              placeholder='Please enter item'
                                              ref={inputRef}
                                              value={valueName}
                                              onChange={onNameChange}
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                  e.stopPropagation() // Dừng sự kiện lan ra ngoài
                                                  addItem()
                                                }
                                              }}
                                            />
                                            <Button type='text' icon={<PlusOutlined />} onClick={addItem}>
                                              Add item
                                            </Button>
                                          </div>
                                        </>
                                      )}
                                      options={items.map((item) => ({
                                        label: item,
                                        value: item,
                                      }))}
                                      onChange={(values) => handleValueChange(values, name)}
                                    />
                                  </div>
                                  <button type='button' onClick={() => remove(name)} className='absolute top-5 right-3'>
                                    <img src={IconClose} alt='icon' />
                                  </button>
                                </div>
                              </div>
                            ))}
                            <Form.Item className='mt-4'>
                              <Button
                                type='dashed'
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                                className='h-11'
                              >
                                Add attribute
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form>
                  </div>

                  <h3 className='font-bold text-primaryPrdName text-[#3B3B3B] mt-8'>Product price by attribute</h3>
                  <div className='flex flex-col gap-1 mt-4'>
                    <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                      Price <img src={IconAsterisk} alt='icon' />
                    </label>
                    <div className='flex items-center gap-8'>
                      <Input placeholder='AAAAAAA' className='border px-2 rounded-lg h-11' />
                      <button className='text-[#5B4DFB] bg-[#EFEEFF] px-2 h-11 text-small font-medium rounded-lg w-60'>
                        Synchronization
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Attribute */}
              <div className='mt-4'>
                {productAttributeModels.map((attribute, index) => (
                  <div
                    key={index}
                    className='mb-4 py-6 px-10 border rounded-lg bg-gray-50 flex items-center justify-between gap-10'
                  >
                    <div className='flex flex-col gap-1 flex-1'>
                      <label className='mb-2 font-semibold'>Attribute*</label>
                      <Select defaultValue={attribute.type} className='min-h-11' disabled />
                    </div>

                    <div className='flex flex-col gap-1 flex-1'>
                      <label className='mb-2 font-semibold'>Value*</label>
                      <Select
                        mode='tags'
                        className='min-h-11'
                        placeholder='Select or add values'
                        defaultValue={attribute.modelList.map((model) => model.attributeName)}
                        disabled
                      >
                        {attribute.modelList.map((model) => (
                          <Option key={model.id} value={model.attributeName} disabled>
                            {model.attributeName}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                ))}
              </div>

              {productAttributeModels && productAttributeModels.length > 0 && (
                <Tabs defaultActiveKey='0' activeKey={activeKey} onChange={handleTabChange} className='mt-4'>
                  {uniqueColors.map((color, colorIndex) => {
                    // Lọc các sản phẩm có `COLOR` tương ứng
                    const filteredProducts = productSkus.filter((sku) =>
                      sku.attributes.some((attr) => attr.type === 'COLOR' && attr.attributeName === color),
                    )

                    return (
                      <Tabs.TabPane
                        tab={
                          <span
                            className={`${
                              activeKey === colorIndex.toString()
                                ? 'text-[#5B4DFB] font-semibold'
                                : 'text-[#AFAEAE] font-medium'
                            } text-normal`}
                          >
                            {color}
                          </span>
                        }
                        key={colorIndex.toString()}
                      >
                        <div className='mt-5'>
                          {filteredProducts.map((product) => (
                            <div key={product.id} className='mb-4'>
                              <div className='ml-4'>
                                <span className='font-medium'>SKU: {product.sku}</span>
                                <div className='flex gap-2 mt-1'>
                                  <Input
                                    placeholder='Enter price'
                                    className='border rounded-lg min-h-11 w-1/2'
                                    value={productSkus.find((item) => item.sku === product.sku)?.price || ''}
                                    onChange={(e) => handleInputChange(product.sku, 'price', e.target.value)}
                                  />
                                  <Input
                                    placeholder='Enter stock'
                                    className='border rounded-lg min-h-11 w-1/2'
                                    value={productSkus.find((item) => item.sku === product.sku)?.quantity || ''}
                                    onChange={(e) => handleInputChange(product.sku, 'quantity', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tabs.TabPane>
                    )
                  })}
                </Tabs>
              )}
              {/* End Attribute */}

              <div className='mt-10'>
                <div className='flex items-center justify-end gap-6'>
                  <button
                    className='bg-[#EFEFEF] text-[#3B3B3B] h-11 rounded-lg w-[340px] font-semibold text-normal flex items-center justify-center'
                    onClick={() => navigate('/admin/manager-product')}
                  >
                    Cancel
                  </button>

                  <button
                    className='bg-[#5B4DFB] text-white h-11 rounded-lg w-[340px] font-semibold text-normal flex items-center justify-center'
                    type='submit'
                    onClick={handleSubmit}
                    disabled={
                      fileListMain.length === 0 && !form.isFieldsTouched(false)
                      // form.getFieldsError().some(({ errors }) => errors.length > 0)
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
            </Form>
          ) : (
            <>
              <Loading />
            </>
          )}
          {/* <h3 className='font-bold text-largerPrdName text-[#3B3B3B]'>Edit Product</h3> */}
        </div>
      </div>
    </Card>
  )
}
