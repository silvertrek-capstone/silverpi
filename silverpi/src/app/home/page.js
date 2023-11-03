'use client'
// This is a mockup of the home 

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'



const buttonCenter = {
    position: 'absolute',
    top: '500px', // Adjust the top position as needed
    left:'50%',
    //right: 0, // Adjust the right position as needed
    //margin: '0 auto',
    transform: 'translateX(-50%)',
  };

function ButtonPage() {
    return (
      <div>
        <div className="bg-grey px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-8xl font-bold tracking-tight text-gray-900 ">Dashboard</h1>
            </div>
        </div>
        <h1>Dashboard test</h1>
        <p>This dashboard is in the home page, and this is purely for test. The real one will take its place and the href will be changed to /home/agreements for the Agreements button</p>
            <a href="/home/agreements" style={buttonCenter}>
                <button type="button"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
                        hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                        focus-visible:outline-indigo-600">
                    Agreements
                </button>
            </a>

      </div>
    );
  }
  
    export default ButtonPage;