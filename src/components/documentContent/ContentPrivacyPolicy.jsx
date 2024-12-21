import React from 'react'
import { Table } from 'antd'
import { useTranslation } from 'react-i18next'

export default function ContentPrivacyPolicy() {
  const { t } = useTranslation()
  // Table 1
  const lawBasisContent = (
    <div>
      개인정보 보호법 제15조(개인정보의 수집ㆍ이용) 1항 4호
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>
          정보주체와 체결한 계약을 이행하거나 계약을 체결하는 과정에서 정보주체의 요청에 따른 조치를 이행하기 위하여
          필요한 경우
        </li>
      </ul>
    </div>
  )

  const data1 = [
    {
      key: '1',
      lawBasis: lawBasisContent,
      purpose: '이메일 회원 가입 및 서비스 제공, 정보주체 식별·인증, 회원자격 유지·관리',
      items: '아이디, 비밀번호, 이름, 생년월일, 휴대폰번호, 이메일 주소, 국적, 추천인코드',
      retention: '탈퇴 요청 5일 후 지체없이 파기',
    },
    {
      key: '2',
      lawBasis: lawBasisContent,
      purpose: '주문, 결제, 물품 배송 및 반품, 환불 처리',
      items:
        '구매자 정보(아이디, 이름, 휴대폰번호, 전화번호), 배송지 정보(수령인명, 배송지명, 휴대폰번호, 전화번호, 주소), 결제정보(결제수단, 결제금액, 결제일시, 결제승인번호), 환불계좌 정보(은행명, 예금주명, 계좌번호)',
      retention: (
        <div>
          전자상거래 등에서의 소비자보호에 관한 법률 제6조(거래기록의 보존 등)
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</li>
          </ul>
        </div>
      ),
    },
    {
      key: '3',
      lawBasis: lawBasisContent,
      purpose: '불법∙부정 이용 방지',
      items: '아이디, 이름, 성별, 생년월일, 휴대폰번호, 국적',
      retention: '탈퇴 요청 5일 후 지체없이 파기',
    },
    {
      key: '4',
      lawBasis: lawBasisContent,
      purpose: '서비스 및 판매 상품에 대한 상담 및 민원 사무 처리',
      items:
        '아이디, 이름, 휴대폰번호, 이메일 주소, 구매 내역, 결제 내역, 상담기록(상담내용, 상담일시, 음성 녹취기록, 분쟁처리 결과)',
      retention: (
        <div>
          전자상거래 등에서의 소비자보호에 관한 법률 제6조(거래기록의 보존 등)
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>계약 또는 청약철회 등에 관한 기록 : 5년</li>
            <li>대금결제 및 재화등의 공급에 관한 기록 : 5년</li>
          </ul>
        </div>
      ),
    },
  ]

  const columns1 = [
    {
      title: '법적 근거',
      dataIndex: 'lawBasis',
      key: 'lawBasis',
      onCell: (record, rowIndex) => {
        const firstIndex = data1.findIndex((item) => item.lawBasis === record.lawBasis)
        const rowSpan = data1.filter((item) => item.lawBasis === record.lawBasis).length
        return {
          rowSpan: rowIndex === firstIndex ? rowSpan : 0,
        }
      },
    },
    {
      title: '목적',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: '항목',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: '보유 및 이용 기간',
      dataIndex: 'retention',
      key: 'retention',
    },
  ]

  // Table 2
  const lawBasisContent2 = (
    <div>
      개인정보 보호법 제17조(개인정보의 제공) 4항
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>
          당초 수집 목적과 합리적으로 관련된 범위에서 정보주체에게 불이익이 발생하는지 여부, 암호화 등 안전성 확보에
          필요한 조치를 하였는지 여부 등을 고려하여 정보주체의 동의 없이 개인정보를 제공하는 경우
        </li>
      </ul>
    </div>
  )

  const columns2 = [
    {
      title: '법적근거',
      dataIndex: 'legalBasis',
      key: 'legalBasis',
      onCell: (record, rowIndex) => {
        const firstIndex = data2.findIndex((item) => item.lawBasis === record.lawBasis)
        const rowSpan = data2.filter((item) => item.lawBasis === record.lawBasis).length
        return {
          rowSpan: rowIndex === firstIndex ? rowSpan : 0,
        }
      },
    },
    {
      title: '제공받는 자',
      dataIndex: 'recipient',
      key: 'recipient',
    },
    {
      title: '제공 목적',
      dataIndex: 'purposeOfProvision',
      key: 'purposeOfProvision',
    },
    {
      title: '제공 항목',
      dataIndex: 'itemsProvided',
      key: 'itemsProvided',
    },
    {
      title: '판단근거',
      dataIndex: 'basisJudgment',
      key: 'basisJudgment',
    },
    {
      title: '제공받는 자의 보유 및 이용 기간',
      dataIndex: 'periodPossession',
      key: 'periodPossession',
    },
  ]

  const data2 = [
    {
      key: '1',
      legalBasis: lawBasisContent2,
      recipient: '배송 상품 판매자',
      purposeOfProvision: (
        <div>
          전자상거래 등에서의 소비자보호에 관한 법률 제6조(거래기록의 보존 등)
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>구매상품 및 서비스의 제공</li>
            <li>고객 상담 및 민원 사무 처리</li>
          </ul>
        </div>
      ),
      itemsProvided: (
        <div>
          전자상거래 등에서의 소비자보호에 관한 법률 제6조(거래기록의 보존 등)
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>구매자 정보(아이디, 이름, 휴대폰번호, 전화번호, 상품 구매정보)</li>
            <li>배송지 정보(수령인명, 배송지명, 휴대폰번호, 전화번호, 주소)</li>
          </ul>
        </div>
      ),
      basisJudgment: (
        <div>
          전자상거래 등에서의 소비자보호에 관한 법률 제6조(거래기록의 보존 등)
          <ol className='list-decimal pl-6'>
            <li>
              합리적 관련성 : 회사는 정보주체에게 구매 상품 및 서비스를 제공하기 위해 개인정보를 수집했기 때문에 구매
              상품 및 서비스의 제공, 계약 이행, 고객 상담 및 민원사무처리는 개인정보 수집 목적과 합리적으로 관련 있음
            </li>
            <li>
              예측 가능성 : 통신판매 중개 서비스 특성 상 입점사가 구매 상품 및 서비스 제공을 위해 개인정보를 제공 받아야
              하기 때문에 계약 이행을 위한 개인정보 제공이 있음을 예측 가능
            </li>
            <li>
              정보주체의 이익을 부당하게 침해하는지 여부 : 정보주체의 자유로운 의사에 따라 구매 여부를 결정할 수 있고,
              체결한 계약의 이행을 위해 필요하기 때문에 정보주체의 이익을 침해하지 않음
            </li>
            <li>
              안전성 확보 조치 여부 : 회사는 입점사에게 제공하는 개인정보처리시스템에 비밀번호 정책 설정, 2차 인증,
              전송구간 암호화, 개인정보 마스킹 등 개인정보 보호법을 준수하여 안전성 확보조치를 적용하고 있음
            </li>
          </ol>
        </div>
      ),
      periodPossession:
        '상품 구매/배송/반품 등 서비스 처리 완료 후 180일간 보관 후 파기단, 관계법령에 따라 일정기간 보존해야 하는 경우 해당 기간 보관후 파기',
    },
    {
      key: '2',
      legalBasis: lawBasisContent2,
      recipient: '티켓 상품 판매자',
      purposeOfProvision: (
        <div>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>구매상품 및 서비스의 제공</li>
            <li>고객 상담 및 민원 사무 처리</li>
          </ul>
        </div>
      ),
      itemsProvided: '예매자 정보(성명, 생년월일, 휴대폰번호, 주소, 상품 구매정보)',
      basisJudgment: (
        <div>
          <ol className='list-decimal pl-6'>
            <li>
              합리적 관련성 : 회사는 정보주체에게 구매 상품 및 서비스를 제공하기 위해 개인정보를 수집했기 때문에 구매
              상품 및 서비스의 제공, 계약 이행, 고객 상담 및 민원사무처리는 개인정보 수집 목적과 합리적으로 관련 있음
            </li>
            <li>
              예측 가능성 : 통신판매 중개 서비스 특성 상 입점사가 구매 상품 및 서비스 제공을 위해 개인정보를 제공 받아야
              하기 때문에 계약 이행을 위한 개인정보 제공이 있음을 예측 가능
            </li>
            <li>
              정보주체의 이익을 부당하게 침해하는지 여부 : 정보주체의 자유로운 의사에 따라 구매 여부를 결정할 수 있고,
              체결한 계약의 이행을 위해 필요하기 때문에 정보주체의 이익을 침해하지 않음
            </li>
            <li>
              안전성 확보 조치 여부 : 회사는 입점사에게 제공하는 개인정보처리시스템에 비밀번호 정책 설정, 2차 인증,
              전송구간 암호화, 개인정보 마스킹 등 개인정보 보호법을 준수하여 안전성 확보조치를 적용하고 있음
            </li>
          </ol>
        </div>
      ),
      periodPossession:
        '티켓 사용 완료 후 180일간 보관 후 파기단, 관계법령에 따라 일정기간 보존해야 하는 경우 해당 기간 보관후 파기',
    },
  ]

  // Table 3
  const columns3 = [
    {
      title: '위탁받는 자(수탁자)',
      dataIndex: 'personEntrusted',
      key: 'personEntrusted',
    },
    {
      title: '위탁업무',
      dataIndex: 'consignmentWork',
      key: 'consignmentWork',
    },
  ]

  const data3 = [
    {
      key: '1',
      personEntrusted: <div className='text-[#F14646]'>배송업체명 기재 (링고글로벌, CJ대한통운)</div>,
      consignmentWork: '상품 배송 및 3자 물류 대행 서비스, 글로벌 국제운송 서비스',
    },
    {
      key: '2',
      personEntrusted: <div className='text-[#F14646]'>PG사명 기재</div>,
      consignmentWork: '결제 대행 서비스',
    },
    {
      key: '3',
      personEntrusted: <div>한국인증서비스㈜</div>,
      consignmentWork: '“서비스” IT기반 시스템 개발 및 운영',
    },
    {
      key: '4',
      personEntrusted: <div>지니글로벌</div>,
      consignmentWork: '“서비스” 관리 및 고객 상담 및 센터 운영',
    },
  ]

  // Table 4
  const columns4 = [
    {
      title: '국외 이전의 근거',
      dataIndex: 'grounds',
      key: 'grounds',
    },
    {
      title: '위탁업무',
      dataIndex: 'consignmentWork',
      key: 'consignmentWork',
    },
    {
      title: '이전받는 자',
      dataIndex: 'recipient',
      key: 'recipient',
    },
    {
      title: '이전되는 국가, 이전 시기 및 방법',
      dataIndex: 'countriesTransferred',
      key: 'countriesTransferred',
    },
    {
      title: '이전받는 자의 이용 목적',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: '이전하는 개인정보 항목',
      dataIndex: 'personalInformation',
      key: 'personalInformation',
    },
    {
      title: '이전하는 개인정보의 보유 및 이용기간',
      dataIndex: 'periodOfRetention',
      key: 'periodOfRetention',
    },
  ]

  const data4 = [
    {
      key: '1',
      grounds: (
        <div>
          개인정보 보호법 제28조의8(개인정보의 국외 이전) 1항 3호
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>정보주체와의 계약의 체결 및 이행을 위하여 개인정보의 처리위탁ㆍ보관이 필요한 경우</li>
          </ul>
        </div>
      ),
      consignmentWork: '고객 CRM 서비스 지원을 위한 데이터 보관 업무',
      recipient: (
        <div>
          braze
          <p className='text-blue-600' style={{ textDecoration: 'underline' }}>
            Inc.privacy@braze.com
          </p>
        </div>
      ),
      countriesTransferred: '이전국가 : 싱가포르 이전일시 및 방법 : 서비스 이용 시점에 네트워크를 통한 전송',
      purpose:
        '고객 CRM 서비스 지원을 위해 개인정보를 보관하며 수탁업체는 자신을 위한 목적으로 개인정보를 이용하지 않음',
      personalInformation: '일방향 암호화 처리(해시처리)한 아이디, 성별, 나이',
      periodOfRetention: '“서비스” 종료시점까지',
    },
  ]

  // Table 5
  const columns5 = [
    {
      title: '수집하는 행태정보의 항목',
      dataIndex: 'collectedBehavior',
      key: 'collectedBehavior',
    },
    {
      title: '행태정보 수집 방법',
      dataIndex: 'howToCollect',
      key: 'howToCollect',
    },
    {
      title: '행태정보 수집 목적',
      dataIndex: 'purposeOfCollection',
      key: 'purposeOfCollection',
    },
    {
      title: '보유·이용기간',
      dataIndex: 'retention',
      key: 'retention',
    },
  ]

  const data5 = [
    {
      key: '1',
      collectedBehavior: '정보주체의 웹사이트/앱 서비스 방문이력, 검색이력, 구매이력',
      howToCollect: '정보주체의 웹 사이트 및 앱 방문/실행시 자동 수집',
      purposeOfCollection: '정보주체의 관심, 성향에 기반한 개인 맞춤형 상품 추천 서비스 제공',
      countriesTransferred: '이전국가 : 싱가포르 이전일시 및 방법 : 서비스 이용 시점에 네트워크를 통한 전송',
      retention: '1년 보관 후 파기',
    },
  ]

  return (
    <div>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-largerPrdName font-bold'>개인정보취급방침</h2>
        <div className='flex flex-col gap-2 mt-6 font-medium'>
          <p>
            TYC GLOBAL SG PTE. LTD.(이하 "회사"라 합니다.)는 회사가 운영하는 TYC Market("tyc.market”이하 "서비스"라
            합니다.)을 이용하는 정보주체의 개인정보 및 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를
            준수하여 안전하게 관리하고 있습니다.
          </p>
          <p>
            정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보
            처리방침을 수립·공개합니다.
          </p>
        </div>

        {/* 1. 개인정보의 처리 목적 및 수집 항목 */}
        <div className='mt-4'>
          <div>
            <h3 className='font-semibold text-primaryPrdName'>1. 개인정보의 처리 목적 및 수집 항목</h3>
            <div className='flex flex-col gap-2 mt-2 text-small'>
              <p>정보주체는 회원가입을 하지 않아도 상품 조회와 검색 등 서비스를 이용할 수 있습니다.</p>
              <p>
                포인트, 쿠폰 등 회원제 서비스의 다양한 혜택과 정보주체의 관심, 흥미, 기호 등을 분석한 추천 서비스를
                이용하기 위해 회원 가입을 할 경우 회사는 서비스 제공을 위해 필요한 최소한의 개인정보를 수집합니다.
              </p>
              <p>
                회사는 다음과 같이 개인정보를 수집∙이용하고 있습니다. 개인정보가 필요한 시점에 최소한의 정보만을
                수집하며 법적 근거와 사전 동의를 받은 범위 내에서만 이용합니다.
              </p>
            </div>
          </div>

          <div className='mt-4 flex flex-col gap-4'>
            {/* 1.1 */}
            <div>
              <h3 className='font-semibold text-normal'>1.1. 회원가입시 정보</h3>
              <div className='flex flex-col gap-2 mt-2 font-medium text-small'>
                <Table className='custom-table' columns={columns1} dataSource={data1} pagination={false} />
              </div>
            </div>

            {/* 1.2 */}
            <div>
              <h3 className='font-semibold text-normal'>1.2. 서비스 이용 과정에서 자동으로 생성 및 수집되는 정보</h3>
              <p className='mt-2 text-small'>
                서비스 이용 과정에서 서비스 이용기록(접속일시, IP주소, MAC주소), 접속기기 정보(단말기명, OS, 기기 식별
                정보), 광고 식별자 정보(ADID, IDFA), 쿠키, 서비스 이용내역, 서비스 내 구매 및 결제 내역이 생성되어
                수집될 수 있습니다.
              </p>
            </div>

            {/* 1.3 */}
            <div>
              <h3 className='font-semibold text-normal'>1.3. 만 14세 미만 아동의 개인정보 보호</h3>
              <p className='mt-2 text-small'>
                회사는 만14세 미만 아동의 개인정보를 보호하기 위하여 만14세 이상인 경우에만 회원 가입을 허용하며 아동의
                개인정보를 수집하지 않습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 2. 개인정보의 제3자 제공 */}
        <div className='mt-4'>
          <div>
            <h3 className='font-semibold text-primaryPrdName'>2. 개인정보의 제3자 제공</h3>
            <div className='flex flex-col gap-2 mt-2 text-small'>
              <p>회사는 다음의 하나에 해당되는 경우 개인정보를 제3자에게 제공합니다.</p>
              <ol className='list-decimal pl-6 flex flex-col gap-2'>
                <li>정보주체의 동의를 받은 경우</li>
                <li>법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우</li>
                <li>명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우</li>
                <li>
                  개인정보처리자의 정당한 이익을 달성하기 위하여 필요한 경우로서 명백하게 정보주체의 권리보다 우선하는
                  경우
                </li>
                <li>
                  정부 관계부처가 합동으로 발표한 「긴급상황 시 개인정보 처리 및 보호수칙」에 따라 재난, 감염병, 급박한
                  생명·신체 위험을 초래하는 사건·사고, 급박한 재산 손실 등의 긴급상황이 발생하는 경우 정보주체의 동의
                  없이 관계 기관에 개인정보를 제공할 수 있습니다. 자세한 사항은 여기*를 눌러 확인하시기 바랍니다.
                </li>
                <li>
                  수집 목적과 합리적으로 관련된 범위 내에서 정보주체의 개인정보 제공이 예측 가능하고, 정보주체의 이익을
                  부당하게 침해하지 않으며, 안전성 확보에 필요한 조치를 한 경우
                </li>
              </ol>
            </div>
          </div>

          <div className='mt-4 flex flex-col gap-4'>
            {/* 2.1 */}
            <div>
              <h3 className='font-semibold text-normal'>2.1. 정보주체의 동의를 받아 개인정보를 제3자 제공하는 경우</h3>
              <p className='mt-2 text-small'>
                회사가 정보주체의 동의를 받아 개인정보를 제3자에게 제공하는 경우는 다음과 같습니다.
                <br />
                <strong>-없음-</strong>
              </p>
            </div>

            {/* 2.2 */}
            <div>
              <h3 className='font-semibold text-normal'>2.2. 정보주체의 동의 없이 개인정보를 제3자 제공하는 경우</h3>
              <div className='flex flex-col gap-2 mt-2 font-medium text-small'>
                <Table className='custom-table' columns={columns2} dataSource={data2} pagination={false} />
              </div>
            </div>
          </div>
        </div>

        {/* 3. 추가적인 이용ㆍ제공의 판단 기준 */}
        <div className='mt-4'>
          <div>
            <h3 className='font-semibold text-primaryPrdName'>3. 추가적인 이용ㆍ제공의 판단 기준</h3>
            <div className='flex flex-col gap-2 mt-2  text-small'>
              <p>
                회사는 정보주체에게 동의 받거나 법적 근거 범위 내에서만 개인정보를 이용 및 제공합니다. 다만, 개인정보
                보호법 제15조 제3항 또는 제17조 제4항에 따라 정보주체의 동의 없이 개인정보를 추가적으로 이용ㆍ제공할 수
                있습니다.
              </p>
              <p>
                회사는 정보주체의 동의 없이 개인정보를 이용ㆍ제공하려는 경우 다음과 같은 사항을 고려하며, 이 경우에도
                최소한의 개인정보만을 이용ㆍ제공합니다.
              </p>
              <ol className='list-decimal pl-6 flex flex-col gap-2'>
                {/* 1 */}
                <li>당초 수집 목적과 관련성이 있는지 여부</li>
                {/* 2 */}
                <li>
                  개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 개인정보의 추가적인 이용 또는 제공에 대한 예측
                  가능성이 있는지 여부
                </li>
                {/* 3 */}
                <li>정보주체의 이익을 부당하게 침해 하는지 여부</li>
                {/* 4 */}
                <li>
                  가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부 개인정보의 추가적인 이용ㆍ제공이
                  지속적으로 발생하는 경우에는 위 사항에 대한 판단기준을 공개하고, 준수하고 있는지 여부를
                  점검하겠습니다.
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* 4. 추가적인 이용ㆍ제공의 판단 기준 */}
        <div className='mt-4'>
          <div>
            <h3 className='font-semibold text-primaryPrdName'>4. 개인정보의 처리 위탁</h3>
            <div className='flex flex-col gap-2 mt-2 text-small'>
              <p>
                회사는 위탁 계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지,
                기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상책임 등에 관한 사항을 계약서 등
                문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
              </p>
              <p>
                수탁자가 회사의 개인정보 처리업무를 재위탁하는 경우 회사의 동의를 받고 있습니다. 위탁업무의 내용이나
                수탁자가 변경될 경우 개인정보처리방침을 통해 공개하겠습니다. 회사는 원활한 서비스 제공을 위하여 개인정보
                처리업무를 위탁하는 경우는 다음과 같습니다.
              </p>
            </div>

            <div className='flex flex-col gap-2 mt-2 semibold text-small'>
              <Table className='custom-table' columns={columns3} dataSource={data3} pagination={false} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-small'>
              <p>
                회사는 원활한 서비스 제공을 위하여 국외에 일부 개인정보 처리업무를 위탁하고 있습니다. 이전 되는
                개인정보는 아래와 같습니다.
              </p>
              <p>
                정보주체는 "8. 개인정보 보호책임자 및 정보주체의 권익침해 구제 방법"에서 안내하는 개인정보
                보호책임자에게 서면, 전화 또는 이메일을 통해서 국외 이전을 거부할 수 있습니다. 정보주체가 개인정보의
                국외 이전을 거부하는 경우 회사는 국외 이전 대상에서 제외합니다. 다만, 이전을 거부할 경우 국외 이전이
                필수적으로 필요한 서비스의 이용이 불가능합니다.
              </p>

              <div className='flex flex-col gap-2 mt-2 semibold text-small'>
                <Table className='custom-table' columns={columns4} dataSource={data4} pagination={false} />
              </div>
            </div>
          </div>
        </div>

        {/* 5. 개인정보의 보유기간 및 파기 */}
        <div className='mt-4'>
          <div>
            <h3 className='font-semibold text-primaryPrdName'>5. 개인정보의 보유기간 및 파기</h3>
            <div className='flex flex-col gap-2 mt-2 text-small'>
              <p>
                회사는 원칙적으로 개인정보의 수집 및 이용 목적의 달성, 보유기간의 경과 또는 회원 탈퇴 시 지체없이
                파기하고 있습니다. 단, 법령에서 일정 기간 보관을 규정하는 경우 또는 정보주체에게 별도의 동의를 얻은
                경우에는 해당 기간 동안 개인정보를 안전하게 보관 후 파기합니다.
              </p>
            </div>
          </div>

          <div className='mt-4 flex flex-col gap-4'>
            {/* 5.1 */}
            <div>
              <h3 className='font-semibold text-normal'>5.1. 법령 준수를 위해 개인정보의 보존이 필요한 경우</h3>
              <p className='mt-2 text-small'>법적근거: 「전자상거래 등에서의 소비자보호에 관한 법률</p>
              <p className='mt-2 text-small'>보존항목 및 기간</p>
              <ul className='pl-4'>
                <li>- 대금결제 및 재화 등의 공급에 관한 기록 5년</li>
                <li>- 계약 또는 청약철회 등에 관한 기록 5년</li>
                <li>- 소비자의 불만 또는 분쟁 처리에 관한 기록 3년</li>
                <li>-「통신비밀보호법」 통신사실 확인자료 기록 3개월</li>
              </ul>
            </div>

            {/* 5.2 */}
            <div>
              <h3 className='font-semibold text-normal'>
                5.2. 회사의 내부 방침에 의해 보존이 필요하여 동의를 받은 경우
              </h3>
              <p className='mt-2 text-small'>
                회원 탈퇴 시 부정 가입 및 이용 방지 목적으로 CI 값은 복호화가 불가능하게 일방향 암호화
                처리(해시처리)하여 1년간 보관 후 파기합니다.
              </p>

              <p className='mt-2 text-small'>
                회원 탈퇴 시 부정 가입 및 이용 방지를 위해 서비스 부정 이용 기록은 1년간 보관 후 파기합니다.
              </p>
            </div>

            {/* 5.3 */}
            <div>
              <h3 className='font-semibold text-normal'>5.3. 개인정보의 파기 절차 및 방법</h3>
              <p className='mt-2 text-small'>
                회원탈퇴, 서비스 종료, 정보주체에게 동의 받은 개인정보 보유기간의 경과와 같이 개인정보의 수집 및
                이용목적이 달성된 개인정보는 복원이 불가능한 방법으로 파기하고 있습니다. 법령에서 보관을 규정한 정보에
                대해서도 해당 기간 경과 후 지체없이 복원이 불가능한 방법으로 파기합니다.
              </p>

              <p className='mt-2 text-small'>
                전자적 파일 형태의 경우 복원이 불가능한 기술적인 방법을 이용하여 안전하게 파기하며, 출력물 등은
                분쇄하거나 소각하는 방식 등으로 파기합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 6. 개인정보의 안전성 확보조치 */}
        <div className='mt-4'>
          <div>
            <h3 className='font-semibold text-primaryPrdName'>6. 개인정보의 안전성 확보조치</h3>
            <div className='flex flex-col gap-2 mt-2 text-small'>
              <p>회사는 정보주체의 개인정보를 안전하게 관리하기 위해 최선을 다하고 있습니다.</p>
            </div>
          </div>

          <div className='mt-4 flex flex-col gap-4'>
            {/* 6.1 */}
            <div>
              <h3 className='font-semibold text-normal'>6.1. 개인정보 보호를 위한 관리적 대책</h3>
              <p className='mt-2 text-small'>
                개인정보 보호책임자 및 전담조직을 운영하며, 정기적으로 개인정보 보호 교육 및 캠페인을 통해 임직원들의
                개인정보 보호 인식 제고 활동을 진행하고 있습니다. 개인정보의 안전성 확보에 필요한 기술적･관리적 및
                물리적 안전조치 방안을 포함하여 내부 관리계획을 수립･시행하고 정기적으로 점검하고 있습니다.
              </p>
            </div>

            {/* 6.2 */}
            <div>
              <h3 className='font-semibold text-normal'>6.2. 개인정보 보호 및 유출 방지를 위한 기술적 대책</h3>
              <p className='mt-2 text-small'>
                개인정보처리시스템에 대한 접근 권한을 관리하고 해킹 등에 의해 정보주체의 개인정보가 유출 되지 않도록
                탐지 및 차단하는 정보보안시스템을 24시간 운영하고 있습니다. 중요한 개인정보를 암호화하여 안전하게 저장
                및 전송하고 바이러스 등에 의해 유출 되지 않도록 보안프로그램을 이용하고 있으며, 주기적으로 업데이트하고
                있습니다.
              </p>
            </div>

            {/* 6.3 */}
            <div>
              <h3 className='font-semibold text-normal'>6.3. 정보보호 활동 및 관리체계 검증</h3>
              <p className='mt-2 text-small'>
                지속적인 정보보호 부문 투자와 정보보안 수준을 높이기 위해 최선을 다하고 있으며 정보보호 활동 등 현황을
                투명하게 공개하고 있습니다. 정보보호 관리체계(ISMS)인증을 취득하고 정보보호 활동에 대해 매년 외부
                기관으로부터 정기적인 검증을 받고 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 7. 정보주체 및 법정대리인의 권리·의무 및 행사방법 */}
        <div className='mt-4'>
          <div>
            <h3 className='font-semibold text-primaryPrdName'>7. 정보주체 및 법정대리인의 권리·의무 및 행사방법</h3>
          </div>

          <div className='mt-4 flex flex-col gap-4'>
            {/* 7.1 */}
            <div>
              <h3 className='font-semibold text-normal'>7.1. 정보주체의 권리</h3>
              <p className='mt-2 text-small'>
                정보주체는 자신의 개인정보 처리에 관하여 다음과 같은 권리를 갖고 있습니다.
              </p>
              <ol className='list-decimal pl-6 flex flex-col gap-2 mt-2 text-small'>
                <li>
                  회사가 처리하는 자신의 개인정보에 대한 열람을 요구할 수 있습니다. 다만, 회사는 법률에 따라 열람이
                  금지되거나 제한되는 경우 또는 다른 사람의 생명ㆍ신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의
                  이익을 부당하게 침해할 우려가 있는 경우에는 그 사유를 정보주체에게 알리고 열람을 제한하거나 거절할 수
                  있습니다.
                </li>
                <li>
                  열람한 개인정보의 정정 또는 삭제를 요구할 수 있습니다. 다만, 다른 법령에서 그 개인정보가 수집 대상으로
                  명시되어 있는 경우에는 삭제를 요구할 수 없습니다.
                </li>
                <li>
                  회사가 처리하는 자신의 개인정보 처리에 대한 정지 요구 및 동의 철회를 할 수 있습니다. 다만, 회사는
                  법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우 또는 다른 사람의 생명ㆍ신체를
                  해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우, 개인정보를
                  처리하지 않으면 정보주체와 약정한 서비스를 제공하지 못하는 등 계약의 이행이 곤란한 경우로서 정보주체가
                  그 계약의 해지 의사를 명확하게 밝히지 아니한 경우에는 그 사유를 정보주체에게 알리고 처리정지 요구를
                  거절할 수 있습니다.
                </li>
                <li>
                  자동화된 결정에 대한 거부 또는 설명을 요구할 수 있습니다. 다만, 회사는 정보주체의 개인정보
                  자기결정권을 보호하기 위하여 자동화된 결정을 하지 않습니다. 자동화된 결정이 발생하는 경우 그 기준과
                  절차, 개인정보가 처리되는 방식, 거부 또는 설명 요구절차를 공개하겠습니다.
                </li>
              </ol>
            </div>

            {/* 7.2 */}
            <div>
              <h3 className='font-semibold text-normal'>7.2. 권리 행사방법</h3>
              <p className='mt-2 text-small'>
                정보주체는 언제든지 서비스의 ‘My page &gt; 회원정보변경’에서 직접 자신의 개인정보를 열람하거나 정정,
                삭제할 수 있으며, "회원탈퇴"를 통해 개인정보의 처리에 대한 동의를 철회할 수 있습니다.
              </p>

              <p className='mt-2 text-small'>
                정보주체는"8. 개인정보 보호책임자 및 정보주체의 권익침해 구제 방법"에서 안내하는 개인정보 보호책임자에게
                서면, 전화 또는 이메일을 통해서 요청할 수 있으며 이 경우 회사는 지체없이 조치하겠습니다.
              </p>

              <p className='mt-2 text-small'>
                정보주체는 법정대리인이나 위임을 받은 자 등 대리인을 통하여 권리행사를 할 수도 있으며, 이 경우
                「개인정보 처리 방법에 관한 고시(제2023-12호)」 [별지 제11호] 서식에 따른 위임장을 제출하셔야 합니다.
              </p>

              <p className='mt-2 text-small'>
                회사는 정보주체의 권리에 따른 열람, 정정·삭제, 처리 정지 및 동의 철회 요구 시 열람 등 요구를 한 자가
                본인이거나 정당한 대리인인지를 확인합니다.
              </p>
            </div>

            {/* 7.3 */}
            <div>
              <h3 className='font-semibold text-normal'>7.3. 정보주체의 의</h3>
              <p className='mt-2 text-small'>
                정보주체는 회원 가입 단계에서 생성한 아이디와 비밀번호(이하 "계정정보")를 관리할 책임이 있으며,
                계정정보를 타인에게 판매, 양도, 대여, 공유할 수 없습니다.
              </p>

              <p className='mt-2 text-small'>
                타인의 개인정보를 도용하여 회원가입을 한 경우, 타인의 계정정보를 도용하여 이용한 경우 회원자격 상실 및
                「개인정보 보호법」 등 관련 법령에 따라 처벌받을 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 8. 개인정보 보호책임자 및 정보주체의 권익침해 구제 방 */}
        <div className='mt-4'>
          <div>
            <h3 className='font-semibold text-primaryPrdName'>8. 개인정보 보호책임자 및 정보주체의 권익침해 구제 방</h3>
            <p className='mt-2 text-small'>
              회사는 정보주체의 개인정보를 보호하고 개인정보와 관련한 열람 청구 및 고충 처리를 위하여 다음과 같이
              개인정보 보호책임자를 지정하고 담당부서를 운영하고 있습니다.
            </p>
            <p className='mt-2 text-small'>
              개인정보 보호책임자:<span className='text-[#F14646] ml-1'>성명기재</span>
            </p>
            <p className='mt-2 text-small'>개인정보의 열람청구 및 고충처리 부서 정보보안실</p>
            <p className='mt-2 text-small'>
              연락처 <span className='text-[#F14646] ml-1'>연락처기재</span>
            </p>

            <p className='mt-2 text-small'>
              이메일 <span className='text-[#F14646] mx-1'>메일기재</span> * 개인정보 관련 고충 처리 및 권익침해에 대한
              업무 외 요청은 처리하지 않습니다.
            </p>

            <p className='mt-2 text-small'>
              기타 개인정보 침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하실 수 있습니다.
            </p>

            <p className='mt-2 text-small'>
              개인정보침해신고센터 <span className='mx-1'>http://privacy.kisa.or.kr</span> (국번없이)118
            </p>

            <p className='mt-2 text-small'>
              개인정보분쟁조정위원회 <span className='mx-1'>http://kopico.go.kr</span> 1833-6972
            </p>

            <p className='mt-2 text-small'>
              경찰청 사이버수사국 <span className='mx-1'>https://ecrm.police.go.kr</span> (국번 없이) 182
            </p>
            <p className='mt-2 text-small'>
              대검찰청 사이버수사과 <span className='mx-1'>https://www.spo.go.k</span> (국번없이) 1301
            </p>
          </div>
        </div>

        {/* 9. 개인정보 자동 수집 장치의 설치·운영 및 거부방법 */}
        <div className='mt-4'>
          <div>
            <h3 className='font-semibold text-primaryPrdName'>9. 개인정보 자동 수집 장치의 설치·운영 및 거부방법</h3>
            <p className='mt-2 text-small'>
              회사는 정보주체에게 개별적인 서비스와 편의를 제공하기 위해 이용정보를 저장하고 수시로 불러오는
              ‘쿠키(cookie)’를 사용합니다.
            </p>

            <p className='mt-2 text-small'>
              쿠키는 웹사이트 운영에 이용되는 서버가 정보주체의 인터넷 브라우저에 보내는 소량의 정보이며 정보주체의 PC
              또는 모바일에 저장됩니다.
            </p>

            <p className='mt-2 text-small'>
              정보주체는 웹 브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의 설정을 할 수 있습니다. 다만, 쿠키 저장을
              거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
            </p>

            <ol className='list-decimal pl-6 flex flex-col gap-2 mt-2 text-small'>
              <li>
                <p>웹 브라우저에서 쿠키 허용/차단</p>
                <div>
                  <ul className='list-[lower-alpha] pl-6'>
                    <li>크롬(Chrome) : 웹 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt; 인터넷 사용 기록 삭제</li>
                    <li className='mt-2'>
                      엣지(Edge) : 웹 브라우저 설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 사이트 데이터 관리 및 삭제
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <p>모바일 브라우저에서 쿠키 허용/차단</p>
                <div>
                  <ul className='list-[lower-alpha] pl-6'>
                    <li>크롬(Chrome) : 모바일 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt; 인터넷 사용 기록 삭제</li>
                    <li className='mt-2'>
                      사파리(Safari) : 모바일 기기 설정 &gt; 사파리(Safari) &gt; 고급 &gt; 모든 쿠키 차단
                    </li>
                    <li className='mt-2'>
                      삼성 인터넷 : 모바일 브라우저 설정 &gt; 인터넷 사용 기록 &gt; 인터넷 사용 기록 삭제
                    </li>
                  </ul>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* 10. 행태정보의 수집·이용·제공 및 거부방법 */}
        <div className='mt-4'>
          <div>
            <h3 className='font-semibold text-primaryPrdName'>10. 행태정보의 수집·이용·제공 및 거부방법</h3>

            <div className='mt-4 flex flex-col gap-4'>
              {/* 10.1 */}
              <div>
                <h3 className='font-semibold text-normal'>10.1. 행태정보의 처리</h3>
                <p className='mt-2 text-small'>
                  회사는 서비스 이용과정에서 정보주체에게 최적화된 맞춤형 서비스 및 혜택, 온라인 맞춤형 광고 등을
                  제공하기 위하여 개인을 식별하지 않고 행태정보를 수집·이용하고 있으며 다음과 같이 행태정보를
                  수집합니다.
                </p>
                <div className='flex flex-col gap-2 mt-2 semibold text-small'>
                  <Table className='custom-table' columns={columns5} dataSource={data5} pagination={false} />
                </div>
                <p className='mt-2 text-small'>
                  회사는 온라인 맞춤형 광고 등에 필요한 최소한의 행태정보만을 수집하며, 사상, 신념, 가족 및 친인척관계,
                  학력·병력, 기타 사회활동 경력 등 개인의 권리·이익이나 사생활을 뚜렷하게 침해할 우려가 있는 민감한
                  행태정보를 수집하지 않습니다.
                </p>

                <p className='mt-2 text-small'>회사는 만 14세 미만 아동의 행태정보를 처리하지 않습니다.</p>
              </div>

              {/* 10.2 */}
              <div>
                <h3 className='font-semibold text-normal'>10.2. 행태정보의 통제권 행사 및 권익침해 구제 방법</h3>
                <ol className='list-decimal pl-6 flex flex-col gap-2 mt-2 text-small'>
                  <li>
                    <p>
                      정보주체는 웹브라우저의 쿠키 설정 변경 등을 통해 온라인 맞춤형 광고를 일괄적으로 차단·허용할 수
                      있습니다. 다만, 쿠키 설정 변경은 웹사이트 자동로그인 등 일부 서비스의 이용에 영향을 미칠 수
                      있습니다
                    </p>

                    <p className='mt-2'>웹브라우저를 통한 맞춤형 광고 차단/허용</p>
                    <p className='mt-2'>
                      Chrome 웹 브라우저 오른쪽 상단의 더보기 &gt; 설정 &gt; 개인정보 보호 및 보안 &gt; 인터넷 사용기록
                      삭제웹 브라우저 오른쪽 상단의 더보기 &gt; 설정 &gt; 개인정보 보호 및 보안&gt; 서드파티쿠키 &gt;
                      서드파티쿠키 차단
                    </p>
                    <p className='mt-2'>
                      Microsoft Edge 웹 브라우저 오른쪽 상단의 설정 및 기타 &gt; 설정 &gt; 개인정보, 검색 및 서비스 &gt;
                      추적방지 &gt; InPrivate를 검색할 때 항상 “엄격” 추적 방지 사용
                    </p>

                    <p className='mt-2'>
                      Safari Safari &gt; 환경설정 &gt; 개인 정보 보호 &gt; 쿠키 및 웹 사이트 데이터
                    </p>

                    <p className='mt-2'>※ 웹브라우저 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다</p>
                  </li>
                  <li>
                    <p>
                      정보주체는 "8. 개인정보 보호책임자 및 정보주체의 권익침해 구제 방법"에서 안내하는 개인정보
                      보호책임자에게 서면, 전화 또는 이메일을 통해서 행태정보와 관련하여 궁금한 사항과 거부권 행사, 피해
                      신고 접수 등을 문의할 수 있습니다.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* 11. 개인정보 처리방침의 변경 및 고지*/}
        <div className='mt-4'>
          <div>
            <h3 className='font-semibold text-primaryPrdName'>11. 개인정보 처리방침의 변경 및 고지</h3>
            <p className='mt-2 text-small'>
              개인정보 처리방침은 정부의 정책 및 법령 또는 회사의 방침 변경에 따라 내용의 추가, 삭제 및 수정이 있을 수
              있습니다.
            </p>

            <p className='mt-2 text-small'>
              개인정보 처리방침을 변경하는 경우 회사는 홈페이지를 통해 공지하고, 정보주체가 언제든지 변경된 사항을 쉽게
              알아볼 수 있도록 조치하겠습니다.
            </p>

            <ul className='pl-4 text-small mt-2'>
              <li>- 개인정보 처리방침 고지일자 : 2024년 12월 1일</li>
              <li className='mt-2'>- 개인정보 처리방침 시행일자 : 2024년 12월 1</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
