'use client';
import { setUser } from '@/app/redux/features/userSlice';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function UserDetailsForm({ currentUser }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    role: currentUser.role || '',
    profileImage: null,
  });

  const [preview, setPreview] = useState(currentUser.profileImage || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === 'profileImage' && files && files[0]) {
      const file = files[0];
      setError('');
      // Revoke old preview URL if it exists
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }

      setForm({ ...form, profileImage: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [id]: value });
    }
  };
  // =====handle submit=====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    let imageUrl = currentUser.profileImage || '';
    let imageData = currentUser.profileImage || '';

    // Upload image to Cloudinary if new file is selected
    if (form.profileImage instanceof File) {
      console.log('Uploading file:', form.profileImage.name);
      // ===covert input valu -n formdata====
      const data = new FormData();
      data.append('file', form.profileImage);
      data.append('upload_preset', 'humkiHobe');
      data.append('folder', 'humkiHobe');

      try {
        // ===upload image on cloudinary====
        const res = await fetch('https://api.cloudinary.com/v1_1/daziiakbl/image/upload', {
          method: 'POST',
          body: data,
        });
        if (!res.ok) {
          throw new Error(`Upload failed with status ${res.status}`);
        }
        const cloudData = await res.json();
        if (cloudData.secure_url) {
          imageUrl = cloudData.secure_url;
          imageData = cloudData;
        } else {
          throw new Error('No URL returned from Cloudinary');
        }
      } catch (err) {
        console.error('Cloudinary upload failed:', err);
        setError(`Upload failed: ${err.message}`);
        setLoading(false);
        return;
      }
    }

    // Send form data + Cloudinary URL to backend
    const userData = {
      name: form.name,
      email: form.email,
      role: form.role,
      picture: imageData,
    };

    try {
      const res = await fetch('/api/auth/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error(`Failed to update user: ${res.statusText}`);
      }

      const data = await res.json();
      dispatch(setUser(data));
      console.log('User update response:', data);

    } catch (error) {
      console.error('Error updating user:', error);
    }


    console.log('User data to save:', userData);

    // TODO: Send userData to your backend

    // await fetch('/api/users', { method: 'POST', body: JSON.stringify(userData) });

    setLoading(false);
    alert('Profile updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-3xl flex flex-col gap-3'>
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          {error}
        </div>
      )}
      {/* ===username=== */}
      <div>
        <label htmlFor='name' className='block text-sm font-medium mb-1'>
          Name
        </label>
        <input
          id='name'
          value={form.name}
          onChange={handleChange}
          placeholder='Name'
          className='border p-2 w-full rounded'
          required
        />
      </div>
      {/* ===user email=== */}
      <div>
        <label htmlFor='email' className='block text-sm font-medium mb-1'>
          Email
        </label>
      <input
        id='email'
        type='email'
        value={form.email}
        onChange={handleChange}
        placeholder='Email'
        className='border p-2 w-full rounded'
        required
      />
      </div>
      {/* ===user role=== */}
     


      <input
        id='role'
        value={form.role}
        onChange={handleChange}
        placeholder='Role'
        className='border p-2 w-full rounded'
        required
      />

      <div>
        <label htmlFor='profileImage' className='block text-sm font-medium mb-1'>
          Profile Image
        </label>
        <input
          type='file'
          id='profileImage'
          accept='image/*'
          onChange={handleChange}
          className='border p-2 w-full rounded'
        />
      </div>

      {preview && (
        <div>
          <p className='text-sm text-gray-600 mb-2'>Preview:</p>
          <img
            src={preview}
            className='w-32 h-32 object-cover rounded-lg border-2'
            alt='Profile preview'
          />
        </div>
      )}

      <button
        type='submit'
        disabled={loading}
        className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed'
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}