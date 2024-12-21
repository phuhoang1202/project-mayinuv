import React from 'react'
import IconLogoutFill from '@assets/images/IconLogoutFill.svg'
import IconArrowRightFill from '@assets/images/IconArrowRightFill.svg'
import { Switch } from 'antd'

export default function SettingFeature() {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`)
  }
  return (
    <div className='max-w-7xl mx-auto mt-24'>
      <div className='lg:w-[624px] w-full'>
        <div>
          <h3 className='font-bold text-primaryPrdName text-[#3B3B3B]'>서비스 이용 설정을 변경할 수 있습니다.</h3>
        </div>

        <div className='mt-6 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div className='font-medium text-normal text-[#000000]'>정보 메일 수신 여부</div>
            <Switch defaultChecked onChange={onChange} />
          </div>

          <div className='flex items-center justify-between'>
            <div className='font-medium text-normal text-[#000000]'>정보 메일 수신 여부</div>
            <Switch defaultChecked onChange={onChange} />
          </div>

          <div className='flex items-center justify-between'>
            <div className='font-medium text-normal text-[#000000]'>정보 메일 수신 여부</div>
            <Switch defaultChecked onChange={onChange} />
          </div>
        </div>

        <div className='flex items-center justify-between bg-[#F8F8F8] h-11 px-[10px] rounded-lg mt-14'>
          <div className='flex items-center gap-2'>
            <img src={IconLogoutFill} alt='icon' />
            <div className='font-medium text-normal text-[#3B3B3B]'>제품에 대해 물어보세요</div>
          </div>

          <div>
            <img src={IconArrowRightFill} alt='icon' />
          </div>
        </div>
      </div>
    </div>
  )
}
