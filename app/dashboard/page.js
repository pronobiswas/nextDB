'use client'
import React, { useState } from 'react'
import DashBoardAside from '../_component/dashboardComponent/dashBoardAside'
import DashboardContent from '../_component/dashboardComponent/dashboardContent'

export default function page() {
  const [activeSegment , setActiveSegment] = useState('')
  return (
    <div id="dashboard" className='p-5'>
      <div className='wrapper w-full h-full min-h-[calc(100vh-270px)] flex gap-5'>
        <aside className='w-1/6 border'>
          <aside className='w-full h-full  bg-[gray]'>
        <nav className='min-h-[calc(100vh-270px)] flex flex-col gap-6'>
          {/* ===home== */}
          <div className='flex p-2'>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D9D9D9"><path d="M480-427ZM240-120q-50 0-85-35t-35-85v-240q0-24 9-46t26-39l240-240q17-18 39.5-26.5T480-840q23 0 45 8.5t40 26.5l240 240q17 17 26 39t9 46v240q0 50-35 85t-85 35H240Zm0-80h480q17 0 28.5-11.5T760-240v-240q0-8-3-15t-9-13L595-662l-59 58 144 144v180H280v-180l258-258-30-30q-8-8-15.5-10t-12.5-2q-5 0-12.5 2T452-748L212-508q-6 6-9 13t-3 15v240q0 17 11.5 28.5T240-200Zm120-160h240v-67L480-547 360-427v67Z" /></svg>
            </span>
            <span>Home</span>
          </div>
          {/* ===app=== */}
          <div className='flex p-2'>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D9D9D9"><path d="M240-160q-33 0-56.5-23.5T160-240q0-33 23.5-56.5T240-320q33 0 56.5 23.5T320-240q0 33-23.5 56.5T240-160Zm240 0q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm240 0q-33 0-56.5-23.5T640-240q0-33 23.5-56.5T720-320q33 0 56.5 23.5T800-240q0 33-23.5 56.5T720-160ZM240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400ZM240-640q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Zm240 0q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Zm240 0q-33 0-56.5-23.5T640-720q0-33 23.5-56.5T720-800q33 0 56.5 23.5T800-720q0 33-23.5 56.5T720-640Z" /></svg>
            </span>
            <span>services</span>
          </div>
          {/* ===users=== */}
          <div className='flex p-2'>
            <span>user</span>
          </div>
          {/* ===store=== */}
          <div className='flex p-2'>
            <span>store</span>
          </div>
        </nav>
      </aside>
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
