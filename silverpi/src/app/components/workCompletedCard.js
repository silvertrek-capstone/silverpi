"use client"
import Link from 'next/link'
import Image from 'next/image'

export default function WorkCompletedCard({title, description, date, status, wo}) {
  return <>

        <div className="border-double border-2 border-neutral2 hover:border-secondary mb-2">
            <h1 className="text-neutral4 px-3 py-2">
              {title}
              <span className="pl-10">{date}</span>
              <span className="pl-10">Status: {status}</span>
            </h1> 
            <h2 className="text-neutral4 px-3 py-2">
              {"Workorder: "}
              <Link href={`/home/workorders/${wo}`} className="text-primary hover:underline">
                {wo}
              </Link>
            </h2>
            
            <p className="px-3 pb-2">{description}</p>
        </div>
  </>
}