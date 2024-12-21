import { Modal } from 'antd'
import React, { useState } from 'react'
import ContentPrivacyPolicy from '@components/documentContent/ContentPrivacyPolicy'
import ContentTermsOfUse from '@components/documentContent/ContentTermsOfUse'
import { useTranslation } from 'react-i18next'

export default function StepSignUp2({ setCurrentStep, currentStep, setLoading }) {
  const { t } = useTranslation()
  const [isModalVisible1, setIsModalVisible1] = useState(false)
  const [isModalVisible2, setIsModalVisible2] = useState(false)
  const [isAgreed, setIsAgreed] = useState([false, false])
  // modal1
  const showModal1 = () => {
    setIsModalVisible1(true)
  }

  const handleModalOk1 = () => {
    setIsModalVisible1(false)
  }

  const handleModalCancel1 = () => {
    setIsModalVisible1(false)
  }

  // modal2
  const showModal2 = () => {
    setIsModalVisible2(true)
  }

  const handleModalOk2 = () => {
    setIsModalVisible2(false)
  }

  const handleModalCancel2 = () => {
    setIsModalVisible2(false)
  }

  // Check Agreed
  const validateAgreements = () => {
    return isAgreed[0] && isAgreed[1]
  }

  const handleCheckboxChange = (index, checked) => {
    const newIsAgreed = [...isAgreed]
    newIsAgreed[index] = checked
    setIsAgreed(newIsAgreed)
  }

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

  return (
    <div>
      <div>
        <div className='mt-12'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <h2 className='text-[#3B3B3B] font-bold text-primaryPrdName'>약관 동의</h2>
            <p className='text-[#3B3B3B] font-medium text-small'>서비스 이용을 위해 아래 약관에 동의를 해주세요.</p>
          </div>

          <div className='mt-6 lg:ml-[35%] md:ml-[30%] ml-[20%]'>
            <div className='w-full mb-4  flex items-center gap-1'>
              <input
                type='checkbox'
                id='agree1'
                checked={isAgreed[0]}
                onChange={(e) => handleCheckboxChange(0, e.target.checked)}
                className='mr-2'
              />
              <label htmlFor='agree1' className='text-gray-800 text-lg'>
                [필수] 이용약관
                {/* <span
                      className='text-blue-500 cursor-pointer ml-1'
                      onClick={() => showModal('Terms and Conditions 1')}
                    >
                      전문보기
                    </span> */}
              </label>
              <div onClick={() => showModal1()} className='text-[#D1B584] font-bold'>
                전문보기
              </div>
            </div>

            <div className='w-full mb-4  flex items-center gap-1'>
              <input
                type='checkbox'
                id='agree2'
                checked={isAgreed[1]}
                onChange={(e) => handleCheckboxChange(1, e.target.checked)}
                className='mr-2'
              />
              <label htmlFor='agree2' className='text-gray-800 text-lg'>
                [필수] 개인정보취급방침
              </label>

              <div onClick={() => showModal2()} className='text-[#D1B584] font-bold'>
                전문보기
              </div>
            </div>

            {/* <div className='w-full mb-4 mx-[30%]'>
                  <input
                    type='checkbox'
                    id='agree3'
                    checked={isAgreed[2]}
                    onChange={(e) => handleCheckboxChange(2, e.target.checked)}
                    className='mr-2'
                  />
                  <label htmlFor='agree3' className='text-gray-800 text-lg'>
                    [선택] 마케팅 활용 동의
                    <span
                      className='text-blue-500 cursor-pointer ml-1'
                      onClick={() => showModal('Terms and Conditions 3')}
                    >
                      전문보기
                    </span>
                  </label>
                </div> */}
          </div>
        </div>

        <div className='flex items-center justify-between gap-4 mt-10 w-[366px] mx-auto'>
          <button
            style={{ border: '2px solid black' }}
            className='h-11 font-medium text-normal text-[#3B3B3B] rounded-lg w-full'
            onClick={handlePrev}
          >
            로그인 하러가기
          </button>
          <button
            className={`${
              validateAgreements() ? 'cursor-pointer' : 'cursor-not-allowed'
            } h-11 font-semibold text-normal text-white rounded-lg w-full bg-[#D1B584]`}
            onClick={handleNext}
            disabled={!validateAgreements()}
          >
            다음
          </button>
        </div>
      </div>
      {/* Modal 1 */}
      <Modal
        // title='Terms and Conditions'
        visible={isModalVisible1}
        onOk={handleModalOk1}
        onCancel={handleModalCancel1}
        width={1000}
        title={<></>}
        footer={
          <div className='flex items-center justify-end gap-4'>
            <div>
              <button
                className='bg-[#D1B584] text-white font-semibold min-w-32 h-11 rounded-lg'
                onClick={handleModalOk1}
              >
                {t('btnClose')}
              </button>
            </div>
          </div>
        }
      >
        <div className='h-[600px] overflow-y-auto'>
          <ContentTermsOfUse />
        </div>
      </Modal>

      {/* Modal 2 */}
      <Modal
        // title='Terms and Conditions'
        visible={isModalVisible2}
        onOk={handleModalOk2}
        onCancel={handleModalCancel2}
        width={1000}
        title={<></>}
        footer={
          <div className='flex items-center justify-end gap-4'>
            <div>
              <button
                className='bg-[#D1B584] text-white font-semibold min-w-32 h-11 rounded-lg'
                onClick={handleModalOk2}
              >
                {t('btnClose')}
              </button>
            </div>
          </div>
        }
      >
        <div className='h-[600px] overflow-y-auto'>
          <ContentPrivacyPolicy />
        </div>
      </Modal>
    </div>
  )
}
