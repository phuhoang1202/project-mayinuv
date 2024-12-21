import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import DashIcon from '@pages/admin/components/icons/DashIcon'

export function SidebarLinks({ routes, isCollapsed }) {
  // Nhận props isCollapsed
  let location = useLocation()

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName)
  }

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.layout === '/admin' || route.layout === '/auth' || route.layout === '/rtl') {
        return (
          <Link key={index} to={route.layout + '/' + route.path} className='flex items-center justify-center px-10'>
            <div
              className={`${
                activeRoute(route.path) ? 'bg-[#D9D6FF] text-[#5B4DFB]' : 'text-[#707070]'
              } relative mb-4 flex hover:cursor-pointer h-10 w-60 rounded-lg ${
                isCollapsed ? 'justify-center' : 'justify-start'
              }`}
            >
              <li className='flex cursor-pointer items-center px-4' key={index}>
                <span>
                  {route.icon ? (
                    React.cloneElement(route.icon, { filled: activeRoute(route.path) })
                  ) : (
                    <DashIcon filled={activeRoute(route.path)} />
                  )}
                </span>

                {/* Ẩn/hiện text dựa vào isCollapsed */}
                {!isCollapsed && (
                  <p
                    className={`ml-2 text-normal flex items-center ${
                      activeRoute(route.path) ? 'font-medium text-[#5B4DFB] bg-[#D9D6FF]' : 'font-medium text-gray-600'
                    }`}
                  >
                    {route.name}
                  </p>
                )}
              </li>
            </div>
          </Link>
        )
      }
    })
  }

  return createLinks(routes)
}

export default SidebarLinks
