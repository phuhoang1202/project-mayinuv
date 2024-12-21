import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Toast } from '@utils/toast'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPass, verifyOTP, updatePass } from '@services/user/auth'
import Loading from '@components/loadingCommon/Loading'
import ImageLogin from '@assets/images/ImageLogin.svg'
import Group from '@assets/images/Logo/Group.svg'
import IconClose from '@assets/images/IconClose.svg'

const ForgotPass = () => {
  const [minutes, setMinutes] = useState(4)
  const [seconds, setSeconds] = useState(59)
  const [checkBtn, setCheckBtn] = useState(false)
  const [otpEnabled, setOtpEnabled] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()
  const [valueOTP, setValueOTP] = useState('')

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

  // Send Email get OTP
  const handleSendEmail = async () => {
    try {
      const email = form.getFieldValue('email')
      if (!email) {
        Toast.error('Please enter your name and email!')
        return
      }
      setLoading(true)
      const response = await forgotPass({ email })
      if (response.data.success) {
        setOtpEnabled(true)
        setUserId(response.data.userId)
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

  // Verify OTP
  const handleVerifyOTP = async () => {
    try {
      const email = form.getFieldValue('email')
      const otp = form.getFieldValue('otp')
      const bodyVerify = { email: email, otp: otp }
      const responseOTP = await verifyOTP(bodyVerify)

      if (responseOTP) {
        Toast.success('OTP verification successful!')
        setCheckBtn(!checkBtn)
        setOtpEnabled(!otpEnabled)
        setShowPassword(true)
      } else {
        Toast.error('OTP verification failed. Please try again.')
      }
    } catch (error) {
      Toast.error('An error occurred while verifying OTP.')
    }
  }

  const resendOTP = () => {
    setMinutes(4)
    setSeconds(59)
    handleVerifyOTP()
  }

  const handleUpdatePass = async () => {
    try {
      const password = form.getFieldValue('password')
      const payloadBody = { otp: valueOTP, password: password, userId: userId }

      console.log('payloadBody', payloadBody)

      const response = await updatePass(payloadBody)
      setLoading(true)
      // if (response.status === 200) {
      Toast.success('Updated password successfully !')
      // setTimeout(() => {
      navigate('/login')
      // }, 1000)
      // } else {
      //   Toast.error('Password update failed !')
      // }
    } catch (error) {
      Toast.error('An error occurred while updating the password.')
    } finally {
      setLoading(false)
    }
  }

  const onChange = (text) => {
    setValueOTP(text)
  }
  const sharedProps = {
    onChange,
  }

  return (
    <div>
      {loading && <Loading />}
      <div className='w-full h-screen flex items-center justify-center '>
        <div className='lg:block hidden'>
          <img src={ImageLogin} alt='image' />
        </div>

        <div className='w-[438px] h-[784px] flex flex-col items-center pt-8 bg-[#F8F8F8] p-8 rounded-r-lg relative'>
          <img src={Group} alt='logo' onClick={() => navigate('/')} className='cursor-pointer' />

          <div className='absolute right-4 top-4 cursor-pointer' onClick={() => navigate('/login')}>
            <img src={IconClose} alt='icon' />
          </div>

          <div className='py-6 flex flex-col justify-center items-center gap-2'>
            <h1 className='text-[#3B3B3B] font-bold text-primaryPrdName'>비밀번호 찾기</h1>
            <p className='font-medium text-small text-[#3B3B3B]'>가입시 이름과 전화번호로 아이디를 찾을 수 있어요.</p>
          </div>

          {/* content */}
          <Form form={form}>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Please enter your name!',
                },
                {
                  min: 3,
                  message: 'Name must be at least 3 characters!',
                },
                {
                  max: 24,
                  message: 'Name must be less than 25 characters!',
                },
              ]}
            >
              <div className='flex flex-col gap-2'>
                <label htmlFor='name' className='text-[#3B3B3B] font-medium text-normal'>
                  이름
                </label>
                <Input id='name' placeholder='당신의 이름을 입력' className='border p-2 rounded-lg h-11' />
              </div>
            </Form.Item>

            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please enter your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address!',
                },
              ]}
            >
              <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-[#3B3B3B] font-medium text-normal'>
                  이메일
                </label>
                <div className='flex items-center justify-between gap-3'>
                  <Input id='email' placeholder='이메일을 입력하세요' className='border p-2 rounded-lg h-11' />
                  <button
                    onClick={handleSendEmail}
                    className='bg-[#D3D2D2] w-28 px-2 rounded-lg h-11 font-medium text-small flex justify-center items-center'
                  >
                    인증요청
                  </button>
                </div>
              </div>
            </Form.Item>

            <Form.Item
              id='otp'
              name='otp'
              // rules={[
              //   { required: true, message: 'Please enter the OTP!' },
              //   { len: 6, message: 'OTP must be 6 characters!' },
              // ]}
            >
              <div className='flex flex-col gap-2'>
                <label htmlFor='otp' className='text-[#3B3B3B] font-medium text-normal'>
                  인증번호
                </label>
                <div className='flex justify-between items-center gap-3 '>
                  <Input.OTP id='otp' formatter={(str) => str.toUpperCase()} {...sharedProps} disabled={!otpEnabled} />
                  <button
                    onClick={handleVerifyOTP}
                    disabled={!otpEnabled}
                    className={`${
                      otpEnabled ? 'cursor-pointer' : 'cursor-not-allowed'
                    }  bg-[#D3D2D2] w-24 px-2 rounded-lg h-11 font-medium text-small flex justify-center items-center `}
                  >
                    확인
                  </button>
                </div>
              </div>
            </Form.Item>
            {otpEnabled ? (
              <div className='flex justify-end items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <div className='font-semibold text-small'>남은 시간:</div>
                  <span className='font-semibold text-[#2d1d35] text-normal'>
                    {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                  </span>
                </div>

                <button
                  onClick={resendOTP}
                  disabled={seconds > 0 || minutes > 0}
                  className={`${
                    seconds > 0 || minutes > 0 ? 'cursor-pointer' : 'cursor-not-allowed'
                  }   h-11 bg-[#D3D2D2] p-2 rounded-lg`}
                >
                  Resend OTP
                </button>
              </div>
            ) : (
              ''
            )}
          </Form>

          {showPassword ? (
            <Form form={form} onFinish={handleUpdatePass} className='w-full flex flex-col gap-2'>
              <Form.Item
                name='password'
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject(new Error('비밀번호를 입력하세요!'))
                      }

                      if (value.length < 6) {
                        return Promise.reject(new Error('비밀번호는 최소 6자 이상이어야 합니다!'))
                      }

                      if (value.length > 24) {
                        return Promise.reject(new Error('비밀번호는 25자 미만이어야 합니다!'))
                      }

                      if (!/[A-Z]/.test(value)) {
                        return Promise.reject(new Error('비밀번호에는 적어도 하나의 대문자가 포함되어야 합니다!'))
                      }

                      if (!/[a-z]/.test(value)) {
                        return Promise.reject(new Error('비밀번호에는 적어도 하나의 소문자가 포함되어야 합니다!'))
                      }

                      if (!/[0-9]/.test(value)) {
                        return Promise.reject(new Error('비밀번호에는 적어도 하나의 숫자가 포함되어야 합니다!'))
                      }

                      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                        return Promise.reject(new Error('비밀번호에는 적어도 하나의 특수 문자가 포함되어야 합니다!'))
                      }

                      return Promise.resolve()
                    },
                  },
                ]}
              >
                <div className='flex flex-col gap-2'>
                  <label htmlFor='password' className='text-[#3B3B3B] font-medium text-normal'>
                    새로운 비밀번호
                  </label>
                  <Input.Password
                    id='password'
                    placeholder='새로운 비밀번호'
                    className='p-2 rounded-lg h-11'
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
                    message: '비밀번호를 확인해주세요!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('입력한 두 비밀번호가 일치하지 않습니다!'))
                    },
                  }),
                ]}
              >
                <div className='flex flex-col gap-2'>
                  <label htmlFor='cfPassword' className='text-[#3B3B3B] font-medium text-normal'>
                    비밀번호 확인
                  </label>
                  <Input.Password
                    id='cfPassword'
                    placeholder='확인 비밀번호를 입력하세요'
                    className=' p-2 rounded-lg h-11'
                    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  />
                </div>
              </Form.Item>

              <div className='flex justify-center items-center'>
                <Button
                  type='submit'
                  htmlType='submit'
                  className=' bg-[#D1B584] text-white rounded-lg font-semibold text-normal h-11 w-full'
                >
                  로그인 하러가기
                </Button>
              </div>
            </Form>
          ) : (
            ''
          )}

          {/* footer form */}
          {/* <div className='mt-6 text-center text-base'>
            이미 계정이 있나요?
            <Link to={'/login'} className=' font-semibold px-1 text-blue-500 hover:text-blue-700 text-lg'>
              Login
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default ForgotPass
