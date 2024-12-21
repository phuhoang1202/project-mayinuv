import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function BreadcrumbsCommon() {
  const location = useLocation()

  // Mapping of paths to display names
  const pathNames = {
    '': '홈페이지',
    product: '제품 페이지',
    account: '내 정보 확인 및 수정',
    'order-confimation': '주문하다',
    'product-details': '상세 제품',
    'shopping-cart': '장바구니',
    'shopping-cart/favorites': '찜',
    'dsp/cashin': 'DSP 충전',
    'dsp/transaction-history': 'DSP포인트',
    'tyc-deposit': 'TYC 충전',
    'order-history': '주문내역',
    'order-history-detail': '주문 세부정보',
    'about-us': '회사 소개',
    service: '서비스 소개',
    logout: '설정',
    'terms-of-service': '서비스 약관',
    'asked-question': '자주 묻는 질문',
    'setting-feature': '설정',
    'setting-country': '서비스 약관',
    'news-page': '새소식',
    // Add more mappings as needed
  }

  // Split the pathname into segments
  const pathSegments = location.pathname.split('/').filter(Boolean)

  // Nếu là đường dẫn /shopping-cart/favorites
  if (location.pathname === '/shopping-cart/favorites') {
    return (
      <div>
        <span className='font-bold text-[32px] text-[#3B3B3B]'>{pathNames['shopping-cart/favorites']}</span>
      </div>
    )
  }

  // Nếu là trang chủ
  if (pathSegments.length === 0) {
    return (
      <div>
        <span className='font-bold text-[32px] text-[#3B3B3B]'>{pathNames['']}</span>
      </div>
    )
  }

  // Xử lý logic cho các đường dẫn động như /products/:id
  const breadcrumbs = pathSegments.map((segment, index) => {
    const pathToSegment = `/${pathSegments.slice(0, index + 1).join('/')}`
    const isLast = index === pathSegments.length - 1

    // Xử lý đặc biệt cho 'products/:id'
    let displayName = pathNames[pathToSegment.slice(1)] || pathNames[segment]
    // if (pathSegments[0] === 'product') {
    //   displayName = pathNames['product']
    // }

    return isLast ? (
      <span key={index} className='font-bold text-[32px] text-[#3B3B3B]'>
        {displayName}
      </span>
    ) : (
      <React.Fragment key={index}>
        <Link to={pathToSegment} className='font-bold text-[32px] text-[#3B3B3B]'>
          {displayName}
        </Link>
      </React.Fragment>
    )
  })

  return (
    <div>
      <div className='font-bold text-[32px] text-[#3B3B3B]'>{breadcrumbs}</div>
    </div>
  )
}
