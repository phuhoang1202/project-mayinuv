import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Input, Row } from 'antd'
import { useEffect, useState } from 'react'
import { Toast } from '@utils/toast'
import { dspCashIn } from '@services/user/dspCashIn'
import { currencyExchange } from '@services/user/currencyExchange'
import { walletservice } from '@services/user/walletservice'
import { formatNumber, formatPrice } from '@utils/index'
import { useNavigate } from 'react-router-dom'
import IconError from '@assets/images/IconError.svg'
import { useTranslation } from 'react-i18next'
export default function DSPCashIn() {
  // service api
  const service = dspCashIn
  const serviceCurrency = currencyExchange
  const serviceWallet = walletservice
  const navigate = useNavigate()

  const { t } = useTranslation()

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
      <div className='max-w-7xl mx-auto mb-32'>
        <div className='w-[843px]'>
          <div>
            <div className='mt-2'>
              <span className='font-bold text-primaryPrdName'>아래 계좌로 먼저 입금 후 충전하기 버튼을 눌러주세요</span>
            </div>

            <div className='mt-6 p-6 w-full flex items-center justify-center rounded-xl h-[142px] bg-[#F7F7F1]'>
              <div className='w-full items-start'>
                <p className='text-small font-medium'>{t('bank')}</p>
                <div className='w-full flex mt-2 mb-2 cursor-pointer'>
                  <p className='text-[26px] font-bold'>079801-04-201422</p>
                  <div
                    className='btn-copy ml-auto pl-2 pr-2 text-center bg-[#3B3B3B] w-14 text-white rounded flex justify-center items-center'
                    onClick={copyAccountNumber}
                  >
                    <span>복사</span>
                  </div>
                </div>
                <p className='text-small font-medium'>{t('addressBank')}</p>
              </div>
            </div>

            <div className='mt-4'>
              <Checkbox value={checked} onChange={() => setChecked(!checked)}></Checkbox>
              <span className='text-warning ml-2' style={{ color: '#F14646', fontSize: '13px' }}>
                충전하기 금액 입금 후 관리자 확인 후 승인되면 충전됩니다
              </span>
            </div>

            <div className='mt-6 '>
              <div className='title-name text-[#3B3B3B] mb-1'>입금자</div>
              <input
                className='h-11 rounded-lg w-full pl-3'
                style={{ border: '1px solid #EFEFEF' }}
                placeholder='김홍천'
                value={dspReq.description}
                onChange={(e) => setDspReq({ ...dspReq, description: e.target.value })}
              />
            </div>

            <div className='mt-4 flex items-center'>
              <img src={IconError} alt='icon' />
              <span className='rules ml-2 text-[#F14646] text-[13px]'>
                입금처리는 입력하시는 입금자와 입금액이 같아야 가능합니다
              </span>
            </div>

            <div className='flex justify-between items-center bg-[#F8F8F8] mt-8 h-[52px] text-[#3B3B3B] w-full rounded-lg px-4'>
              <p className='text-normal font-bold'>보유 TYC</p>
              <div className='btn-copy ml-auto pl-2 pr-2 text-center'>
                <span className='text-[22px] font-bold'>{formatNumber(mywallet.balance)}</span>
              </div>
            </div>
          </div>

          <div className='mt-6 flex justify-between items-start'>
            <div>
              <span className='text-[#3B3B3B] text-normal'>충전할 TYC</span>
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
                className='w-full mt-6 h-11 font-semibold text-normal text-[#3B3B3B] rounded-lg'
                style={{ border: '2px solid #3B3B3B' }}
              >
                돌아와
              </button>
            </div>
            <div className='w-full'>
              <button
                disabled={!checked}
                onClick={cashInToWallet}
                className='w-full mt-6 h-11 font-semibold rounded-lg bg-[#D1B584] text-white'
              >
                충전하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
