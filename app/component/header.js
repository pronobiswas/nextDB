import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
   <header>
    <nav className="w-full h-fit p-5 border flex gap-12">
          <span>logo</span>
          <ul className="flex gap-5">
            <li><Link href={'/'}>home</Link></li>
            <li><Link href={'/about'}>about</Link></li>
            <li><Link href={'/blogs'}>blogs</Link></li>
            <li><Link href={'/posts'}>Posts</Link></li>
          </ul>
        </nav>
   </header>
  )
}
