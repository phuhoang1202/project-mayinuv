import Card from '@pages/admin/components/card'
import React, { useState } from 'react'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import IconBack from '@assets/images/IconBack.svg'
import { Dropdown, Menu, Radio, DatePicker, Select, Space, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import { phoneNumberData } from '@utils/international_phone_number.js'

export default function AddNewMember() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [value, setValue] = useState(1)

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  const OPTIONS = ['Korea', 'China', 'Japan', 'VietNam', 'Asia']
  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))

  // Phone
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('kr')

  const handleChangePhone = (el, country) => {
    setPhone(el)
    setCountryCode(country.countryCode)
  }

  const handleAddMember = async () => {
    try {
      const payload = [
        {
          email: form.getFieldValue('email'),
          password: form.getFieldValue('password'),
          gender: form.getFieldValue('gender'),
          name: form.getFieldValue('name'),
          otp: form.getFieldValue('otp'),
          phoneNumber: phone,
          birthday: new Date(),
        },
      ]

      const responseRegister = await registerApi(payload)

      if (Array.isArray(responseRegister.data) && responseRegister.data.length != 0) {
        navigate('/login')
        Toast.success('Registration successful!')
      }
    } catch (error) {
      Toast.error('An error occurred during registration.')
      console.error('Registration error:', error)
    }
  }

  return (
    <Card extra={'w-full h-[87vh]'}>
      <div className='absolute top-4 left-4 cursor-pointer' onClick={() => navigate(-1)}>
        <img src={IconBack} alt='icon' />
      </div>

      <div className='h-full overflow-x-scroll xl:overflow-x-hidden mt-8 mb-20 '>
        <div className='mx-40'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-[60px] h-[60px] rounded-full'>
                <img src={DefaultAvatar} alt='image' className='w-full h-full object-cover' />
              </div>

              <div className='flex flex-col'>
                <div className='text-[#3B3B3B] font-bold text-textPrd'>진선미</div>
                <div className='text-[#8C8C8C] font-medium text-small'>회원등급</div>
              </div>
            </div>
          </div>

          <div className='mt-10'>
            <Form form={form} onFinish={handleAddMember}>
              {/* Row 1 */}
              <div className='flex gap-6 items-center justify-between'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='memberKey' className='text-[#3B3B3B] font-medium text-normal'>
                    ID
                  </label>
                  <Form.Item
                    name='email'
                    rules={[
                      { required: true, message: 'ID is required!' },
                      { type: 'email', message: 'Please enter a valid email address!' },
                    ]}
                  >
                    <Input id='email' placeholder='진선미@naver.com' className='border px-2 rounded-lg h-11' />
                  </Form.Item>
                </div>

                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='password' className='text-[#3B3B3B] font-medium text-normal'>
                    Password
                  </label>
                  <Form.Item
                    name='password'
                    rules={[
                      { required: true, message: 'Password is required!' },
                      { min: 8, message: 'Password must be at least 8 characters!' },
                    ]}
                  >
                    <Input.Password
                      id='password'
                      placeholder='비밀번호'
                      className='border px-2 rounded-lg h-11'
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </div>

                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='password' className='text-[#3B3B3B] font-medium text-normal'>
                    Password Check
                  </label>
                  <Form.Item
                    name='passwordCheck'
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Please confirm your password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('Passwords do not match!'))
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      id='passwordCheck'
                      placeholder='비밀번호 확인'
                      className='border px-2 rounded-lg h-11'
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </Form.Item>
                </div>
              </div>

              {/* Row 2 */}
              <div className='flex gap-6 mt-6 justify-between items-center'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                    Name
                  </label>
                  <Input
                    id='name'
                    placeholder='홍길동'
                    className='border px-2 rounded-lg h-11 bg-[#EFEFEF]'
                    style={{ border: '1px solid #EFEFEF' }}
                    disabled
                  />
                </div>

                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='birthdate' className='text-[#3B3B3B] font-medium text-normal'>
                    성별
                  </label>
                  <div className='mt-3'>
                    <Radio.Group onChange={onChange} value={value}>
                      <Radio value={1}>남</Radio>
                      <Radio value={2}>여</Radio>
                    </Radio.Group>
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className='mt-6'>
                <div className='flex gap-6 mt-6 items-center justify-between'>
                  <div className='flex flex-col gap-1 flex-1'>
                    {/* Birth */}
                    <label htmlFor='birth' className='text-[#3B3B3B] font-medium text-normal'>
                      Birth
                    </label>
                    <Form.Item name='birth' rules={[{ required: true, message: 'Birth date is required!' }]}>
                      <DatePicker
                        onChange={onChange}
                        placeholder='Select your birth date'
                        style={{ height: '44px', width: '100%' }}
                      />
                    </Form.Item>
                  </div>

                  <div className='flex flex-col gap-1 flex-1'>
                    {/* Nation */}
                    <label htmlFor='nation' className='text-[#3B3B3B] font-medium text-normal'>
                      Nation
                    </label>
                    <Form.Item name='nation' rules={[{ required: true, message: 'Nation is required!' }]}>
                      <Select
                        placeholder='대한민국'
                        value={selectedItems}
                        onChange={setSelectedItems}
                        style={{
                          width: '100%',
                          height: '44px',
                        }}
                        options={filteredOptions.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                      />
                    </Form.Item>
                  </div>

                  <div className='flex flex-col gap-1 flex-1'>
                    <Form.Item
                      name='phone'
                      rules={[
                        {
                          required: true,
                          message: 'Phone number is required!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const cleanedValue = value.replace(/\s+/g, '')
                            const selectedCountry = phoneNumberData.find(
                              (item) => item.country === countryCode.toUpperCase(),
                            )
                            const regex = selectedCountry?.regex ? new RegExp(selectedCountry.regex) : null

                            if (!cleanedValue) {
                              return Promise.reject('Phone number is required!')
                            }
                            if (!regex || regex.test(cleanedValue)) {
                              return Promise.resolve()
                            }
                            return Promise.reject(
                              `Invalid phone number format for ${selectedCountry?.country || 'the selected country'}!`,
                            )
                          },
                        }),
                      ]}
                    >
                      <div className='flex flex-col gap-1'>
                        <label htmlFor='phone' className='text-[#3B3B3B] font-medium text-normal'>
                          전화번호
                        </label>
                        <PhoneInput
                          country={countryCode}
                          value={phone}
                          onChange={(el, country) => handleChangePhone(el, country)}
                          inputClass='border px-2 rounded-lg w-full'
                        />
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Form>
          </div>

          <div className='mt-8 text-end'>
            <button className='bg-[#5B4DFB] w-[360px] font-semibold text-normal text-[#FFFFFF] h-11 rounded-lg'>
              가입 완료
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}
