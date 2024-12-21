import { Checkbox } from 'antd'
import { useEffect, useState } from 'react'
import { Toast } from '@utils/toast'
import { dspCashIn } from '@services/user/dspCashIn'
import { currencyExchange } from '@services/user/currencyExchange'
import { walletservice } from '@services/user/walletservice'
import { formatNumber, formatPrice } from '@utils/index'
import { useNavigate } from 'react-router-dom'
import IconError from '@assets/images/IconError.svg'
import { useTranslation } from 'react-i18next'
export default function TYCDeposit() {
  const { t } = useTranslation()
  // service api
  const service = dspCashIn
  const serviceCurrency = currencyExchange
  const serviceWallet = walletservice
  const navigate = useNavigate()

  // request payload
  const [dspReq, setDspReq] = useState({
    amount: 0,
    description: '',
    transactionType: 'cashIn',
  })

  // checkbox
  const [checked, setChecked] = useState(false)
  const [validation, setValidation] = useState(false)

  // get currency exchange
  const [currency, setCurrencyExchange] = useState([])
  const unit = localStorage.getItem('unit') || 'VND'

  // get wallet info
  const [mywallet, setMyWallet] = useState({})

  useEffect(() => {
    getCurrencyExchange()
    getInfoWallet()
  }, [])

  useEffect(() => {
    if (checked) setValidation(true)
  }, [dspReq])

  function getCurrencyExchange() {
    serviceCurrency.findAll(unit).then((res) => {
      setCurrencyExchange(res.data)
    })
  }

  function getInfoWallet() {
    serviceWallet.getInfoWallet().then((res) => {
      setMyWallet(res.data)
    })
  }

  function copyAccountNumber() {
    const textToCopy = '079801-04-201422'
    navigator.clipboard.writeText(textToCopy).then((res) => {
      Toast.success('복사 완료')
    })
  }

  function cashInToWallet() {
    if (dspReq.amount < 1 || !dspReq.description) {
      setValidation(false)
      return
    }
    service.create(dspReq).then(() => {
      Toast.success('OK')
    })
  }

  return (
    <>
      <div className='max-w-7xl mx-auto mt-24 mb-32'>
        <div className='w-[843px]'>
          <div>
            <div className='mt-2'>
              <span className='font-bold text-primaryPrdName'>{t('messageTYC1')}</span>
            </div>

            <div className='mt-6 p-6 w-full flex items-center justify-center rounded-xl h-[142px] bg-[#F7F7F1]'>
              <div className='w-full items-start'>
                <p className='text-small font-medium'>{t('bank')}</p>
                <div className='w-full flex mt-2 mb-2 cursor-pointer'>
                  <p className='text-[26px] font-bold'>079801-04-201422</p>
                  <div className='btn-copy ml-auto pl-2 pr-2 text-center flex justify-center items-center'>
                    <button
                      className='bg-[#D3D2D2] px-2 h-7 rounded font-medium text-normal'
                      onClick={copyAccountNumber}
                    >
                      {t('copy')}
                    </button>
                  </div>
                </div>
                <p className='text-small font-medium'>{t('addressBank')}</p>
              </div>
            </div>

            <div className='mt-4'>
              <Checkbox value={checked} onChange={() => setChecked(!checked)}></Checkbox>
              <span className='text-warning ml-2' style={{ color: '#F14646', fontSize: '13px' }}>
                {t('messageTYC2')}
              </span>
            </div>

            <div className='mt-6 '>
              <div className='title-name text-[#3B3B3B] mb-1'>{t('depositor')}</div>
              <input
                className='h-11 rounded-lg w-full pl-3'
                style={{ border: '1px solid #EFEFEF' }}
                placeholder='Depositor'
                value={dspReq.description}
                onChange={(e) => setDspReq({ ...dspReq, description: e.target.value })}
              />
            </div>

            <div className='mt-4 flex items-center'>
              <img src={IconError} alt='icon' />
              <span className='rules ml-2 text-[#F14646] text-[13px]'>{t('messageTYC3')}</span>
            </div>

            <div className='flex justify-between items-center bg-[#F8F8F8] mt-8 h-[52px] text-[#3B3B3B] w-full rounded-lg px-4'>
              <p className='text-normal font-bold'>{t('holdingTYC')}</p>
              <div className='btn-copy ml-auto pl-2 pr-2 text-center'>
                <span className='text-[22px] font-bold'>{formatNumber(mywallet.balance)}</span>
              </div>
            </div>
          </div>

          <div className='mt-6 flex justify-between items-start'>
            <div>
              <span className='text-[#3B3B3B] text-normal'>{t('TYCToCharge')}</span>
            </div>
            <div>
              <input
                min={1}
                type='number'
                className='h-11 rounded-lg w-full pl-3'
                style={{ border: '1px solid #EFEFEF' }}
                value={dspReq.amount}
                onChange={(e) => setDspReq({ ...dspReq, amount: e.target.value })}
              />
              <div className='w-full convert-money text-right mt-1 text-[#3B3B3B] text-normal'>
                {dspReq.amount > 0 && currency.length > 0 && (
                  <span>
                    {formatNumber(dspReq.amount * currency[0]?.rate)} {currency[0]?.curUnit}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className='flex gap-8 items-center justify-between'>
            <div className='w-full'>
              <button
                onClick={() => navigate(-1)}
                className='w-full mt-6 h-11 font-medium text-normal text-[#3B3B3B] rounded-lg'
                style={{ border: '2px solid #3B3B3B' }}
              >
                {t('btnAround')}
              </button>
            </div>
            <div className='w-full'>
              <button
                disabled={!checked}
                onClick={cashInToWallet}
                className='w-full mt-6 h-11 font-semibold rounded-lg bg-[#D1B584] text-white'
              >
                {t('chargeText')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
