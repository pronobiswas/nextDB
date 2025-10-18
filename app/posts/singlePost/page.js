import getAllpost from '@/lib/featchapi'
import React from 'react'

export default async function page() {
    const data = await fetch('/api/users')
    const allUser = data.json;
    console.log(allUser);
    
    const AllPost = await getAllpost();
    const singlePost = Array.isArray(AllPost) && AllPost.length ? AllPost[0] : null;

    if (!singlePost) {
        return (
            <div>
                No post found
            </div>
        )
    }

    return (
        <div>
            <h1>{singlePost.title}</h1>
            <p>{singlePost.body}</p>
        </div>
    )
  return (
    <div>
        this is singlepost page
    </div>
  )
}
