import Link from 'next/link';
import React from 'react'
import {blogs} from './blogdata'

export default function blogpage() {
    
  return (
    <div>
        <h1>This is blog page</h1>
        <ul className='flex flex-col gap-6'>
            {blogs.map((blog)=>(
                <li key={blog.id}>
                    <Link href={`/blogs/${blog.id}`}>
                    <h4>{blog.title}</h4>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}
