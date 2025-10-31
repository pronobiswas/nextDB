import React from 'react'
import DashBoardAside from '../_component/dashboardComponent/dashBoardAside'
import DashboardContent from '../_component/dashboardComponent/dashboardContent'

export default function page() {
  return (
    <div id="dashboard" className='p-5'>
      <div className='wrapper w-full h-full min-h-[calc(100vh-270px)] flex gap-5'>
        <aside className='w-1/6 border'>
          <DashBoardAside/>
        </aside>
        <section className='w-5/6 h-full text-white'>
          <div>
            <DashboardContent/>
          </div>
        </section>
      </div>
    </div>
  )
}
