import { transactionservice } from '@services/user/transactionService'
import React, { useEffect, useState } from 'react'

export default function ExchangeRate({ exchangePrice }) {
  const [language, setLanguage] = useState('')
  const [baseCurrency, setBaseCurrency] = useState('')
  const [dataExchangeRate, setDataExchangeRate] = useState([])

  useEffect(() => {
    const getLanguage = JSON.parse(localStorage.getItem('language')) || 'kr'
    setLanguage(getLanguage)
    setBaseCurrency(mapLanguageToCurrency(getLanguage))
  }, [])

  const mapLanguageToCurrency = (lang) => {
    switch (lang) {
      case 'vn':
        return 'VND'
      case 'cn':
        return 'CNH'
      case 'jp':
        return 'JPY'
      case 'en':
        return 'USD'
      case 'kr':
      default:
        return 'KRW'
    }
  }

  const formatPrice = (amount, currency) => {
    const validCurrencies = ['VND', 'CNH', 'JPY', 'USD', 'KRW']
    if (!validCurrencies.includes(currency)) {
      currency = 'USD'
    }

    const localeMap = {
      VND: 'vi-VN',
      CNH: 'zh-CN',
      JPY: 'ja-JP',
      USD: 'en-US',
      KRW: 'ko-KR',
    }
    const locale = localeMap[currency] || 'en-US'

    // Format the amount without currency symbol
    const formattedAmount = new Intl.NumberFormat(locale).format(amount)

    // Manually concatenate the currency symbol after the amount
    return `${formattedAmount} ${currency}`
  }

  useEffect(() => {
    const fetchCurrencyExchange = async () => {
      if (baseCurrency) {
        try {
          const response = await transactionservice.exchangeRate(baseCurrency)
          setDataExchangeRate(response.data)
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchCurrencyExchange()
  }, [baseCurrency])

  const convertedPrice = dataExchangeRate.length > 0 ? exchangePrice * dataExchangeRate[0]?.rate : 0
  const formattedPrice = formatPrice(convertedPrice, baseCurrency)

  return (
    <div className='font-bold lg:text-primaryPrdName text-[#3B3B3B]'>
      {baseCurrency !== 'KRW' ? formattedPrice : null}
    </div>
  )
}
