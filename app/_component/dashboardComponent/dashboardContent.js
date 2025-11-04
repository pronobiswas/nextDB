'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserDetailsForm from './userDetailsForm';
import Image from 'next/image';
import UserList from './userList';

export default function DashboardContent() {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Always call useSelector at top level
  const userFromRedux = useSelector((state) => state.user.user);

  // Get user from localStorage
  const loggedInUserFromStorage = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.user
    : null;

  // Use Redux user if exists, otherwise localStorage user
  const currentUser = userFromRedux || loggedInUserFromStorage;

  if (!currentUser) {
    return <p>Please login to see your dashboard</p>;
  }

  const toggleUpdateForm = () => setShowUpdateForm((prev) => !prev);

  return (
    <div>
      {/* ===user details=== */}
      <div className="w-full h-fit flex items-end gap-8 border p-4 text-white">
        <div className="w-40 h-40 bg-amber-200 rounded-full p-2">
          {currentUser.picture?.secure_url ? (
            <img
              src={currentUser.picture.secure_url}
              alt="User profile"
              width='160'
              height='160'
              className="rounded-full"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-500 rounded-full flex items-center justify-center text-white">
              No Image
            </div>
          )}
        </div>

        <div>
          <p><span>User Name: </span>{currentUser.name}</p>
          <p><span>User Email: </span>{currentUser.email}</p>
          <p><span>User Role: </span>{currentUser.role || 'User'}</p>
          <button onClick={toggleUpdateForm} className="border py-1 px-3 mt-2">
            {showUpdateForm ? 'Close Form' : 'Update User'}
          </button>
        </div>

          {/* ============ VENDOR DASHBOARD FEATURES ============ */}
        <section>
          <div>
            <h2>VENDOR DASHBOARD FEATURES</h2>
            <h3>1. Vendor Overview</h3>
            <ul>
              <li>Today’s sales, total earnings</li>
              <li>Orders pending/shipped/completed</li>
              <li>Product performance summary</li>
              <li>Low stock alerts</li>
              <li>View all transactions</li>
            </ul>

            <h3>2. Product Management</h3>
            <ul>
              <li>Add/Edit/Delete products</li>
              <li>Manage inventory</li>
              <li>Discount management</li>
              <li>Low stock alerts</li>
              <li>Product status (Pending approval, Active, Rejected)</li>
            </ul>

            <h3>3. Orders</h3>
            <ul>
              <li>List of received orders</li>
              <li>Order status management</li>
              <li>Print packing slips/invoices</li>
              <li>Refunds/Returns requests</li>
              <li>Shipment tracking</li>
            </ul>
            
          </div>
        </section>
      </div>

      {/* =====update user form==== */}
      {showUpdateForm && (
        <section className="fixed top-0 left-0 w-full h-screen bg-[#02856f8f] p-12 z-10 flex items-center justify-center">
          <div className="wrapper w-full max-w-3xl bg-[#02856f] p-8 rounded">
            <UserDetailsForm currentUser={currentUser} />
            <button onClick={toggleUpdateForm} className="mt-4 border py-1 px-3">
              Close
            </button>
          </div>
        </section>
      )}
      <UserList />
    </div>
  );
}
