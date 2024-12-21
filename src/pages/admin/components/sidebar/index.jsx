import { HiX } from 'react-icons/hi'
import Links from './components/Links'
import routes from '../../../../routes'
import Group from '@assets/images/Group.svg'
import IconArrowLeftDouble from '@assets/images/IconArrowLeftDouble.svg'
import IconArrowRightDouble from '@assets/images/IconArrowRightDouble.svg'

const Sidebar = ({ open, onClose, isCollapsed, setIsCollapsed }) => {
  // Handle the collapse action
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={`sm:none duration-175 w-[18.313rem] linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 
     ${isCollapsed ? 'w-[6.25rem]' : 'w-[18.313rem]'}`}
    >
      {/* <span className='absolute top-4 right-4 block cursor-pointer xl:hidden' onClick={onClose}>
        <HiX />
      </span> */}

      <div className={`${isCollapsed ? 'flex flex-col gap-7' : 'flex mr-3 ml-7'} my-6 items-center justify-between`}>
        <div>
          <img src={Group} alt='logo' className={`${isCollapsed ? 'w-14 h-[38px]' : ''}`} />
        </div>

        <div>
          <img
            src={isCollapsed ? IconArrowRightDouble : IconArrowLeftDouble}
            alt='icon'
            onClick={handleCollapse}
            className='cursor-pointer'
          />
        </div>
      </div>

      {/* Pass isCollapsed to the Links component */}
      <ul className={`mb-auto pt-1 mt-10 ${isCollapsed ? 'block' : 'block'}`}>
        <Links routes={routes} isCollapsed={isCollapsed} />
      </ul>

      <div className='flex justify-center'></div>
    </div>
  )
}

export default Sidebar
