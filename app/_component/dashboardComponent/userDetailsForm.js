'use client';
import React, { useState } from 'react';

export default function UserDetailsForm({ currentUser }) {
  const [form, setForm] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    role: currentUser.role || '',
    profileImage: null,
  });

  const [preview, setPreview] = useState(currentUser.profileImage || '');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'profileImage' && files && files[0]) {
      const file = files[0];
      setForm({ ...form, profileImage: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [id]: value });
    }
    console.log(form);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = currentUser.profileImage || '';

    // 1️⃣ Upload image to Cloudinary if new file is selected
    if (form.profileImage instanceof File) {
      const data = new FormData();
      data.append('file', form.profileImage);
      data.append('upload_preset', 'user_uploads'); // unsigned preset
      data.append('folder', 'user_profiles'); // optional folder in Cloudinary

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/daziiakbl/image/upload', {
          method: 'POST',
          body: data,
        });
        const cloudData = await res.json();

        if (cloudData.secure_url) {
          imageUrl = cloudData.secure_url;
          console.log('Uploaded to Cloudinary:', imageUrl);
        } else {
          console.error('Cloudinary upload error:', cloudData);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Cloudinary upload failed:', err);
        setLoading(false);
        return;
      }
    }

    // 2️⃣ Send form data + Cloudinary URL to backend
    const userData = {
      name: form.name,
      email: form.email,
      role: form.role,
      profileImage: imageUrl,
    };

   

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col gap-3'>
      <input
        id='name'
        value={form.name}
        onChange={handleChange}
        placeholder='Name'
        className='border p-2 w-full'
      />
      <input
        id='email'
        value={form.email}
        onChange={handleChange}
        placeholder='Email'
        className='border p-2 w-full'
      />
      <input
        id='role'
        value={form.role}
        onChange={handleChange}
        placeholder='Role'
        className='border p-2 w-full'
      />
      <input
        type='file'
        id='profileImage'
        accept='image/*'
        onChange={handleChange}
        className='border p-2 w-full'
      />
      {preview && <img src={preview} className='w-32 h-32 object-cover mt-2' alt='Preview' />}
      <button type='submit' className='border py-1 px-3 mt-2'>
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
