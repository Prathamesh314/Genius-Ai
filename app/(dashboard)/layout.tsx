import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import React from 'react'

const DashboardLayout = ({
    children,
}:{children: React.ReactNode}) => {
  return (
    <div className='h-full relative'>
        <div className='hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 md:w-72'>
            <SideBar/>
        </div>
        <main className='md:pl-72'>
          <NavBar/>
          {children}
        </main>
    </div>
  )
}

export default DashboardLayout