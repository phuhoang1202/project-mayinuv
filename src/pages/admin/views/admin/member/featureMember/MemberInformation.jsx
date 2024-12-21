import Card from '@pages/admin/components/card'
import React, { useState } from 'react'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import { Form, Input, Select } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Dropdown, Menu, Radio } from 'antd'
import IconArrowDownFill from '@assets/images/IconArrowDownFill.svg'
import FlagKorea from '@assets/images/flag/FlagKorea.svg'
import FlagChina from '@assets/images/flag/FlagChina.svg'
import FlagJapan from '@assets/images/flag/FlagJapan.svg'
import FlagVN from '@assets/images/flag/FlagVN.svg'
import FlagAsia from '@assets/images/flag/FlagAsia.svg'
import IconBack from '@assets/images/IconBack.svg'
import { useNavigate, useParams } from 'react-router-dom'

export default function MemberInformation() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const param = useParams()
  const { id } = param
  const [value, setValue] = useState(1)
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  const menu = (
    <Menu style={{ width: '140px' }}>
      <Menu.Item>
        <div className='flex items-center gap-3 border-b'>
          <img src={FlagKorea} alt='icon' /> +82
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-3'>
            <img src={FlagChina} alt='icon' /> +86
          </div>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-3'>
            <img src={FlagJapan} alt='icon' /> +81
          </div>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-3'>
            <img src={FlagVN} alt='icon' /> +84
          </div>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-3'>
            <img src={FlagAsia} alt='icon' /> +84
          </div>
        </div>
      </Menu.Item>
    </Menu>
  )

  const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']
  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))

  return (
    <Card extra={'w-full h-full'}>
      <div className='absolute top-4 left-4 cursor-pointer' onClick={() => navigate(-1)}>
        <img src={IconBack} alt='icon' />
      </div>

      <div className='h-full overflow-x-scroll xl:overflow-x-hidden mt-10 mb-8 relative'>
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
            <Form form={form}>
              {/* Row 1 */}
              <div className='flex gap-6 items-center justify-between'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='memberKey' className='text-[#3B3B3B] font-medium text-normal'>
                    Member Key
                  </label>
                  <Input
                    id='memberKey'
                    placeholder='진선미@naver.com'
                    className='border px-2 rounded-lg h-11 bg-[#EFEFEF]'
                    disabled
                  />
                </div>

                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='id' className='text-[#3B3B3B] font-medium text-normal'>
                    ID
                  </label>
                  <Input
                    id='id'
                    placeholder='이메일 아이디'
                    className='border px-2 rounded-lg h-11'
                    style={{ border: '1px solid #EFEFEF' }}
                  />
                </div>

                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='password' className='text-[#3B3B3B] font-medium text-normal'>
                    Password Fix
                  </label>
                  <Input.Password
                    id='password'
                    placeholder='비밀번호'
                    className='border px-2 rounded-lg h-11'
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className='flex gap-6 mt-6 items-center justify-between'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                    이름
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
                    생년월일
                  </label>
                  <Input id='birthdate' placeholder='yyyy-mm-dd' className='border px-2 rounded-lg h-11' />
                </div>

                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='address' className='text-[#3B3B3B] font-medium text-normal'>
                    주소
                  </label>

                  <div>
                    <Select
                      mode='multiple'
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
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className='flex gap-6 mt-6'>
                <div className='flex flex-col gap-1 flex-1'>
                  <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                    전화번호
                  </label>
                  <div className='flex gap-1 border px-2 rounded-lg'>
                    <Dropdown overlay={menu} trigger={['click']} className='h-11'>
                      <button className='flex items-center justify-between w-40'>
                        <img src={FlagKorea} alt='icon' /> <span>+82</span>
                        <img src={IconArrowDownFill} alt='photo' />
                      </button>
                    </Dropdown>

                    <input id='phoneNumber' placeholder='01012345678' className='h-11 w-full' />
                  </div>
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

                <div className='flex-1'></div>
              </div>

              {/* Row 4 */}
              <div className='mt-10'>
                <div className='flex gap-6 mt-6 items-center justify-between'>
                  <div className='flex flex-col gap-1 flex-1'>
                    <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                      Number Of Purchases
                    </label>
                    <div className='flex items-center gap-3'>
                      <Input placeholder='12' className='border px-2 rounded-lg h-11 bg-[#EFEFEF] flex-1' disabled />
                      <button className=' bg-[#EFEEFF] h-11 rounded-lg px-2 flex justify-center items-center'>
                        인증요청
                      </button>
                    </div>
                  </div>

                  <div className='flex flex-col gap-1 flex-1'>
                    <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                      Total purchase price
                    </label>
                    <div className='flex items-center gap-3'>
                      <Input
                        placeholder='5.000.000'
                        className='border px-2 rounded-lg h-11 bg-[#EFEFEF] flex-1'
                        disabled
                      />
                      <button className='bg-[#EFEEFF] h-11 rounded-lg px-2 flex justify-center items-center'>
                        인증요청
                      </button>
                    </div>
                  </div>

                  <div className='flex flex-col gap-1 flex-1'>
                    <label htmlFor='address' className='text-[#3B3B3B] font-medium text-normal'>
                      Last time Of Purchase
                    </label>

                    <Input
                      placeholder='20240920'
                      className='border px-2 rounded-lg h-11 bg-[#EFEFEF]'
                      style={{ border: '1px solid #EFEFEF' }}
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Row 5 */}
              <div className='mt-6'>
                <div className='flex gap-6 mt-6 justify-between items-center'>
                  <div className='flex flex-col gap-1 flex-1'>
                    <label htmlFor='address' className='text-[#3B3B3B] font-medium text-normal'>
                      Join Data
                    </label>

                    <Input
                      placeholder='20240720'
                      className='border px-2 rounded-lg h-11 bg-[#EFEFEF]'
                      style={{ border: '1px solid #EFEFEF' }}
                      disabled
                    />
                  </div>

                  <div className='flex flex-col gap-1 flex-1'>
                    <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                      DSP Point
                    </label>
                    <div className='flex items-center gap-3'>
                      <Input
                        placeholder='2,550,000'
                        className='border px-2 rounded-lg h-11 bg-[#EFEFEF] flex-1'
                        disabled
                      />
                      <button className='bg-[#EFEEFF] h-11 rounded-lg px-2 flex justify-center items-center'>
                        지급/차감하기
                      </button>
                      <button className='bg-[#EFEEFF] h-11 rounded-lg px-2 flex justify-center items-center'>
                        내역보기
                      </button>
                    </div>
                  </div>

                  <div className='flex flex-col gap-1 flex-1'>
                    <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                      Coupon
                    </label>
                    <div className='flex items-center gap-3'>
                      <Input placeholder='3' className='border px-2 rounded-lg h-11 bg-[#EFEFEF] flex-1' disabled />
                      <button className=' bg-[#EFEEFF] h-11 rounded-lg px-2 flex justify-center items-center'>
                        내역보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 6 */}
              <div className='mt-10'>
                <div className='flex flex-col gap-1 w-[382px]'>
                  <label htmlFor='birthdate' className='text-[#3B3B3B] font-medium text-normal'>
                    Status
                  </label>
                  <div className='mt-3'>
                    <Radio.Group onChange={onChange} value={value}>
                      <Radio value={true}>활성화</Radio>
                      <Radio value={false}>비활성화</Radio>
                    </Radio.Group>
                  </div>
                </div>
              </div>
            </Form>
          </div>

          <div className='mt-8 text-end'>
            <button className='bg-[#5B4DFB] w-[360px] font-semibold text-normal text-[#FFFFFF] h-11 rounded-lg'>
              회원정보 업데이트
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}
