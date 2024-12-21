export const formatPrice = (p, NOD = false) => {
  if (!p) return '0'
  p = Math.round(p)
  p = p.toString()
  let n = 0
  let tmp = ''
  let rs = p[0]
  for (let i = p.length - 1; i > 0; i--) {
    n++
    tmp += p[i]
    if (n % 3 === 0) {
      tmp += ','
    }
  }
  for (let i = tmp.length - 1; i >= 0; i--) {
    rs += tmp[i]
  }
  if (NOD == true) return rs
  return rs + ' ' + '₩'
}

export const formatNumber = (p, NOD = false) => {
  if (!p) return '0'
  p = Math.round(p)
  p = p.toString()
  let n = 0
  let tmp = ''
  let rs = p[0]
  for (let i = p.length - 1; i > 0; i--) {
    n++
    tmp += p[i]
    if (n % 3 === 0) {
      tmp += '.'
    }
  }
  for (let i = tmp.length - 1; i >= 0; i--) {
    rs += tmp[i]
  }
  if (NOD == true) return rs
  return rs
}

export const formatPriceMultilingual = (amount, currency) => {
  const validCurrencies = ['VND', 'CNH', 'JPY', 'USD', 'KRW']

  // Đảm bảo currency hợp lệ, nếu không mặc định là 'USD'
  if (!validCurrencies.includes(currency)) {
    currency = 'USD'
  }

  // Bản đồ locale cho từng loại tiền tệ
  const localeMap = {
    VND: 'vi-VN',
    CNH: 'zh-CN',
    JPY: 'ja-JP',
    USD: 'en-US',
    KRW: 'ko-KR',
  }

  const locale = localeMap[currency] || 'en-US'

  // Nếu không phải USD, làm tròn lên; nếu là USD, giữ nguyên giá trị
  const roundedAmount = currency === 'USD' ? amount : Math.ceil(amount)

  // Định dạng số lượng theo locale
  let formattedAmount = new Intl.NumberFormat(locale).format(roundedAmount)

  // Nếu là VND, thay đổi dấu '.' thành dấu ','
  // if (currency === 'VND') {
  //   formattedAmount = formattedAmount.replace(/\./g, ',')
  // }

  // Trả về chuỗi định dạng kèm đơn vị tiền tệ
  return `${formattedAmount} ${currency}`
}

export const getQueryParams = (name) => {
  return new URLSearchParams(window ? window.location.search : {}).get(name)
}

export const getPathByIndex = (index) => {
  const path = window.location.pathname
  const parts = path.split('/')

  if (index >= 0 && index < parts.length) {
    return parts[index]
  }
  return null
}

export const getColorTableAdmin = (type) => {
  switch (type) {
    case 'sale':
      return {
        color: '#F26D4B',
        bgColor: '#FAFAFA',
      }
    case 'ship':
      return {
        color: '#36BDF7',
        bgColor: '#FAFAFA',
      }
    case 'event':
      return {
        color: '#ED8559',
        bgColor: '#FAFAFA',
      }
    case 'recommend':
      return {
        color: '#2DC033',
        bgColor: '#FAFAFA',
      }
    case 'new_product':
      return {
        color: '#E97EDF',
        bgColor: '#FAFAFA',
      }
    case 'best':
      return {
        color: '#6E89E7',
        bgColor: '#FAFAFA',
      }
    case 'bonus':
      return {
        color: 'cyan', // Màu chữ cho bonus
        bgColor: '#FAFAFA',
      }
    default:
      return { color: 'black', bgColor: '#FAFAFA' }
  }
}

export const formatOrderDate = (dateString) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}.${month}.${day} ${hours}:${minutes}`
}

export const formatOrderDateExpected = (dateString) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day} `
}

