import React, { useState, useEffect } from 'react'
import IconError from '@assets/images/IconError.svg'
import { useTranslation } from 'react-i18next'
export default function SettingCountry() {
  const { t } = useTranslation()
  // State to track selected language
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('')

  // Function to handle the radio button change
  const handleLanguageChange = (language, currency) => {
    // Update the selected language and currency state
    setSelectedLanguage(language)
    setSelectedCurrency(currency)
  }

  // Function to save settings and reload the page
  const handleSaveSettings = () => {
    // Save the selected language and currency to localStorage
    localStorage.setItem('language', JSON.stringify(selectedLanguage))
    localStorage.setItem('exchangePrice', JSON.stringify(selectedCurrency))

    // Reload the page after saving
    window.location.reload()
  }

  // Load language and currency from localStorage on component mount
  useEffect(() => {
    const savedLanguage = JSON.parse(localStorage.getItem('language'))
    const savedCurrency = JSON.parse(localStorage.getItem('exchangePrice'))

    if (savedLanguage && savedCurrency) {
      setSelectedLanguage(savedLanguage)
      setSelectedCurrency(savedCurrency)
    }
  }, [])

  return (
    <div>
      <div className='w-full'>
        <div>
          <h3 className='text-[#3B3B3B] font-bold text-primaryPrdName'>{t('textSetting')}</h3>
          <div className='text-[#F14646] flex items-center mt-2 gap-1'>
            <img src={IconError} alt='icon' />
            {t('warningSetting')}
          </div>
        </div>

        <div className='flex flex-col gap-4 mt-6'>
          {/* KWR */}
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              id='kr'
              name='language'
              checked={selectedLanguage === 'ko'}
              onChange={() => handleLanguageChange('ko', 'KRW')}
            />
            <label htmlFor='kr' className='font-medium text-normal text-[#3B3B3B]'>
              대한민국-KRW
            </label>
          </div>

          {/* CNY */}
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              id='cn'
              name='language'
              checked={selectedLanguage === 'zh-CN'}
              onChange={() => handleLanguageChange('zh-CN', 'CNH')}
            />
            <label htmlFor='cn' className='font-medium text-normal text-[#3B3B3B]'>
              중국-CNY
            </label>
          </div>

          {/* JPY */}
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              id='jp'
              name='language'
              checked={selectedLanguage === 'ja'}
              onChange={() => handleLanguageChange('ja', 'JPY')}
            />
            <label htmlFor='jp' className='font-medium text-normal text-[#3B3B3B]'>
              일본-JPY
            </label>
          </div>

          {/* VND */}
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              id='vn'
              name='language'
              checked={selectedLanguage === 'vi'}
              onChange={() => handleLanguageChange('vi', 'VND')}
            />
            <label htmlFor='vn' className='font-medium text-normal text-[#3B3B3B]'>
              베트남-VND
            </label>
          </div>

          {/* USD */}
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              id='global'
              name='language'
              checked={selectedLanguage === 'en'}
              onChange={() => handleLanguageChange('en', 'USD')}
            />
            <label htmlFor='global' className='font-medium text-normal text-[#3B3B3B]'>
              글로벌-USD
            </label>
          </div>

          <div className='flex items-center gap-8 mt-6'>
            <div>
              <button
                style={{ border: '2px solid black' }}
                className='w-[136px] h-11 font-medium text-normal rounded-lg'
              >
                {t('btnCancel')}
              </button>
            </div>

            <div>
              <button
                className='w-[160px] h-11 bg-[#D1B584] text-white font-semibold text-normal rounded-lg'
                onClick={handleSaveSettings}
              >
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
