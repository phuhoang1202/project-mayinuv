// import Card from "components/card";
import Card from '../card'

const Widget = ({ icon, title, subtitle }) => {
  return (
    <Card extra='!flex-row flex-grow items-center rounded-[20px] h-[100px]'>
      <div className='ml-4  flex w-auto flex-row items-start'>
        <div className='rounded-full '>
          <span className='flex items-center text-brand-500'>{icon}</span>
        </div>
      </div>

      <div className='  ml-4 flex w-auto flex-col justify-start'>
        <p className='font-medium text-min text-[#8C8C8C]'>{title}</p>
        <h4 className='text-xl font-bold text-navy-700'>{subtitle}</h4>
      </div>
    </Card>
  )
}

export default Widget
