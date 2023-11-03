'use client'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
  } from '@heroicons/react/24/outline'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const buttonStyles = {
    position: 'absolute',
    top: '40px', // Adjust the top position as needed
    right: '60px', // Adjust the right position as needed
  };


//const navigation = [
//    {name 'Dashboard', href: '/home', icon: HomeIcon} 
//]


const agreements = agreementsData();

export default function Agreements() {
  return (
    <div>
        <a href="/home" style={buttonStyles}>
            <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
                hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center space-x-2"
            >
                <HomeIcon className="w-6 h-6" />
                <span>Dashboard</span>
            </button>
        </a>
        <div className="bg-grey px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-8xl font-bold tracking-tight text-gray-900 ">Agreements</h1>
            </div>
        </div>
        <h1>Agreements</h1>
        <ul>
            {agreements.map((agreement) => (
                <li key={agreement.id}>
                    <h3>{agreement.title}</h3>
                    <p>{agreement.content}</p>
                    <a href={`/agreements/${agreement.id}`}>View Agreement</a>
                </li>
            ))}
        </ul>
    </div>
    );
}

function agreementsData(){
    return [
        {
            id: 1,
            title: 'Agreement 1',
            content: 'This is the content of Agreement 1.',
        },
        {
            id: 2,
            title: 'Agreement 2',
            content: 'This is the content of Agreement 2.',
        }
    ];
}