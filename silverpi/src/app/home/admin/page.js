
// src/app/home/admin/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        
        const response = await fetch('/api/admin/getAllUsers', { // Contact route file and make post command
          method: "POST"
        });
        const data = await response.json();
        if (data.error){
          throw new Error(data.error);
        }
        console.log(data);
        setUsers(data.data); // Set users with data fetched from route file

        const secondResponse = await fetch('/api/admin/getPendingUsers', { // Contact route file and make post command
          method: "POST"
        });
        const data2 = await secondResponse.json();
        if (data2.error){
          throw new Error(data2.error);
        }
        console.log(data2);
        setPendingUsers(data2.data); // Set users with data fetched from route file

      } catch (error) {
        console.error('Failed to load users:', error);
      }
    }

    loadUsers();
  }, []);

  //const [users, setUsers] = useEffect(); // Initialize users as an empty array

  console.log("1")                         // Debug Prints
  console.log(users)
    
  const adminName = "Admin Name"; // ADmin Name Placeholder

  return (
    <div className="min-h-screen bg-transparent p-8 pt-20 flex flex-col items-center">
      <img
        className="mx-auto h-12 w-auto -mt-10"
        src="/login.png"
        alt="Silver Trek Progress Inquiries"
      />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 p-8 -mt-4">Admin Panel</h1> 
          <p className="text-gray-600 p-2">Signed in as: {adminName}</p>
        </div>
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-700">Pending Users</h2>
          <div className="overflow-hidden rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-200 cursor-pointer" onClick={() => router.push(`/home/user/${user.id}`)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-semibold text-gray-700">All Users</h2>
          <div className="overflow-hidden rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-200 cursor-pointer" onClick={() => router.push(`/home/user/${user.id}`)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
