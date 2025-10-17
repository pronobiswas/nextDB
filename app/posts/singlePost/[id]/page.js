import getAllpost from '@/lib/featchapi';
import React from 'react';

export default async function Page({ params }) {
  const { id } = params;
  const allPosts = await getAllpost();
  const post = allPosts.find((item) => String(item.id) === String(id));

  if (!post) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold text-red-600">Post Not Found</h2>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      <p className="text-gray-600">{post.body}</p>
    </div>
  );
}
