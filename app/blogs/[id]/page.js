import React from 'react'
import { blogs } from '../blogdata';
import { notFound } from 'next/navigation';

export default function page({params}) {
    const {id} = params;
    const blog = blogs.find((item) => item.id === parseInt(id));
    
    if (!blog){
        notFound()
    }
  return (
    <div>
        <h2>{blog.id}</h2>
        <h3>{blog.title}</h3>
        <p>{blog.desc}</p>
    </div>
  )
}
