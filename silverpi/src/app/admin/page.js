'use client'

// Standard page.js imports (ref'd from login)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdministratorPage() {
  const router = useRouter()

  // Dummy Info to test visuals
  // Will add fetching data from tables and putting them into arrays later
  const pendingUsers = [
    {id: '1', name: 'Richard Johnson', email: 'richjohnson@gmail.com'},
    {id: '2', name: 'Christian Pulisic', email: 'dortmundfan19@yahoo.com'},
  ]

  const allUsers = [
    {id: '1', name: 'Richard Johnson', email: 'richjohnson@gmail.com'},
    {id: '2', name: 'Christian Pulisic', email: 'dortmundfan19@yahoo.com'},
    {id: '3', name: 'Smith Rivers', email: 'gamerlord42@aol.com'},
  ]

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900"> {/* Dark Background color for the admins */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        {/* Initialize Custom Icon and Center it*/}
        <img
          className="mx-auto h-12 w-auto"
          src="/login.png" 
          alt="Silver Trek Progress Inquries"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
          Welcome Admin
        </h2>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-200">
            Admin Panel
          </h1>
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-200"> 
            Pending Users
          </h2>
          {/* Draw Table Rows, Columns, and Borders for the pending users */}
          <table className="min-w-full divide-y divide-gray-600 border border-white"> 
            <thead>
              <tr>
                <th className="py-2 px-4 text-gray-200 border border-white">id</th> 
                <th className="py-2 px-4 text-gray-200 border border-white">name</th> 
                <th className="py-2 px-4 text-gray-200 border border-white">email</th> 
              </tr>
            </thead>
            <tbody>
                {/* Add Clickable for users (will redirect to diff pages) */}
              {pendingUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-700 cursor-pointer" onClick={() => router.push(`/home/user/${user.id}`)}>
                  <td className="py-2 px-4 text-gray-200 border border-white">{user.id}</td> 
                  <td className="py-2 px-4 text-gray-200 border border-white">{user.name}</td> 
                  <td className="py-2 px-4 text-gray-200 border border-white">{user.email}</td> 
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-200"> 
            All Users
          </h2>
          {/* Draw Table Rows, Columns, and Borders for all the users*/}
          <table className="min-w-full divide-y divide-gray-600 border border-white"> 
            <thead>
              <tr>
                <th className="py-2 px-4 text-gray-200 border border-white">id</th> 
                <th className="py-2 px-4 text-gray-200 border border-white">name</th> 
                <th className="py-2 px-4 text-gray-200 border border-white">email</th> 
              </tr>
            </thead>
            <tbody>
                {/* Add Clickable for users (will redirect to diff pages) */}
              {allUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-700 cursor-pointer" onClick={() => router.push(`/home/user/${user.id}`)}>
                  <td className="py-2 px-4 text-gray-200 border border-white">{user.id}</td> 
                  <td className="py-2 px-4 text-gray-200 border border-white">{user.name}</td> 
                  <td className="py-2 px-4 text-gray-200 border border-white">{user.email}</td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
