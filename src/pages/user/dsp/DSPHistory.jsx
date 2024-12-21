import { RightOutlined, WalletOutlined } from '@ant-design/icons'
import { currencyExchange } from '@services/user/currencyExchange'
import { transactionservice } from '@services/user/transactionService'
import { walletservice } from '@services/user/walletservice'
import { formatNumber, formatPrice, formatPriceMultilingual } from '@utils/index'
import { Col, Pagination, Row, Tag } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function DSPHistory() {
  const navigate = useNavigate()
  const currencyExchangeService = currencyExchange
  const [transactions, setTransactions] = useState([])
  const [payload, setPayload] = useState({
    pageNumber: 0,
    pageSize: 10,
    sort: 'desc',
    status: null,
    fromDate: null,
    toDate: null,
  })

  const [pagination, setPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
  })

  // list filter by date
  const [optionDates] = useState([
    { Label: '전체', checked: false },
    { Label: '1개월 이내', checked: false },
    { Label: '3개월 이내', checked: false },
    { Label: '6개월 이내', checked: false },
  ])

  // get info wallet
  const [myWallet, setMyWallet] = useState({})

  // get currency exchange
  const unit = localStorage.getItem('unit') || 'VND'
  const [currency, setCurrencyExchange] = useState([])

  const colorTags = [
    { label: '충전', color: '#2DC033', backgroundColor: '#E7F2E8', value: 'completed', textAmountColor: '#B5955E' },
    { label: '사용', color: '#6E89E7', backgroundColor: '#EBEFFC', value: 'pending', textAmountColor: '#3B3B3B' },
    { label: '취소', color: '#8C8C8C', backgroundColor: '#EFEFEF', value: 'failed', textAmountColor: '#AFAEAE' },
  ]

  const transactionTypeList = [
    { label: 'DSP포인트 충전', value: 'cashIn' },
    { label: '계좌이체', value: 'payment' },
  ]

  useEffect(() => {
    findByCondition()
  }, [])

  useEffect(() => {
    getMyWallet()
    getCurrencyExchange()
  }, [])

  function getCurrencyExchange() {
    currencyExchangeService.findAll(unit).then((res) => {
      setCurrencyExchange(res.data)
    })
  }

  function getMyWallet() {
    walletservice.getInfoWallet().then((res) => {
      setMyWallet(res.data)
    })
  }

  function findByCondition() {
    transactionservice.findByCondition(payload).then((res) => {
      let groupedByMonth = res.data.content.reduce((transaction, current) => {
        const month = moment(current.transactionDate).format('YYYY/MM/DD')

        if (!transaction[month]) {
          transaction[month] = []
        }

        transaction[month].push(current)
        return transaction
      }, {})
      const result = Object.entries(groupedByMonth).map(([month, values]) => ({
        month,
        values,
      }))
      setTransactions(result)
      const data = res.data
      const pagination = {
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        numberOfElements: data.numberOfElements,
      }
      setPagination(pagination)
    })
  }

  function handleOnchangePage(event) {
    payload.pageNumber = parseInt(event) - 1
    findByCondition()
  }

  return (
    <>
      <div>
        <Row>
          <Col span={24} className='p-4' style={{ backgroundColor: '#F8F8F8', borderRadius: '10px' }}>
            <Row>
              <Col span={6} className=''>
                <span className='text-[18px]' style={{ fontWeight: 700 }}>
                  나의 TYC포인트
                </span>
              </Col>
              <Col span={12} className='text-right' style={{ fontSize: '22px', fontWeight: 700 }}>
                <div className='balance-wallet mr-4'>{formatPrice(myWallet.balance)}</div>
                <div className='font-bold text-primaryPrdName mr-4'>
                  {/* {formatNumber(myWallet.balance * currency[0]?.rate)} {unit} */}
                  {unit !== 'KRW' ? formatPriceMultilingual(myWallet.balance * currency[0]?.rate, unit) : null}
                </div>
              </Col>
              <Col span={6} style={{ margin: 'auto' }}>
                <div
                  className='btn-copy m-auto pl-2 pr-2 text-center cursor-pointer'
                  style={{
                    backgroundColor: '#E9D2A9',
                    borderRadius: '5px',
                    lineHeight: '40px',
                    color: '#3B3B3B',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                  onClick={() => navigate('/tyc/cashin')}
                >
                  <WalletOutlined className='mr-2' />
                  <span>충전하기</span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col span={24}>
            <Row>
              {optionDates.map((date, index) => (
                <Col
                  span={4}
                  className='date-filter text-center m-2 bg-[#F8F8F8] p-1'
                  key={index}
                  style={{
                    borderRadius: '5px',
                    color: '#8C8C8C',
                  }}
                >
                  {date.Label}
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row className='mt-4'>
          {transactions.map((transaction, index) => (
            <Col span={24} className='mb-7' key={index}>
              <Row>
                <Col span={24} className='bg-[#FAF4EA] p-2' style={{ borderRadius: '10px 10px 0px 0px' }}>
                  <span className='date-time text-[#B5955E] text-[16px]'>{transaction.month} 화요일 </span>
                </Col>
                {transaction.values.map((el, indexElement) => {
                  let isBorder = transaction.values.length - 1 === indexElement
                  let colorTag = colorTags.find((status) => status.value == el.transactionStatus)
                  return (
                    <Col
                      span={24}
                      className={'bg-[#F8F8F8] ' + `${indexElement}`}
                      style={{
                        borderBottom: '1px solid #EFEFEF',
                        borderRadius: `${isBorder ? '0px 0px 10px 10px' : ''}`,
                      }}
                      key={indexElement}
                    >
                      <Row className='p-3'>
                        <Col span={2} className='mt-1'>
                          <Tag
                            color={colorTag?.backgroundColor}
                            style={{ color: `${colorTag?.color}`, fontWeight: 600 }}
                          >
                            {colorTag?.label}
                          </Tag>
                        </Col>
                        <Col span={14} className='pl-3' style={{ lineHeight: '25px' }}>
                          <div className='w-full'>
                            <span className='text-[#3B3B3B] text-[16px]' style={{ fontWeight: 500 }}>
                              주문번호: <span>{el.transactionCode}</span>
                            </span>
                          </div>
                          <div className='w-ful'>
                            <span className='text-[#AFAEAE] text-[16px]'>
                              {moment(el.transactionDate).format('YYYY/MM/DD - HH:mm')}
                            </span>
                          </div>
                          <div className='w-ful'>
                            <span style={{ fontWeight: 700 }} className='text-[#3B3B3B] text-[16px]'>
                              {transactionTypeList.find((type) => type.value == el.transactionType)?.label}
                            </span>
                          </div>
                          <div className='w-full description text-[12px]'>
                            비고:
                            <span> {el.description} </span>
                          </div>
                        </Col>
                        <Col span={8} className='text-right cursor-pointer m-auto'>
                          <div
                            className='w-full amount'
                            style={{ fontSize: '20px', fontWeight: 700, color: `${colorTag?.textAmountColor}` }}
                          >
                            <span>{el?.transactionType == 'cashIn' ? ' + ' : ' - '}</span>
                            <span>{formatPrice(el.amount)}</span>
                          </div>
                          {/* <div className="w-full details mt-3 text-[#3B3B3B]" style={{ fontSize: '14px', fontWeight: 500}}>
                                                                세부정보 보기
                                                                <RightOutlined className="ml-2" color="#3B3B3B" />
                                                            </div> */}
                        </Col>
                      </Row>
                    </Col>
                  )
                })}
              </Row>
            </Col>
          ))}
        </Row>
        <Row className='m-auto'>
          <Col md={15} className='w-full'>
            <div className='pagination flex justify-center'>
              <Pagination
                pageSize={payload.pageSize}
                total={pagination?.totalElements}
                showTotal={false}
                showSizeChanger={false}
                onChange={(event) => handleOnchangePage(event)}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
