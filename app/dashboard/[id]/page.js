'use client';
import React from 'react';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/user/getSingleUser?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUserData(data);
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
    if (id) {
      fetchData(); 
    }
  }, [id]);

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Dashboard</h1>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
}
