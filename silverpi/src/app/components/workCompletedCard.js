"use client"
import Link from 'next/link'
import Image from 'next/image'

export default function WorkCompletedCard({title, description, date, status, wo}) {
  // Split the date string into an array of year, month, and day components
  const [year, month, day] = date.split('-');

  return <>

        <div className="rounded-md border-double border border-neutral2 hover:border-secondary mb-2 bg-neutral2 bg-opacity-10">
          <div className="flex px-3 py-2">
            <span className="text-neutral4 font-bold">{"WO#  "}</span>
              <Link href={`/home/workorders/${wo}`} className="text-primary font-bold hover:underline pl-1">
                {wo}
              </Link>
            <span className="items-end text-neutral3 text-opacity-50 font-bold text-xssm italic ml-auto">{`Created on ${month}/${day}/${year}`}</span>
          </div>
              
            <p className="text-neutral3 px-3 pb-2">{description}</p>
        </div>
  </>
}