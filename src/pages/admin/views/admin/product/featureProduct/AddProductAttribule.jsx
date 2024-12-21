import React, { useEffect, useRef, useState } from 'react'
import { Form, Select, Button, Divider, Input, Space, Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import IconClose from '@assets/images/IconClose.svg'
import IconAsterisk from '@assets/images/admin/IconAsterisk.svg'
import IconBack from '@assets/images/IconBack.svg'

let index = 0

export default function AddProductAttribule({ setCurrentStepAdd, dataInput, setDataInput, handleSubmit }) {
  const [selectedAttributes, setSelectedAttributes] = useState([])
  const [items, setItems] = useState([])
  const [valueName, setValueName] = useState('')
  const inputRef = useRef(null)
  const [activeKey, setActiveKey] = useState('0')
  const [inputValues, setInputValues] = useState([])
  const [priceSync, setPriceSync] = useState(0)

  const handleTabChange = (key) => {
    setActiveKey(key)
  }

  const options = [
    { label: 'Color', value: 'Color' },
    { label: 'Size', value: 'Size' },
    { label: 'Material', value: 'Material' },
    { label: 'Weight', value: 'Weight' },
    { label: 'Custom Attribute', value: 'CUSTOM_ATTRIBUTE' },
  ]

  const onNameChange = (event) => {
    setValueName(event.target.value)
  }

  const capitalizeFirstLetter = (string) => {
    return string.toUpperCase()
  }

  const addItem = (e) => {
    // e.preventDefault()
    setItems((prevItems) => [...prevItems, capitalizeFirstLetter(valueName) || `New item ${index++}`])
    setValueName('')
    inputRef.current?.focus()
  }

  const handleAttributeChange = (value, index) => {
    setSelectedAttributes((prev) => {
      const updated = [...prev]
      updated[index] = { attribute: value, values: [] }
      return updated
    })
  }

  const handleValueChange = (values, index) => {
    setSelectedAttributes((prev) => {
      const updated = [...prev]
      if (updated[index]) {
        updated[index].values = values
      }
      return updated
    })
  }

  const handleInputChange = (key, field, value) => {
    // Update input values state
    setInputValues((prev) => {
      // Tìm chỉ số của phần tử có productSKU trùng với key hiện tại
      const index = prev.findIndex((item) => item.productSKU === key)

      // Nếu đã có phần tử với key này, cập nhật giá trị field cho nó
      if (index !== -1) {
        const updatedItem = {
          ...prev[index],
          [field]: value,
        }

        return [...prev.slice(0, index), updatedItem, ...prev.slice(index + 1)]
      } else {
        // Nếu chưa có, thêm mới một phần tử với productSKU là key
        return [
          ...prev,
          {
            productSKU: key,
            [field]: value,
          },
        ]
      }
    })

    // Create the `productSkuChild` structure
    const updatedProductSkuChild = recursive.map((dataItem, index) => {
      const attributes = selectedAttributes.map((attr, i) => ({
        attributeName: dataItem[attr.attribute] || '',
        type: attr.attribute.toUpperCase(),
      }))

      const sku = generateKey(
        dataItem.Color,
        dataItem.Size,
        dataItem.Material,
        dataItem.Weight,
        dataItem.customAttribute,
      )

      return {
        attributes,
        price: Number(inputValues[index]?.price) || 0,
        quantity: Number(inputValues[index]?.stock) || 0,
        sku,
      }
    })

    // Update productSkuChild with the new structure
    setDataInput({ ...dataInput, productSkus: updatedProductSkuChild })
  }

  const generateKey = (...rest) => {
    // Viết hoa toàn bộ `key` và các phần tử còn lại trong `rest`
    const restFiltered = rest.filter((value) => value !== undefined && value !== '').map((value) => value.toUpperCase())

    return [...restFiltered].join('')
  }

  // Start Đệ quy
  const arr = [
    {
      attribute: 'Color',
      values: ['red', 'yellow', 'blue'],
    },
    {
      attribute: 'Size',
      values: ['S', 'M', 'XL'],
    },
    {
      attribute: 'Material',
      values: ['Vai', 'Lua'],
    },
    {
      attribute: 'Weight',
      values: ['10', '20'],
    },
  ]

  // Hàm tạo tổ hợp các giá trị còn lại
  function generateCombinationsTest(attributes) {
    const result = []

    function backtrack(current, index) {
      if (index === attributes.length) {
        result.push(current)
        return
      }

      const { attribute, values } = attributes[index]
      for (const value of values) {
        backtrack({ ...current, [attribute]: value }, index + 1)
      }
    }

    backtrack({}, 0)
    return result
  }

  // Hàm chính để tạo cấu trúc dữ liệu với tổ hợp cho tất cả giá trị của Color
  function createStructuredData(arr) {
    const attributeTab = arr[0] // Đối tượng đầu tiên
    const otherAttributes = arr.slice(1) // Các đối tượng còn lại

    // Tạo tổ hợp cho các attribute còn lại
    const combinations = generateCombinationsTest(otherAttributes)

    // Gộp mỗi giá trị của Color với tất cả tổ hợp từ combinations
    const recursive = attributeTab.values.flatMap((colorValue) =>
      combinations.map((combination) => ({
        [attributeTab.attribute]: colorValue,
        ...combination,
      })),
    )

    return {
      attributeTab,
      recursive,
    }
  }
  // End Đệ quy

  const result = selectedAttributes && selectedAttributes.length > 0 && createStructuredData(selectedAttributes)
  // Destructure only if result is not null
  const { attributeTab, recursive } = result || {}

  const handleSynchPrice = () => {}

  const handleCancel = () => {
    setSelectedAttributes([])
    setCurrentStepAdd(0)
  }

  const isDisabled = inputValues?.some((item) => !item.stock || !item.quantity)
  console.log('isDisabled', isDisabled)

  return (
    <div className='mx-auto w-full'>
      <div className='absolute top-4 left-4 cursor-pointer' onClick={() => setCurrentStepAdd(0)}>
        <img src={IconBack} alt='icon' />
      </div>
      <h3 className='text-[#3B3B3B] font-bold text-largerPrdName'>Add attributes to product</h3>
      <div className='mt-10'>
        <Form name='dynamic_form_nest_item' autoComplete='off'>
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
                              (option) => !selectedAttributes.some((attr) => attr.attribute === option.value),
                            )}
                            className='h-11'
                          />
                        </Form.Item>
                      </div>
                      <div className='flex flex-col gap-1 flex-1'>
                        <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
                          Value <img src={IconAsterisk} alt='icon' />
                        </label>
                        <Form.Item
                          name={[name, 'values']}
                          rules={[{ required: true, message: 'Please select a value' }]}
                        >
                          <Select
                            className='h-11'
                            mode='multiple'
                            placeholder='custom dropdown render'
                            dropdownRender={(menu) => (
                              <>
                                {menu}
                                <Divider style={{ margin: '8px 0' }} />
                                <div style={{ padding: '0 8px 4px', width: '100%' }} className='flex items-center'>
                                  <Input
                                    placeholder='Please enter item'
                                    ref={inputRef}
                                    value={valueName}
                                    onChange={onNameChange}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.stopPropagation()
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
                        </Form.Item>
                      </div>
                      <button type='button' onClick={() => remove(name)} className='absolute top-5 right-3'>
                        <img src={IconClose} alt='icon' />
                      </button>
                    </div>
                  </div>
                ))}
                <Form.Item className='mt-4'>
                  <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />} className='h-11'>
                    Add attribute
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>

      {/* <h3 className='font-bold text-primaryPrdName text-[#3B3B3B] mt-8'>Product price by attribute</h3>
      <div className='flex flex-col gap-1 mt-4'>
        <label className='text-[#3B3B3B] font-medium text-normal flex items-start'>
          Price <img src={IconAsterisk} alt='icon' />
        </label>
        <div className='flex items-center gap-8'>
          <Input
            placeholder='AAAAAAA'
            className='border px-2 rounded-lg h-11'
            value={priceSync}
            onChange={(e) => setPriceSync(e.target.value)}
          />
          <button
            className='text-[#5B4DFB] bg-[#EFEEFF] px-2 h-11 text-small font-medium rounded-lg w-60'
            onClick={handleSynchPrice}
          >
            Synchronization
          </button>
        </div>
      </div> */}

      {selectedAttributes && selectedAttributes.length > 0 && (
        <Tabs defaultActiveKey='0' activeKey={activeKey} onChange={handleTabChange} className='mt-4'>
          {attributeTab?.values.map((value, valueIndex) => {
            const filteredData = recursive.filter((item) => item[attributeTab.attribute] === value)
            return (
              <Tabs.TabPane
                tab={
                  <span
                    className={`${
                      activeKey === valueIndex.toString()
                        ? 'text-[#5B4DFB] font-semibold'
                        : 'text-[#AFAEAE] font-medium'
                    } text-normal`}
                  >
                    {value}
                  </span>
                }
                key={valueIndex}
              >
                <div className='mt-5'>
                  {filteredData.map((dataItem, index) => {
                    const uniqueKey = generateKey(
                      dataItem.Size,
                      dataItem.Color,
                      dataItem.Material,
                      dataItem.Weight,
                      dataItem.customAttribute,
                    )

                    // Tạo chuỗi động từ `dataItem` dựa trên `arr`
                    const itemDescription = arr
                      .map((attr) => dataItem[attr.attribute] || '')
                      .filter(Boolean)
                      .join(', ')

                    return (
                      <div key={uniqueKey} className='mb-4'>
                        <div className='ml-4'>
                          <span className='font-medium'>{itemDescription}</span>

                          <div className='flex gap-2 mt-1'>
                            <Input
                              placeholder='Enter price'
                              className='border rounded-lg min-h-11 w-1/2'
                              value={inputValues.find((item) => item.productSKU === uniqueKey)?.price || ''}
                              onChange={(e) => handleInputChange(uniqueKey, 'price', e.target.value)}
                            />
                            <Input
                              placeholder='Enter stock'
                              className='border rounded-lg min-h-11 w-1/2'
                              value={inputValues.find((item) => item.productSKU === uniqueKey)?.stock || ''}
                              onChange={(e) => handleInputChange(uniqueKey, 'stock', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Tabs.TabPane>
            )
          })}
        </Tabs>
      )}

      <div className='flex items-center gap-6 justify-end mt-8'>
        <button
          className='bg-[#EFEFEF] font-semibold text-normal rounded-lg h-11 w-[340px]'
          onClick={() => handleCancel()}
        >
          Cannel
        </button>
        <button
          className='bg-[#5B4DFB] text-white font-semibold text-normal rounded-lg h-11 w-[340px]'
          onClick={() => handleSubmit()}
          disabled={!isDisabled}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
