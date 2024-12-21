import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LogoDark from '@assets/images/LogoDark.svg'
import moment from 'moment'
import { currencyExchange } from '@services/user/currencyExchange'
import { useTranslation } from 'react-i18next'
import { formatPrice } from '@utils/index'
import { Toast } from '@utils/toast'

export default function Footer() {
  const { t } = useTranslation()
  const [time, setTime] = useState(new Date())
  const [unit, setUnit] = useState('KRW')
  const [exchangePrice, setExchangePrice] = useState(0)

  const getExchange = async () => {
    try {
      const response = await currencyExchange.findAll(unit)
      setExchangePrice(response.data[0].rate)
    } catch (error) {
      Toast.error('통화 변환 데이터 가져오기 실패')
    }
  }

  useEffect(() => {
    const getUnitLocal = JSON.parse(localStorage.getItem('exchangePrice')) || 'KRW'
    setUnit(getUnitLocal)
    if (unit != 'KWR') {
      getExchange()
    }
  }, [unit])

  useEffect(() => {
    setTimeout(() => {
      setTime(new Date())
    }, 60000)
  }, [time])

  // function findCurrency(event) {
  //   const obj = event ? event : selectedFlag
  //   currencyService.findAll(obj.keyword).then((res) => {
  //     const result = res.data
  //     if (result && result.length > 0) {
  //       obj.rate = result[0].rate
  //       setSelectedFlag({ ...obj })
  //     }
  //   })
  // }

  return (
    <>
      {/* <div className='max-w-7xl mx-auto'>
        <div>
          <div className={`w-full time text-normal mt-2`}>
            <span>{moment(time).format('YYYY.MM.DD HH:mm')} 환율</span>
          </div>
        </div>
        <div>
          <div className='grid grid-cols-12 gap-4 text-[26px] mt-4' style={{ fontWeight: 700 }}>
            <div className='col-span-3 w-full'>
              <span>1원</span>
            </div>
            <div className='col-span-1 w-full text-[16px] flex items-center'>
              <ArrowRightOutlined />
            </div>
            <div className='col-span-8 w-full'>
              <span>
                {selectedFlag.rate.toFixed(5)} {selectedFlag.unit}
              </span>
            </div>
          </div>
        </div>
      </div> */}
      {unit !== 'KRW' && (
        <div className='max-w-7xl mx-auto mt-14 font-semibold text-normal flex gap-10 items-center lg:px-0 px-4'>
          <div>
            {moment(time).format('YYYY.MM.DD HH:mm')} {t('exchangeRate')}
          </div>
          <div>
            {formatPrice(1)} = {exchangePrice}
          </div>
        </div>
      )}

      <div className='mt-10 lg:mb-8 mb-4'>
        <div className='border py-3'>
          <div className='flex justify-between items-center max-w-7xl mx-auto lg:px-0 px-4 overflow-x-auto lg:pb-0 lg:py-0 py-2'>
            <ul className='flex items-center gap-4 text-normal'>
              {/* <Link to={'about-us'}>
                <li className='text-[#282828] font-medium whitespace-nowrap'>{t('featureFooter1')}</li>
              </Link> */}
              <Link to={'/menu/terms-of-use'}>
                <li className='text-[#8C8C8C] font-medium whitespace-nowrap'>{t('featureFooter2')}</li>
              </Link>
              <Link to={'/menu/privacy-policy'}>
                <li className='text-[#8C8C8C] font-medium whitespace-nowrap'>{t('featureFooter3')}</li>
              </Link>
              <Link to={'about-us'}>
                <li className='text-[#8C8C8C] font-medium whitespace-nowrap'>{t('featureFooter4')}</li>
              </Link>
            </ul>
          </div>
        </div>

        <div className='max-w-7xl w-full mx-auto mt-10 flex flex-col md:flex-row justify-between lg:px-0 px-5'>
          <div className='flex  items-start gap-6 w-full'>
            <img src={LogoDark} alt='photo' />
            <div>
              <div className='font-bold lg:text-bigPrdName text-largerPrdName text-textBlack'>
                TYC GLOBAL SG PTE. LTD.
              </div>
              <div className='flex flex-col text-[#707070]'>
                {/* <div>Jang Jaaeho</div> */}
                <div className='text-normal'>380 JALAN BESAR #06-02 ARC 380 SINGAPORE (209000)</div>
                {/* <div className='flex flex-row items-start gap-2'>
                  <div className='text-[#3B3B3B]'>jordan_s@naver.com</div>
                  <div className='text-[#D3D2D2] hidden md:inline-block'>|</div>
                  <a className='text-[#3B3B3B]' href='tel:+821066363454'>
                    +82)1066363454
                  </a>
                </div> */}
                <div>
                  Contact us: <span className='text-[#3B3B3B]'>cs.tyc.market@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className='text-small font-medium text-[#3B3B3B] flex flex-col gap-2 justify-end mt-8 md:mt-0'>
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4'>
              <div className='text-[#3B3B3B]'>{t('footerText3')}: 0000</div>
              <div className='text-[#D3D2D2] hidden md:inline-block'>|</div>
              <div className='text-[#3B3B3B]'>{t('footerText4')}</div>
              <div className='text-[#D3D2D2] hidden md:inline-block'>|</div>
              <div className='text-[#3B3B3B]'>{t('footerText5')}: OOO</div>
            </div>

            <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4'>
              <div className='text-[#3B3B3B]'>{t('footerText6')}</div>
              <div className='text-[#D3D2D2] hidden md:inline-block'>|</div>
              <div className='font-medium text-[#3B3B3B]'>{t('footerText7')}: jordan_s@naver.com</div>
            </div>

            <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4'>
              <div className='text-[#3B3B3B]'>{t('footerText8')}: +82 10 6636 3454</div>
              <div className='text-[#D3D2D2] hidden md:inline-block'>|</div>
            </div>

            <div className='text-[#3B3B3B]'>{t('footerText9')} All Rights Reserved</div>
          </div> */}

          {/* <div className='flex items-center justify-end gap-4 mt-8 md:mt-0 w-full md:w-[290px]'>
            <div className='flex items-center gap-4'>
              <img src={IconFacebook} alt='icon' />
              <img src={IconLinkedin} alt='icon' />
              <img src={IconNaver} alt='icon' />
              <img src={IconTiktok} alt='icon' />
            </div>

            <div>
              <Dropdown overlay={menu} trigger={['click']}>
                <Button
                  className='flex items-center justify-between'
                  style={{
                    border: '1px solid #D3D2D2',
                    borderRadius: '12px',
                    height: '40px',
                    lineHeight: '40px',
                  }}
                >
                  {t('footerText10')}
                  <img src={IconChevronDown} alt='icon arrow' />
                </Button>
              </Dropdown>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
