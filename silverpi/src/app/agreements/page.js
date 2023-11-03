'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'




const agreementsData = [
  {
    id: 1,
    title: 'Agreement 1',
    content: 'This is the content of Agreement 1.',
  },
  {
    id: 2,
    title: 'Agreement 2',
    content: 'This is the content of Agreement 2.',
  },
  // Add more agreements as needed
];

export default function Agreements() {
  return (
    <div>
      <h1>Agreements</h1>
      <ul>
        {agreementsData.map((agreement) => (
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