import getAllpost from '@/lib/featchapi'
import Link from 'next/link';
import React from 'react'

export default async function page() {
    const AllPost = await getAllpost();
    return (
        <div>
            <h3>get post from JSON placeholder</h3>
            <Link href='/posts/createPost' className='border px-5 py-2 mt-5 block w-fit'>create a new post</Link>
            <ul className='flex flex-wrap gap-5'>
                {
                    AllPost.map((item) => (
                        <li key={item.id} >
                            <Link href={`/posts/singlePost/${item.id}`}>
                            <div className='w-80 px-5 py-8 shadow-md cursor-pointer hover:shadow-lg'>
                                <h4>{item.title}</h4>
                                <p>{item.body}</p>
                            </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
