import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from '@pages/admin/components/navbar'
import Sidebar from '@pages/admin/components/sidebar'
import routes from '../../../../routes'
import { getToken } from '@utils/auth'

export default function Admin(props) {
  const { ...rest } = props
  const location = useLocation()
  const [open, setOpen] = useState(true)
  const [currentRoute, setCurrentRoute] = useState('Main Dashboard')
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    window.addEventListener('resize', () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)))
  }, [])

  useEffect(() => {
    getActiveRoute(routes)
  }, [location.pathname])

  const getActiveRoute = (routes) => {
    let activeRoute = 'Main Dashboard'
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].layout + '/' + routes[i].path) !== -1) {
        setCurrentRoute(routes[i].name)
      }
    }
    return activeRoute
  }

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        if (prop.children) {
          return (
            <Route path={`/${prop.path}`} element={prop.component} key={key}>
              {prop.children.map((child, childKey) => {
                if (child.index) {
                  return <Route index element={child.component} key={`${key}-${childKey}`} />
                }
                return <Route path={child.path} element={child.component} key={`${key}-${childKey}`} />
              })}
            </Route>
          )
        }
        return <Route path={`/${prop.path}`} element={prop.component} key={key} />
      }
      return null
    })
  }

  document.documentElement.dir = 'ltr'
  return (
    <div className='flex h-full w-full'>
      {/* Pass down isCollapsed and setIsCollapsed */}
      <Sidebar open={open} onClose={() => setOpen(false)} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      {/* Navbar & Main Content */}
      <div className='h-full w-full bg-lightPrimary dark:!bg-navy-900'>
        {/* Main Content */}
        <main
          className={`mx-[12px] h-screen flex-none transition-all md:pr-2  ${
            isCollapsed ? 'ml-[132px]' : 'ml-[325px]'
          }`}
        >
          {/* Routes */}
          <div className='h-full'>
            <Navbar onOpenSidenav={() => setOpen(true)} brandText={currentRoute} {...rest} />
            <div className='pt-5s mx-auto mb-auto min-h-[84vh] p-2 md:pr-2'>
              <Routes>
                {getRoutes(routes)}
                <Route path='/' element={<Navigate to='/admin/manager-dashboard' replace />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