export const getColorStatusOrder = (type) => {
  switch (type) {
    case 'PENDING':
      return { color: '#4A4A4A', bgColor: '#E3EBFF' } // Màu chữ: xám đậm, nền: xanh nhạt
    case 'CONFIRM_PAYMENT':
      return { color: '#4A4A4A', bgColor: '#E3EBFF' } // Màu chữ: xám đậm, nền: xanh nhạt
    case 'PREPARING_DELIVERY':
      return { color: '#FFFFFF', bgColor: '#6B53FF' } // Màu chữ: trắng, nền: tím
    case 'IN_DELIVERY':
      return { color: '#3A9A3F', bgColor: '#D8F0D9' } // Màu chữ: xanh lá cây đậm, nền: xanh nhạt
    case 'REQUEST_CANCEL':
      return { color: '#C92525', bgColor: '#F5D2D2' } // Màu chữ: đỏ, nền: đỏ nhạt
    case 'CANCELLED':
      return { color: '#C92525', bgColor: '#F5D2D2' } // Màu chữ: đỏ, nền: đỏ nhạt
    case 'SUCCESS':
      return { color: '#007B7D', bgColor: 'cyan' } // Màu chữ: xanh đậm, nền: xanh cyan
    case 'PAID':
      return { color: '#007B7D', bgColor: 'cyan' } // Màu chữ: xanh đậm, nền: xanh cyan
    default:
      return { color: '#000000', bgColor: '#FFFFFF' } // Mặc định: Màu chữ đen, nền trắng
  }
}

const StatusEnum = {
  PENDING: { id: 0, value: 'pending' },
  CONFIRM_PAYMENT: { id: 1, value: 'confirm payment' },
  PREPARING_DELIVERY: { id: 2, value: 'preparing delivery' },
  IN_DELIVERY: { id: 3, value: 'in delivery' },
  REQUEST_CANCEL: { id: 4, value: 'request cancel' },
  CANCELLED: { id: 5, value: 'cancelled' },
  SUCCESS: { id: 6, value: 'success' },
  PAID: { id: 7, value: 'paid' },
}

// Hàm trả về trạng thái dựa trên ID
export const getStatusById = (id) => {
  switch (id) {
    case '0':
      return StatusEnum.PENDING.value
    case '1':
      return StatusEnum.CONFIRM_PAYMENT.value
    case '2':
      return StatusEnum.PREPARING_DELIVERY.value
    case '3':
      return StatusEnum.IN_DELIVERY.value
    case '4':
      return StatusEnum.REQUEST_CANCEL.value
    case '5':
      return StatusEnum.CANCELLED.value
    case '6':
      return StatusEnum.SUCCESS.value
    case '7':
      return StatusEnum.PAID.value
    default:
      return 'Unknown status'
  }
}

export const getStatusByName = (name) => {
  switch (name) {
    case 'PENDING':
      return StatusEnum.PENDING.value
    case 'CONFIRM_PAYMENT':
      return StatusEnum.CONFIRM_PAYMENT.value
    case 'PREPARING_DELIVERY':
      return StatusEnum.PREPARING_DELIVERY.value
    case 'IN_DELIVERY':
      return StatusEnum.IN_DELIVERY.value
    case 'REQUEST_CANCEL':
      return StatusEnum.REQUEST_CANCEL.value
    case 'CANCELLED':
      return StatusEnum.CANCELLED.value
    case 'SUCCESS':
      return StatusEnum.SUCCESS.value
    case 'PAID':
      return StatusEnum.PAID.value
    default:
      return 'Unknown status'
  }
}

const translations = {
  en: {
    COLOR: 'Color',
    SIZE: 'Size',
    MATERIAL: 'Material',
    WEIGHT: 'Weight',
    CUSTOM_ATTRIBUTE: 'Custom Attribute',
  },
  vi: {
    COLOR: 'Màu sắc',
    SIZE: 'Size',
    MATERIAL: 'Kích cỡ',
    Material: 'Chất liệu',
    WEIGHT: 'Cân nặng',
    CUSTOM_ATTRIBUTE: 'Thuộc tính tùy chỉnh',
  },
  ko: {
    COLOR: '색상',
    SIZE: '크기',
    MATERIAL: '재료',
    WEIGHT: '무게',
    CUSTOM_ATTRIBUTE: '사용자 정의 속성',
  },
  'zh-CN': {
    COLOR: '颜色',
    SIZE: '尺寸',
    MATERIAL: '材料',
    WEIGHT: '重量',
    CUSTOM_ATTRIBUTE: '自定义属性',
  },
  ja: {
    COLOR: '色',
    SIZE: 'サイズ',
    MATERIAL: '素材',
    WEIGHT: '重さ',
    CUSTOM_ATTRIBUTE: 'カスタム属性',
  },
}

export const multilingualProperties = (name, language) => {
  const translation = translations[language] || translations.ko
  return translation[name] || name
}
