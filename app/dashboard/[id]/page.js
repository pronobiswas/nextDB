'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import CategorySection from '@/app/_component/dashboardComponent/adminDashboard/categoryScetion';

export default function Page() {
  const { id } = useParams();
  const [userData, setUserData] = React.useState(null);
  const [userList, setUserList] = React.useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isVendor, setIsVendor] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // ====fetch single user====
  const fetchData = async () => {
    try {
      const res = await fetch(`/api/user/getSingleUser?id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        setUserData(data.user || data); // ✅ handle nested data
      } else {
        setError(data.error || "Error fetching user data");
      }
    } catch (error) {
      setError("Error fetching user data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) fetchData();
  }, [id]);

  // ====check user role====
  React.useEffect(() => {
    if (userData?.role) {
      setIsAdmin(userData.role === "admin");
      setIsVendor(userData.role === "vendor");
    }
  }, [userData]);

  // ====get all users====
  const getAllUsers = async () => {
    try {
      const res = await fetch(`/api/user/getAllUser`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        setUserList(data.users || []);
      } else {
        setError(data.error || "Error fetching all users");
      }
    } catch (error) {
      setError("Error fetching all users: " + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <div>
      <h1>User Dashboard</h1>

      <div>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
        <p>Role: {userData.role}</p>
      </div>

      {/* ===admin Section=== */}
      {isAdmin && (
        <div className='w-full border p-2 flex flex-col'>
          {/* ====user management==== */}
          <div className='border p-2 mt-4'>
            <p>Manage Users</p>
            <div>
              <button onClick={getAllUsers} className='border px-2 mt-2'>
                Get all users
              </button>
            </div>

            {userList.length > 0 && (
              <ul className='mt-2'>
                {userList.map((user) => (
                  <li key={user._id}>
                    {user.name} - {user.email} ({user.role})
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* ===create category Section=== */}
          <div className='border p-2 mt-4 flex gap-12'>
            <CategorySection />
          </div>
        </div>
      )}

      {/* ===vendor Section=== */}
      {isVendor && (
        <div className='p-2 mt-4'>
          <p>Manage Store</p>
        </div>
      )}
    </div>
  );
}
