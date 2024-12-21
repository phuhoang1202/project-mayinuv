import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '@components/loadingCommon/Loading.jsx'
import { loginApi, socialLoginApi } from '@services/user/auth.js'
import { Toast } from '@utils/toast'
import { setToken, removeToken, setTokenUser } from '@utils/auth.js'
import ImageLogin from '@assets/images/ImageLogin.svg'
import ImageLogin2 from '@assets/images/ImageLogin2.jpg'

import Group from '@assets/images/Logo/Group.svg'
import IconEye from '@assets/images/IconEye.svg'
import IconEyeOff from '@assets/images/IconEyeOff.svg'
import IconClose from '@assets/images/IconClose.svg'

function Login() {
  const [user, setUser] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginUser, setLoginUser] = useState({
    id: '',
    password: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      Kakao.init('7a153b8ed4ff130b054872a746a0381d')
    }
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginUser((prevLoginUser) => ({
      ...prevLoginUser,
      [name]: value,
    }))
  }

  const handleSubmitLogin = async (username, password) => {
    try {
      removeToken('token')
      setLoading(true)
      const response = await loginApi(username, password)
      const accessToken = response.data.access_token

      setToken(accessToken)

      const checkRole = jwtDecode(accessToken)
      if (checkRole.authorities.includes('role_admin')) {
        Toast.success('Login successful!')
        setTimeout(() => {
          navigate('/admin')
        }, 1000)
      } else if (checkRole.authorities.includes('role_user')) {
        Toast.success('Login successful!')
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }
    } catch (error) {
      Toast.error(error.response.data.error_description || 'Login failed!')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleSubmitLogin(loginUser.id, loginUser.password)
  }

  return (
    <div>
      {loading && <Loading />}
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='lg:block hidden relative'>
          <img src={ImageLogin2} alt='image' className='h-[784px]' />
          <div className='absolute font-medium text-normal bottom-10 z-50 text-white flex flex-col justify-center items-center w-full'>
            <p>본 사이트는 베트남-VND, 중국-CNY, 대한민국-KRW,</p>
            <p>일본-JPY, 글로벌-USD를 지원합니다.</p>
          </div>
        </div>
        <div className='w-[438px] h-[784px] flex flex-col items-center justify-center bg-[#F8F8F8] p-8 rounded-r-lg relative'>
          <img src={Group} alt='logo' onClick={() => navigate('/')} className='cursor-pointer' />

          <div className='absolute right-4 top-4 cursor-pointer' onClick={() => navigate('/')}>
            <img src={IconClose} alt='icon' />
          </div>

          <h1 className='text-[#3B3B3B] font-bold text-primaryPrdName py-6'>회원</h1>

          <form className='w-full'>
            <div className='flex flex-col gap-3 w-full'>
              <label htmlFor='ID' className='w-full text-[#3B3B3B] text-normal font-medium'>
                아이디
              </label>
              <input
                id='id'
                name='id'
                type='text'
                value={loginUser.id || ''}
                onChange={handleChange}
                placeholder='이메일 아이디'
                className='w-full p-2 rounded-lg h-11 px-4'
                style={{ border: '1px solid #EFEFEF' }}
              />
            </div>
            <div className='flex flex-col gap-3 w-full pt-7'>
              <label htmlFor='password' className='w-full text-[#3B3B3B] text-normal font-medium'>
                비밀번호
              </label>
              <div className='relative w-full'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={loginUser.password || ''}
                  onChange={handleChange}
                  placeholder='**********'
                  className='w-full p-2 rounded-lg h-11 px-4'
                  style={{ border: '1px solid #EFEFEF' }}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
                >
                  {showPassword ? <img src={IconEye} alt='icon' /> : <img src={IconEyeOff} alt='icon' />}
                </span>
              </div>
            </div>

            <button onClick={handleSubmit} className='bg-[#D1B584] w-full h-11 mt-8 text-base text-white rounded-lg'>
              로그인
            </button>
          </form>

          <div className='mt-6 text-center text-base'>
            계정이 없나요?
            <Link to={'/signup'} className=' font-semibold px-1 text-blue-500 hover:text-blue-700 text-lg'>
              가입하기
            </Link>
          </div>

          <div className='flex items-center w-full mt-10'>
            <hr className='w-full border-[#D3D2D2]' />
            <span className='w-full text-[#D3D2D2] flex justify-center items-center'>또는</span>
            <hr className='w-full border-[#D3D2D2]' />
          </div>

          <div className='flex justify-between w-full font-medium text-small mt-20 mb-8'>
            <Link className='underline decoration-solid' to={'/forgot-password'}>
              아이디 찾기
            </Link>
            <Link className='underline decoration-solid' to={'/forgot-password'}>
              비밀번호 찾기
            </Link>
            <Link className='underline decoration-solid' to={'/signup'}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
