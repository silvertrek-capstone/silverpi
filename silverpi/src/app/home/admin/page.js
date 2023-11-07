'use client'

// Base Imports from Login
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

// Process for changing this later (need stuff to be passed in)
var adminName = "John";

export default function AdminPanel() {
    const [email, setEmail] = useState('')              // State and Update component for the user emails
    const [password, setPassword] = useState('')        // State and Update component for the user Passwords
    const router = useRouter()                          // Routing hook for page interactions
    
    const [users, setUsers] = useState([                // Create Dummy data for Visual purposes (will add fetching later)      
        { id: 1, name: 'Richard Johnson', email: 'richjohnson@gmail.com' },
        { id: 2, name: 'Christian Pulisic', email: 'dortmundfan19@yahoo.com' },
        { id: 3, name: 'Smith Rivers', email: 'gamerlord42@aol.com' },
    ]);
    const [pendingUsers, setPendingUsers] = useState([
        { id: 1, name: 'Richard Johnson', email: 'richjohnson@gmail.com' },
        { id: 2, name: 'Christian Pulisic', email: 'dortmundfan19@yahoo.com' },
    ]);

    return (
        
        /* 
        Order of Implementation (so far)

        Silvertrek Icon
        General Text
        Admin Login Display
        Interactive Tables tied to users (to be routed to user page later)
        
        Note: padding added to even layout

        */
        <div className="min-h-screen bg-transparent p-8 pt-20 flex flex-col items-center"> 
            <img
                className="mx-auto h-12 w-auto -mt-10"
                src="/login.png"
                alt="Silver Trek Progress Inquries"
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
                {pendingUsers.map(user => ( // Clickable Users, to be routed to user page
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
                {users.map(user => ( // Clickable Users, to be routed to user page
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
