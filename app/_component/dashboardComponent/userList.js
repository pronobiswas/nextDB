'use client'
import React from 'react'

export default function UserList() {
    const [users, setUsers] = React.useState([])
    const allUsers = async ()=>{
        const res = await fetch('api/user/getAllUser');
        const data = await res.json();
        setUsers(data.users);
    }
    
  return (
    <div>
        <h2>User List</h2>
        <button onClick={allUsers}>Fetch Users</button>
        <ul className='flex flex-col gap-2 py-5'>
            {users.map(user => (
                <li key={user.id} className='border px-2 py-1'>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}
