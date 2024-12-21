import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import IconEye from '@assets/images/IconEye.svg'
import IconEyeOff from '@assets/images/IconEyeOff.svg'
import IconChevronRight from '@assets/images/IconChevronRight.svg'
import IconError from '@assets/images/IconError.svg'
import { user } from '@services/user/user'
import { Toast } from '@utils/toast'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Loading from '@components/loadingCommon/Loading'

const style = {
  formGroup: 'flex flex-col gap-2',
  label: 'text-normal font-medium',
  input: 'h-11 px-4 rounded-lg border',
  inputError: 'border-[#F14646]',
  inputGroup: 'relative flex flex-col gap-2 mt-2 justify-center',
  eyeIcon: 'absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 cursor-pointer',
  button: 'w-[155px] h-11 bg-[#D3D2D2] rounded-lg',
  dropdown: 'h-11 px-4 rounded-lg border border-[#EFEFEF] appearance-none pr-10',
  errorMessage: 'flex items-center gap-2 text-[#F14646] text-small mt-1',
}

// Yup validation schema
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, '비밀번호는 8자리 이상 영문-숫자 조합입니다. 조건에 맞게 입력해주시길 바랍니다.')
    .required('기존 비밀번호를 입력해주세요'),
  newPassword: Yup.string()
    .min(8, '비밀번호는 8자리 이상 영문-숫자 조합입니다. 조건에 맞게 입력해주시길 바랍니다.')
    .required('새로운 비밀번호를 입력해주세요'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], '확인 비밀번호가 일치하지 않습니다')
    .required('비밀번호 확인을 입력해주세요'),
})

export default function ChangeInformation() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const navigate = useNavigate()

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }))
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true)
      const payload = {
        password: values.oldPassword,
        newPassword: values.newPassword,
      }

      const response = await user.changePassswordUser(payload)
      console.log('response', response)

      Toast.success('Information updated successfully!')
      navigate('/')
    } catch (error) {
      Toast.error('Password is invalid')
    } finally {
      setLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, errors, touched }) => (
          <Form>
            <div className='font-bold text-normal'>{t('changePasswordPerson')}</div>

            {/* Old Password */}
            <div className='mt-4'>
              <label htmlFor='oldPassword' className={style.label}>
                {t('existingPassword')}
              </label>
              <div className={style.inputGroup}>
                <Field
                  id='oldPassword'
                  name='oldPassword'
                  type={showPassword.oldPassword ? 'text' : 'password'}
                  placeholder='123456@A'
                  className={`${style.input} ${
                    errors.oldPassword && touched.oldPassword ? style.inputError : 'border-[#EFEFEF]'
                  }`}
                />
                <div onClick={() => togglePasswordVisibility('oldPassword')} className={style.eyeIcon}>
                  {showPassword.oldPassword ? <img src={IconEye} alt='icon' /> : <img src={IconEyeOff} alt='icon' />}
                </div>
              </div>
              <ErrorMessage name='oldPassword' component='div' className={style.errorMessage}>
                {(msg) => (
                  <div className={style.errorMessage}>
                    <img src={IconError} alt='icon' className='w-4 h-4' /> {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            {/* New Password */}
            <div className='mt-4'>
              <label htmlFor='newPassword' className={style.label}>
                {t('newPassword')}
              </label>
              <div className={style.inputGroup}>
                <Field
                  id='newPassword'
                  name='newPassword'
                  type={showPassword.newPassword ? 'text' : 'password'}
                  placeholder='123456@A'
                  className={`${style.input} ${
                    errors.newPassword && touched.newPassword ? style.inputError : 'border-[#EFEFEF]'
                  }`}
                />
                <div onClick={() => togglePasswordVisibility('newPassword')} className={style.eyeIcon}>
                  {showPassword.newPassword ? <img src={IconEye} alt='icon' /> : <img src={IconEyeOff} alt='icon' />}
                </div>
              </div>
              <ErrorMessage name='newPassword' component='div' className={style.errorMessage}>
                {(msg) => (
                  <div className={style.errorMessage}>
                    <img src={IconError} alt='icon' className='w-4 h-4' /> {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            {/* Confirm Password */}
            <div className='mt-4'>
              <label htmlFor='confirmPassword' className={style.label}>
                {t('verifyPassword')}
              </label>
              <div className={style.inputGroup}>
                <Field
                  id='confirmPassword'
                  name='confirmPassword'
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  placeholder='123456@A'
                  className={`${style.input} ${
                    errors.confirmPassword && touched.confirmPassword ? style.inputError : 'border-[#EFEFEF]'
                  }`}
                />
                <div onClick={() => togglePasswordVisibility('confirmPassword')} className={style.eyeIcon}>
                  {showPassword.confirmPassword ? (
                    <img src={IconEye} alt='icon' />
                  ) : (
                    <img src={IconEyeOff} alt='icon' />
                  )}
                </div>
              </div>
              <ErrorMessage name='confirmPassword' component='div' className={style.errorMessage}>
                {(msg) => (
                  <div className={style.errorMessage}>
                    <img src={IconError} alt='icon' className='w-4 h-4' /> {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            {/* Button submit */}
            <div className='flex justify-between items-center mt-4 gap-4'>
              <button type='button' className='w-[187px] h-11 rounded-lg' style={{ border: '1px solid #AFAEAE' }}>
                {t('btnCancel')}
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-[#D1B584] w-[405px] h-11 text-white flex justify-center items-center rounded-lg'
              >
                {t('check')} <img src={IconChevronRight} alt='icon' />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
