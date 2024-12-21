import WeeklyRevenue from '@pages/admin/views/admin/default/components/WeeklyRevenue'
import TotalSpent from '@pages/admin/views/admin/default/components/TotalSpent'
import { IoMdHome } from 'react-icons/io'
import { IoDocuments } from 'react-icons/io5'
import { MdBarChart, MdDashboard } from 'react-icons/md'
import Widget from '@pages/admin/components/widget/Widget'
import { useEffect, useState } from 'react'
import { getPromotion } from '@services/admin/promotion'
import IconDashboard1 from '@assets/icons/admin/IconDashboard1.svg'
import IconDashboard2 from '@assets/icons/admin/IconDashboard2.svg'
import IconDashboard3 from '@assets/icons/admin/IconDashboard3.svg'
import IconDashboard4 from '@assets/icons/admin/IconDashboard4.svg'
import IconDashboard5 from '@assets/icons/admin/IconDashboard5.svg'
import IconDashboard6 from '@assets/icons/admin/IconDashboard6.svg'

const Dashboard = () => {
  const [totalPromotion, setTotalPromotion] = useState('')

  useEffect(() => {
    const fetchPromotionData = async () => {
      try {
        const response = await getPromotion()
        const { data } = response

        setTotalPromotion(data.length)
      } catch (error) {
        console.error('Error fetching promotion data:', error)
      }
    }

    fetchPromotionData()
  }, [])

  return (
    <div>
      {/* Card widget */}

      <div className='mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 items-center justify-center'>
        <Widget icon={<img src={IconDashboard1} />} title={'이번달 누적 매출액'} subtitle={'35.555.000'} />
        <Widget icon={<img src={IconDashboard2} />} title={'오늘자 판매 매출액'} subtitle={'12.836.000'} />
        <Widget icon={<img src={IconDashboard3} />} title={'오늘자 판매 건수'} subtitle={'30.454.000'} />
        <Widget icon={<img src={IconDashboard4} />} title={'총 회원수'} subtitle={'500.000'} />
        <Widget icon={<img src={IconDashboard5} />} title={'오늘 가입자수'} subtitle={'3.000'} />
        <Widget icon={<img src={IconDashboard6} />} title={'탈퇴 회원자수'} subtitle={'500'} />
      </div>

      {/* Charts */}

      <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2'>
        <TotalSpent />
        <WeeklyRevenue />
      </div>
    </div>
  )
}

export default Dashboard
