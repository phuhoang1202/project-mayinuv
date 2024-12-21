import React from 'react'
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd'
import moment from 'moment'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker
const { Option } = Select

const ModalAdmin = ({ visible, onCancel, onOk, form, initialValues, fields, title, loading }) => {
  const validateDateRange = (_, value) => {
    if (!value || value.length < 2) {
      return Promise.reject(new Error('Please select a date range'))
    }
    const [startDate, endDate] = value
    if (dayjs(startDate).isBefore(dayjs().startOf('day'), 'day')) {
      return Promise.reject(new Error('Start date must be today or later'))
    }
    if (dayjs(endDate).isBefore(dayjs(startDate), 'day')) {
      return Promise.reject(new Error('End date must be after the start date'))
    }
    return Promise.resolve()
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key='back' onClick={onCancel}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={onOk} loading={loading}>
          {title.includes('Add') ? 'Create' : 'Update'}
        </Button>,
      ]}
    >
      <Form form={form} layout='vertical' initialValues={initialValues}>
        {fields.map((field) => {
          switch (field.name) {
            case 'description':
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={[{ required: true, message: `Please input the ${field.label.toLowerCase()}!` }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              )
            case 'type':
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={[{ required: true, message: `Please select the ${field.label.toLowerCase()}!` }]}
                >
                  <Select>
                    <Option value='sale'>Sale</Option>
                    <Option value='ship'>Ship</Option>
                    <Option value='event'>Event</Option>
                    <Option value='recommend'>Recommend</Option>
                    <Option value='new_product'>New Product</Option>
                    <Option value='best'>Best</Option>
                  </Select>
                </Form.Item>
              )
            case 'active':
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={[{ required: true, message: `Please select the ${field.label.toLowerCase()}!` }]}
                >
                  <Select>
                    <Option value={true}>Active</Option>
                    <Option value={false}>Inactive</Option>
                  </Select>
                </Form.Item>
              )
            case 'dateRange':
              return (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={[
                    { required: true, message: `Please select the ${field.label.toLowerCase()}!` },
                    { validator: validateDateRange },
                  ]}
                >
                  <RangePicker
                    format='YYYY-MM-DD'
                    showTime
                    className='w-full'
                    defaultValue={
                      initialValues?.dateRange ? [moment(initialValues.startDate), moment(initialValues.endDate)] : []
                    }
                  />
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
                  <Input />
                </Form.Item>
              )
          }
        })}
      </Form>
    </Modal>
  )
}

export default ModalAdmin
