import React, { useEffect, useState } from 'react'
import { DatePicker, Radio, Select, Input, Form } from 'antd'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import IconError from '@assets/images/IconError.svg'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { phoneNumberData } from '@utils/international_phone_number.js'
import { user } from '@services/user/user'
import { cart } from '@services/user/cart'
import axios from 'axios'
import Loading from '@components/loadingCommon/Loading'
import { Toast } from '@utils/toast'
import { getUserInfor, setUserInfor } from '@utils/auth'
import moment from 'moment'

export default function AdditionalInformation() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  // const [countryCodeState, setCountryCodeState] = useState('kr')
  // const [isFormFilled, setIsFormFilled] = useState(false)
  const [countryKr, setCountryKr] = useState('ko')
  const [countryPhone, setCountryPhone] = useState('kr')

  // Lấy địa chỉ
  const [dataInput, setDataInput] = useState({
    birthday: '',
    gender: '',
    state: '',
    clearanceNumber: '',
    phoneNumber: '',
    address: '',
    referralCode: '',
  })

  const { birthday, gender, state, clearanceNumber, phoneNumber, address, referralCode } = dataInput

  // useEffect(() => {
  //   axios
  //     .get(`https://ipinfo.io/json?token=1faa919ba3e08a`)
  //     .then((response) => {
  //       const res = response.data

  //       setCountryCodeState(res.country) // vn
  //       setLocality(res.region) // hn
  //     })
  //     .catch((error) => {
  //       Toast.error('국가 코드를 가져오는 중 오류가 발생했습니다.')
  //     })
  // }, [])

  const mapCountryCode = (countryCode) => {
    const countryMap = {
      kr: 'ko', // Hàn Quốc
      vn: 'vi', // Việt Nam
      jp: 'ja', // Nhật Bản
      cn: 'cn', // Trung Quốc
      us: 'en', // Toàn cầu
    }

    return countryMap[countryCode] || 'ko'
  }

  // get Data
  useEffect(() => {
    try {
      const userInfo = getUserInfor()

      if (userInfo) {
        const parsedInfo = JSON.parse(userInfo)
        console.log(parsedInfo)

        const formattedBirthday = parsedInfo.birthday ? moment(parsedInfo.birthday).format('YYYY-MM-DD') : null
        setDataInput({
          birthday: formattedBirthday || null,
          gender: parsedInfo.gender || '',
          state: parsedInfo.state || 'ko',
          clearanceNumber: parsedInfo.clearanceNumber || '',
          phoneNumber: parsedInfo.phoneNumber || '',
          address: parsedInfo.address || '',
          referralCode: parsedInfo.referralCode || '',
        })
        setCountryPhone(parsedInfo.countryPhone || 'kr')
        setCountryKr(parsedInfo.state)
        // setPhone(parsedInfo.phoneNumber || '')
      }
    } catch (error) {
      console.log('Failed to fetch user data')
    }
  }, [form])

  const mapToCountryCode = (value) => {
    const mapping = {
      ko: 'kr', // Korea
      cn: 'cn', // China
      ja: 'jp', // Japan
      vi: 'vn', // Việt Nam
      en: 'us', // Global
    }

    return mapping[value] || value
  }

  const handleChangeInput = (e) => {
    const { name, value, type } = e.target
    const parsedValue = type === 'number' ? Number(value) : value

    // Cập nhật cả [name] và promotions với giá trị của filteredPromotions
    setDataInput((prevDataInput) => ({
      ...prevDataInput,
      [name]: parsedValue,
    }))
  }

  const handleAdditionalInfo = async () => {
    try {
      setLoading(true)
      const formattedBirthday = birthday ? new Date(birthday).toISOString() : null
      const updatedData = {
        ...dataInput,
        birthday: formattedBirthday,
        gender,
        state,
        clearanceNumber,
        phoneNumber,
        address,
        referralCode,
      }

      await user.postFormUser(updatedData).then((res) => {
        setUserInfor(JSON.stringify(res.data.data))
      })

      Toast.success('Information updated successfully!')
    } catch (error) {
      Toast.error('Information updated failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Form form={form} onFinish={handleAdditionalInfo} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label className='text-[#3B3B3B] font-medium text-normal'>생년월일</label>
          <Input
            id='birthday'
            type='date'
            name='birthday'
            value={birthday}
            onChange={handleChangeInput}
            placeholder='Enter your date of birth'
            className='border px-2 rounded-lg h-11'
          />
        </div>

        <div className='flex items-center mb-2 mt-2 gap-10'>
          <label className='text-[#3B3B3B] font-medium text-normal'>성별</label>
          <Radio.Group className='flex items-center gap-10' name='gender' value={gender} onChange={handleChangeInput}>
            <Radio value='male'>남</Radio>
            <Radio value='female'>여</Radio>
          </Radio.Group>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-[#3B3B3B] font-medium text-normal'>국가</label>
          <Select
            placeholder='Korea'
            className='h-11'
            options={[
              { value: 'kr', label: 'Korea' },
              { value: 'cn', label: 'China' },
              { value: 'jp', label: 'Japan' },
              { value: 'vn', label: 'Việt Nam' },
              { value: 'us', label: 'Global' },
            ]}
            value={state}
            name='state'
            onChange={(value) => {
              handleChangeInput({ target: { name: 'state', value } })
              setCountryKr(value)
              setCountryPhone(mapToCountryCode(value))
            }}
          />
        </div>

        {countryKr === 'kr' && (
          <div>
            <label className='text-[#3B3B3B] font-medium text-normal'>통관번호</label>
            <div className='flex items-center justify-between gap-4'>
              <div className='flex flex-col flex-1 gap-1'>
                <Input
                  type='text'
                  placeholder='통관번호'
                  className='border px-2 rounded-lg h-11'
                  name='clearanceNumber'
                  value={clearanceNumber}
                  onChange={handleChangeInput}
                />
              </div>
              <button
                className='border px-2 rounded-lg h-11 bg-[#D3D2D2]'
                onClick={() => window.open('https://unipass.customs.go.kr/csp/persIndex.do?search_put=', '_blank')}
              >
                발급하기
              </button>
            </div>
          </div>
        )}

        <div className='flex flex-col gap-1'>
          <label className='text-[#3B3B3B] font-medium text-normal'>주소</label>
          <Input
            id='address'
            type='text'
            placeholder='Enter your address'
            className='border px-2 rounded-lg h-11'
            name='address'
            value={address}
            onChange={handleChangeInput}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-[#3B3B3B] font-medium text-normal'>추천코드</label>
          <Input
            type='text'
            placeholder='추천코드'
            className='border px-2 rounded-lg h-11'
            name='referralCode'
            value={referralCode}
            onChange={handleChangeInput}
          />
        </div>

        <Form.Item
          name='phoneNumber'
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const cleanedValue = phoneNumber?.replace(/\s+/g, '')

                const selectedCountry = phoneNumberData.find((item) => item.country === countryKr)

                const regex = selectedCountry?.regex ? new RegExp(selectedCountry.regex) : null

                if (!cleanedValue) {
                  return Promise.reject('전화번호를 입력해주세요.')
                }
                if (!regex || regex.test(cleanedValue)) {
                  return Promise.resolve()
                }
                return Promise.reject(`잘못된 전화번호 형식입니다 ${selectedCountry?.countryName || '선택된 국가'}!`)
              },
            }),
          ]}
        >
          <div className='flex flex-col gap-1'>
            <label className='text-[#3B3B3B] font-medium text-normal'>전화번호</label>
            <Input
              type='text'
              placeholder='전화번호를 입력하세요'
              className='border px-2 rounded-lg h-11'
              name='phoneNumber'
              value={phoneNumber}
              onChange={handleChangeInput}
            />
          </div>
        </Form.Item>

        <button
          className={`h-11 font-semibold text-normal text-white rounded-lg w-full bg-[#D1B584]`}
          // disabled={!isFormFilled}
          // type='submit'
        >
          다음
        </button>
      </Form>
    </>
  )
}
