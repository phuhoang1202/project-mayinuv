import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Form, Input, Button, Radio, Steps, Modal, Select } from 'antd'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './SignUp.css'
import { useGeolocated } from 'react-geolocated'
import axios from 'axios'
import Loading from '@components/loadingCommon/Loading'
import { Toast } from '@utils/toast'
import { registerApi, verifyOTP } from '@services/user/auth.js'
import Group from '@assets/images/Logo/Group.svg'
import IconError from '@assets/images/IconError.svg'
import IconArrowRight from '@assets/images/IconArrowRight.svg'
import StepSignUp2 from './feature/stepSignUp/StepSignUp2'
import { phoneNumberData } from '@utils/international_phone_number.js'

function SignUp() {
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('kr')
  // const [countryName, setCountryName] = useState('Korea')
  const [loading, setLoading] = useState(false)
  const [otpEnabled, setOtpEnabled] = useState(false)
  const [registerResponse, setRegisterResponse] = useState(null)
  const [minutes, setMinutes] = useState(4)
  const [seconds, setSeconds] = useState(59)
  const [checkBtn, setCheckBtn] = useState(false)
  const [dataResponve, setDataResponve] = useState({})
  const [getAddress, setGetAddress] = useState({})
  const [countryKr, setCountryKr] = useState('')

  // Step
  const stepsCurrent = [
    {
      id: 1,
      step: '회원 인증',
    },
    { id: 2, step: '약관 동의' },
    { id: 3, step: '정보 입력' },
  ]

  const onChange = (text) => {
    console.log('onChange:', text)
  }
  const sharedProps = {
    onChange,
  }

  // const { coords } = useGeolocated({
  //   positionOptions: {
  //     enableHighAccuracy: false,
  //   },
  //   userDecisionTimeout: 5000,
  // })

  // const handleReset = () => {
  //   form.resetFields()
  //   setCurrentStep(0)
  // }

  const navigate = useNavigate()

  const handleNext = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setCurrentStep(currentStep + 1)
    }, 500)
  }

  const handlePrev = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setCurrentStep(currentStep - 1)
    }, 500)
  }

  // Get current location
  useEffect(() => {
    // if (coords) {
    //   const { latitude, longitude } = coords
    axios
      .get(`https://ipinfo.io/json?token=1faa919ba3e08a`)
      .then((response) => {
        setGetAddress(response.data)
        // const countryCode = response.data.countryCode.toLowerCase()
        setCountryCode(response.data.country.toLowerCase())
        // setCountryName(response.data.countryName)
      })
      .catch((error) => {
        console.error('Error fetching country code:', error)
      })
    // }
  }, [])

  // Submit Step current === 0
  const handleStep0Submit = async () => {
    try {
      const email = form.getFieldValue('email')
      const name = form.getFieldValue('name')
      if (!email || !name) {
        Toast.error('Please enter your name and email!')
        return
      }
      setLoading(true)

      const bodyRegister = [{ email: email, name: name, emailVerified: true, username: email, sendOTP: true }]

      const response = await registerApi(bodyRegister)
      if (response.status === 208) {
        Toast.error('Email already exists.')
        return
      }

      setDataResponve(response.data[0])

      if (Array.isArray(response.data) && response.data.length != 0) {
        setOtpEnabled(true)
        setRegisterResponse(response.data.response)
        Toast.success('Success to send verification email.')
      } else {
        Toast.error('Failed to send verification email.')
      }
    } catch (error) {
      Toast.error('An error occurred while sending the verification email.')
    } finally {
      setLoading(false)
    }
  }

  // SetTime
  useEffect(() => {
    if (otpEnabled) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval)
          } else {
            setSeconds(59)
            setMinutes(minutes - 1)
          }
        }
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [seconds, minutes, otpEnabled])

  // Verify OTP
  const handleVerifyOTP = async () => {
    try {
      const email = form.getFieldValue('email')
      const otp = form.getFieldValue('otp')
      const bodyVerify = { email: email, otp: otp }
      const responseOTP = await verifyOTP(bodyVerify)

      if (responseOTP.data) {
        Toast.success('OTP verification successful!')
        setCheckBtn(!checkBtn)
        setOtpEnabled(!otpEnabled)
      } else {
        Toast.error('OTP verification failed. Please try again.')
      }
    } catch (error) {
      Toast.error('An error occurred while verifying OTP.')
    }
  }

  // Step 2
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [countryPhone, setCountryPhone] = useState('kr')

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

  const handleValuesChange = (changedValues, allValues) => {
    // Kiểm tra nếu có ít nhất một trường có giá trị
    const isFilled = Object.values(allValues).some((value) => value)
    setIsFormFilled(isFilled)
  }

  const handleStep2Submit = async () => {
    try {
      // setIsFormValid(true)
      const bodyRegister = [
        {
          email: form.getFieldValue('email'),
          gender: form.getFieldValue('gender'),
          name: form.getFieldValue('name'),
          otp: form.getFieldValue('otp'),
          password: form.getFieldValue('password'),
          phoneNumber: form.getFieldValue('phoneNumber'),
          birthday: form.getFieldValue('birthday'),
          username: form.getFieldValue('email'),
          countryCode: form.getFieldValue('countrySelect'),
          sendOTP: false,
          state: form.getFieldValue('countrySelect'),
          clearanceNumber: form.getFieldValue('clearanceNumber'),
          referralCode: form.getFieldValue('referralCode'),
          // state: getAddress.country,
        },
      ]

      const responseRegister = await registerApi(bodyRegister)

      if (Array.isArray(responseRegister.data) && responseRegister.data.length != 0) {
        navigate('/login')
        Toast.success('Registration successful!')
      }
    } catch (error) {
      Toast.error('An error occurred during registration.')
    }
  }

  const resendOTP = () => {
    setMinutes(4)
    setSeconds(59)
    handleVerifyOTP()
  }

  return (
    <div>
      <div className='min-h-full w-full flex items-center justify-center lg:p-8 p-4 lg:bg-white bg-[#F8F8F8]'>
        {loading && <Loading />}
        <div
          className='lg:w-[842px] w-full max-w-[92vw] bg-[#F8F8F8] lg:p-8 p-4 rounded-lg'
          // style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
        >
          <div className='flex justify-center cursor-pointer' onClick={() => navigate('/')}>
            <img src={Group} alt='photo' />
          </div>

          <div className='flex items-center lg:w-[406px] w-full mx-auto mt-4 justify-center'>
            {stepsCurrent.map((step, index) => (
              <div key={index} className='flex items-center gap-1'>
                {/* Step circle */}
                <div
                  className={`flex items-center justify-center lg:w-8 lg:h-8 h-7 w-7 rounded-md font-bold lg:text-textPrd text-small ${
                    currentStep >= index ? 'bg-[#3B3B3B] text-white' : 'bg-[#EFEFEF] text-[#AFAEAE]'
                  }`}
                >
                  {index + 1}
                </div>

                {/* Step title */}
                <div className='ml-[6px]'>
                  <div
                    className={`${
                      currentStep >= index ? 'text-[#3B3B3B]' : 'text-[#AFAEAE]'
                    } font-bold lg:text-normal text-small `}
                  >
                    {step.step}
                  </div>
                </div>

                {/* Step connector line */}
                {index < stepsCurrent.length - 1 && <img src={IconArrowRight} alt='icon' className='mx-2 w-4 h-4' />}
              </div>
            ))}
          </div>

          {/* <Steps current={currentStep} className='lg:w-[406px] w-full mx-auto mb-8 mt-4'>
          <Steps.Step title='회원 인증' />

          <Steps.Step title='약관 동의' />
          <Steps.Step title='정보 입력' />
        </Steps> */}

          {currentStep === 0 && (
            <div className='max-w-[406px] mx-auto mt-12'>
              <div className='flex flex-col justify-center items-center gap-2'>
                <h2 className='text-[#3B3B3B] font-bold text-primaryPrdName'>회원 인증</h2>
                <p className='text-[#3B3B3B] font-medium text-small'>이름과 이메일로 간단하게 인증을 합니다.</p>
              </div>

              <div className='mt-10'>
                <Form form={form}>
                  <Form.Item
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: '이름을 입력해주세요.',
                      },
                      {
                        min: 3,
                        message: '이름은 최소 3자 이상이어야 합니다',
                      },
                      {
                        max: 24,
                        message: '이름은 25자 미만이어야 합니다.',
                      },
                    ]}
                  >
                    <div className='flex flex-col gap-1'>
                      <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                        이름
                      </label>
                      <Input id='name' placeholder='홍길동' className='border p-2 rounded-lg h-11' />
                    </div>
                  </Form.Item>

                  <Form.Item
                    className='mt-4'
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: '이메일을 입력해주세요.',
                      },
                      {
                        type: 'email',
                        message: '유효한 이메일 주소를 입력해주세요.',
                      },
                    ]}
                  >
                    <div className='flex flex-col gap-1'>
                      <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                        이메일
                      </label>
                      <div className='flex items-center justify-between gap-3'>
                        <Input id='email' placeholder='email@naver.com' className='border p-2 rounded-lg h-11 flex-1' />
                        <button
                          onClick={handleStep0Submit}
                          className='bg-[#D3D2D2] hover:bg-[#c4c4c4] w-24 h-11 px-2 rounded-lg font-medium text-small text-[#3B3B3B]'
                        >
                          인증요청
                        </button>
                      </div>
                    </div>
                  </Form.Item>

                  <Form.Item
                    id='otp'
                    name='otp'
                    className='mt-4'
                    rules={[
                      {
                        required: true,
                        message: 'OTP를 입력해주세요.',
                      },
                      {
                        validator: (_, value) => {
                          if (value && value.length > 6) {
                            return Promise.reject(new Error('OTP는 6자리 이하여야 합니다.'))
                          }
                          return Promise.resolve()
                        },
                      },
                    ]}
                  >
                    <div className='flex flex-col gap-1'>
                      <label htmlFor='otp' className='text-[#3B3B3B] font-medium text-normal'>
                        인증번호:
                      </label>
                      <div className='flex items-center lg:gap-3 w-full gap-3'>
                        <Input
                          id='otp'
                          type='number'
                          placeholder='eg: 123456'
                          className='border p-2 rounded-lg h-11 flex-1'
                        />

                        <button
                          onClick={handleVerifyOTP}
                          disabled={!otpEnabled}
                          className={`h-11 px-2 rounded-lg bg-[#D3D2D2] hover:bg-[#c4c4c4] w-24 font-medium text-small text-[#3B3B3B]`}
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  </Form.Item>

                  {/* <div className='flex items-center gap-1 text-[#F14646] font-medium text-min font-nunito'>
                  <img src={IconError} alt='icon' />
                  입력하신 인증번호가 맞지 않습니다. 다시 확인하시고 입력해주시길 바랍니다.
                </div> */}

                  {otpEnabled ? (
                    <div className='flex justify-end items-center mt-4'>
                      <div>
                        Time Remaining:
                        <span className='mx-2 font-semibold text-[#2d1d35] text-sm'>
                          {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                        </span>
                      </div>

                      <button
                        onClick={resendOTP}
                        disabled={seconds > 0 || minutes > 0}
                        className={`${
                          seconds > 0 || minutes > 0
                            ? 'text-[#DFE3E8] bg-white'
                            : 'text-[#FF5630] bg-gray-200 hover:bg-gray-300'
                        } mx-8 border min-h-10 border-gray-400 p-2 rounded-lg`}
                      >
                        Resend OTP
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </Form>
              </div>

              {/* Button */}
              <div className='flex items-center justify-between gap-4 mt-10'>
                <button
                  style={{ border: '2px solid black' }}
                  className='h-11 font-medium text-normal text-[#3B3B3B] rounded-lg w-full'
                  onClick={() => navigate('/login')}
                >
                  로그인 하러가기
                </button>
                <button
                  className={`${
                    checkBtn ? 'cursor-pointer' : 'cursor-not-allowed'
                  } h-11 font-semibold text-normal text-white rounded-lg w-full bg-[#D1B584]`}
                  disabled={!checkBtn}
                  onClick={handleNext}
                >
                  다음
                </button>
              </div>
            </div>
          )}
          {currentStep === 1 && (
            <StepSignUp2
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              loading={loading}
              setLoading={setLoading}
            />
          )}
          {currentStep === 2 && (
            <div className='lg:max-w-[406px] w-full mx-auto mt-12'>
              <div className='flex flex-col justify-center items-center gap-2 mt-10'>
                <h2 className='text-[#3B3B3B] font-bold text-primaryPrdName'> 정보 입력</h2>
                <p className='text-[#3B3B3B] font-medium text-small'>다양한 혜택을 위해 정보를 입력해주세요.</p>
              </div>

              <div className='mt-5'>
                <Form form={form} onFinish={handleStep2Submit} onValuesChange={handleValuesChange}>
                  <Form.Item
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: '이메일을 입력해주세요.',
                      },
                      {
                        type: 'email',
                        message: '유효한 이메일 주소를 입력해주세요',
                      },
                    ]}
                  >
                    <div className='flex flex-col gap-1'>
                      <label htmlFor='email' className='text-[#3B3B3B] font-medium text-normal'>
                        아이디
                      </label>
                      <Input
                        id='email'
                        disabled
                        value={form.getFieldValue('email')}
                        placeholder='email@naver.com'
                        className='border px-2 rounded-lg h-11'
                      />
                    </div>
                  </Form.Item>

                  <Form.Item
                    name='password'
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject(new Error('비밀번호를 입력해주세요'))
                          }

                          if (value.length < 6) {
                            return Promise.reject(new Error('비밀번호는 최소 6자 이상이어야 합니다'))
                          }

                          if (value.length > 24) {
                            return Promise.reject(new Error('비밀번호는 25자 미만이어야 합니다.'))
                          }

                          if (!/[A-Z]/.test(value)) {
                            return Promise.reject(new Error('비밀번호에는 최소 하나의 대문자가 포함되어야 합니다'))
                          }

                          if (!/[a-z]/.test(value)) {
                            return Promise.reject(new Error('비밀번호에는 최소 하나의 소문자가 포함되어야 합니다.'))
                          }

                          if (!/[0-9]/.test(value)) {
                            return Promise.reject(new Error('비밀번호에는 최소 하나의 숫자가 포함되어야 합니다.'))
                          }

                          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                            return Promise.reject(new Error('비밀번호에는 최소 하나의 특수 문자가 포함되어야 합니다.'))
                          }

                          return Promise.resolve()
                        },
                      },
                    ]}
                  >
                    <div className='flex flex-col gap-1'>
                      <label htmlFor='password' className='text-[#3B3B3B] font-medium text-normal'>
                        비밀번호
                      </label>
                      <Input.Password
                        id='password'
                        placeholder='영문과 숫자 조합 8자리 이상'
                        className='border px-2 rounded-lg h-11'
                        iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                      />
                    </div>
                  </Form.Item>

                  <Form.Item
                    name='cfPassword'
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: '비밀번호를 확인해주세요.',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('입력한 두 비밀번호가 일치하지 않습니다'))
                        },
                      }),
                    ]}
                  >
                    <div className='flex flex-col gap-1'>
                      <label htmlFor='cfPassword' className='text-[#3B3B3B] font-medium text-normal'>
                        비밀번호 확인
                      </label>
                      <Input.Password
                        id='cfPassword'
                        placeholder='확인 비밀번호를 입력하세요'
                        className='border px-2 rounded-lg h-11'
                        iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                      />
                    </div>
                  </Form.Item>

                  <Form.Item
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: '이름을 입력해주세요.',
                      },
                      {
                        min: 3,
                        message: '이름은 최소 3자 이상이어야 합니다!',
                      },
                      {
                        max: 24,
                        message: '이름은 25자 미만이어야 합니다.',
                      },
                    ]}
                  >
                    <div className='flex flex-col gap-1'>
                      <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                        이름
                      </label>
                      <Input
                        id='name'
                        value={form.getFieldValue('name')}
                        disabled
                        placeholder='홍길동'
                        className='border px-2 rounded-lg h-11'
                      />
                    </div>
                  </Form.Item>

                  <Form.Item
                    name='gender'
                    rules={[
                      {
                        required: true,
                        message: '성별을 선택해주세요.',
                      },
                    ]}
                  >
                    <div className='flex items-center mb-2 mt-2 gap-10'>
                      <label className='text-[#3B3B3B] font-medium text-normal'>성별</label>
                      <Radio.Group className='flex items-center gap-10'>
                        <Radio value='male'>남</Radio>
                        <Radio value='female'>여</Radio>
                      </Radio.Group>
                    </div>
                  </Form.Item>

                  <Form.Item
                    name='birthday'
                    rules={[
                      {
                        required: true,
                        message: '생년월일을 입력해주세요.',
                      },
                    ]}
                  >
                    <div className='flex flex-col gap-1'>
                      <label className='text-[#3B3B3B] font-medium text-normal'>생년월일</label>
                      <Input
                        id='birthday'
                        type='date'
                        placeholder='Enter your date of birth'
                        className='border px-2 rounded-lg h-11'
                      />
                    </div>
                  </Form.Item>

                  <Form.Item
                    name='countrySelect'
                    rules={[
                      {
                        required: true,
                        message: '국가를 선택하세요.',
                      },
                    ]}
                  >
                    <div className='flex flex-col gap-1'>
                      <label className='text-[#3B3B3B] font-medium text-normal'>국가</label>
                      <Select
                        placeholder='Korea'
                        className='h-11'
                        options={[
                          { value: 'ko', label: 'Korea' },
                          { value: 'cn', label: 'China' },
                          { value: 'ja', label: 'Japan' },
                          { value: 'vi', label: 'Việt Nam' },
                          { value: 'en', label: 'Global' },
                        ]}
                        onChange={(value) => {
                          form.setFieldValue('countrySelect', value),
                            setCountryKr(value),
                            setCountryPhone(mapToCountryCode(value))
                        }}
                      />
                    </div>
                  </Form.Item>

                  {countryKr === 'ko' && (
                    <>
                      <div className='flex items-center justify-between gap-4'>
                        <Form.Item
                          name='clearanceNumber'
                          className='flex-1'
                          rules={[
                            {
                              required: true,
                              message: '통관번호를 입력해주세요.',
                            },
                          ]}
                        >
                          <div className='flex flex-col gap-1'>
                            <label className='text-[#3B3B3B] font-medium text-normal'>통관번호</label>
                            <Input type='text' placeholder='통관번호' className='border px-2 rounded-lg h-11' />
                          </div>
                        </Form.Item>
                        <button
                          className='border px-2 rounded-lg h-11 bg-[#D3D2D2]'
                          onClick={() =>
                            window.open('https://unipass.customs.go.kr/csp/persIndex.do?search_put=', '_blank')
                          }
                        >
                          발급하기
                        </button>
                      </div>
                    </>
                  )}

                  <Form.Item name='referralCode' className='flex-1'>
                    <div className='flex flex-col gap-1'>
                      <label className='text-[#3B3B3B] font-medium text-normal'>추천코드</label>
                      <Input type='text' placeholder='추천코드' className='border px-2 rounded-lg h-11' />
                    </div>
                  </Form.Item>

                  <Form.Item
                    name='phoneNumber'
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const cleanedValue = value.replace(/\s+/g, '')
                          const selectedCountry = phoneNumberData.find((item) => item.country === countryKr)

                          const regex = selectedCountry?.regex ? new RegExp(selectedCountry.regex) : null

                          if (!cleanedValue) {
                            return Promise.reject('전화번호를 입력해주세요.')
                          }
                          if (!regex || regex.test(cleanedValue)) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            `잘못된 전화번호 형식입니다 ${selectedCountry?.countryName || '선택된 국가'}!`,
                          )
                        },
                      }),
                    ]}
                  >
                    <div className='flex flex-col gap-1'>
                      <label htmlFor='phone' className='text-[#3B3B3B] font-medium text-normal'>
                        전화번호
                      </label>
                      <Input
                        id='phone'
                        name='phoneNumber'
                        type='text'
                        placeholder='전화번호를 입력하세요'
                        className='border px-2 rounded-lg h-11'
                      />
                    </div>
                  </Form.Item>

                  {/* <div className='flex justify-between mt-10'>
                  <Button onClick={handlePrev} className='p-5 w-40 '>
                    이전의
                  </Button>
                  <Button type='submit' htmlType='submit' className='border px-2 rounded-lg h-11'>
                    가입 완료
                  </Button>
                </div> */}

                  <div className='flex items-center justify-between gap-4 mt-10 mx-auto'>
                    <button
                      style={{ border: '2px solid black' }}
                      className='h-11 font-medium text-normal text-[#3B3B3B] rounded-lg w-full'
                      onClick={handlePrev}
                    >
                      로그인 하러가기
                    </button>
                    <button
                      className={`h-11 font-semibold text-normal text-white rounded-lg w-full bg-[#D1B584] ${
                        !isFormFilled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#ad8a51]'
                      }`}
                      disabled={!isFormFilled}
                    >
                      다음
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUp
