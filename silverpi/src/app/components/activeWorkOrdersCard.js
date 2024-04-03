"use client"
import Link from 'next/link'

export default function ActiveWOCard({title, description, date, status, wo}) {
  // Split the date string into an array of year, month, and day components
  const [year, month, day] = date.split('-');

  return <>
        <div className="rounded-md border-double border border-neutral2 hover:border-secondary mb-2 bg-neutral2 bg-opacity-10">
          <div className="flex px-3 py-2">
            <span className="text-neutral4 font-bold pl-2">{"WO#  "}</span>
              <Link href={`/home/workorders/${wo}`} className="text-primary font-bold hover:underline pl-1">
                {wo}
              </Link>
            <span className="items-end text-neutral3 text-opacity-50 font-semibold text-xssm italic ml-auto">{`Requested Date: ${month}/${day}/${year}`}</span>
          </div>
          <p className="text-neutral4 font-semibold text-sm px-3 pb-2 pl-5 pb-3">{description}</p>
        </div>
  </>
}