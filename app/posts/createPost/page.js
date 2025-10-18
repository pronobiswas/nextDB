'use client';
import React, { useState } from 'react';

export default function Page() {
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          author,
        }),
      });

      if (!res.ok) {
        alert('Failed to post');
        console.log(await res.text()); // Show server error message
        return;
      }

      alert('Post created!');
      setTitle('');
      setContent('');
      setAuthor('');
      setImage(null);
      handleGetPosts(); // Refresh posts after submission
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Handle fetching all posts
  const handleGetPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create a post here</h2>
      <div className="max-w-4xl mx-auto">
        <form className="flex flex-col gap-5 mb-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label>Post title</label>
            <input
              className="w-full max-w-md border p-1"
              type="text"
              placeholder="Enter post title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Post content</label>
            <input
              className="w-full max-w-md border p-1"
              type="text"
              placeholder="Enter post content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Post author name</label>
            <input
              className="w-full max-w-md border p-1"
              type="text"
              placeholder="Enter post author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Enter an image</label>
            <input
              className="w-full max-w-md border p-1"
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button className="border px-4 py-2" type="submit">
            Submit
          </button>
        </form>

        <div>
          <button className="px-8 py-2 border" onClick={handleGetPosts}>
            Get all posts
          </button>
        </div>

        <div className="mt-8">
          {posts.length > 0 && (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post._id} className="border p-2">
                  <h3 className="font-bold">{post.title}</h3>
                  <p>{post.content}</p> {/* Fixed: Changed from description to content */}
                  {post.image && (
                    <img src={post.image} alt={post.title} className="max-w-xs mt-2" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}