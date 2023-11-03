'use client'
// This is a mockup of the home 

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function ButtonPage() {
    return (
      <div>
        <h1>Dashboard test</h1>
        <p>This dashboard is in the home page, and this is purely for test. The real one will take its place and the href will be changed to /home/agreements for the Agreements button</p>
            <a href="/home/agreements">
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