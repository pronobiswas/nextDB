'use client'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserDetailsForm from './userDetailsForm';

export default function DashboardContent() {
  const user = useSelector((state) => state.user.user);
  const loggedInUserFromStorage = JSON.parse(localStorage.getItem('loggedInUser') || '{}').user;
  const currentUser = user || loggedInUserFromStorage;

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  if (!currentUser) {
    return <p>Please login to see your dashboard</p>;
  }

  const toggleUpdateForm = () => setShowUpdateForm(prev => !prev);

  return (
    <div>
      {/* ===user details=== */}
      <div className='w-full h-fit flex items-end gap-8 border p-4 text-white'>
        <div className='w-40 h-40 bg-amber-200 rounded-full p-2'></div>
        <div>
          <p><span>User Name: </span>{currentUser.name}</p>
          <p><span>User Email: </span>{currentUser.email}</p>
          <p><span>User Role: </span>{currentUser.role || 'User'}</p>
          <button onClick={toggleUpdateForm} className='border py-1 px-3 mt-2'>
            {showUpdateForm ? 'Close Form' : 'Update User'}
          </button>
        </div>
      </div>

      {/* =====update user form==== */}
      {showUpdateForm && (
        <section className='fixed top-0 left-0 w-full h-screen bg-[#02856f8f] p-12 z-10 flex items-center justify-center'>
          <div className='wrapper w-full max-w-3xl bg-[#02856f] p-8 rounded'>
            <UserDetailsForm currentUser={currentUser} />
            <button onClick={toggleUpdateForm} className='mt-4 border py-1 px-3'>
              Close
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
