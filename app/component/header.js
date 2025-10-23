import Link from 'next/link'
import React from 'react'

export default function Header() {
  
  return (
   <header>
    <nav className="w-full h-fit p-5 border flex justify-between gap-12">
      <div className='flex items-center gap-10'>
          <span>logo</span>
          <ul className="flex gap-5">
            <li><Link href={'/'}>home</Link></li>
            <li><Link href={'/about'}>about</Link></li>
            <li><Link href={'/blogs'}>blogs</Link></li>
            <li><Link href={'/posts'}>Posts</Link></li>
          </ul>
      </div>
          <div>
            <Link href={'/auth/signin'}>
            <div className='py-2 px-4 border'>log in</div>
            </Link>

          </div>
        </nav>
   </header>
  )
}
