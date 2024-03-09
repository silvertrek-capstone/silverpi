"use client"
import Link from 'next/link'
import Image from 'next/image'

export default function WorkCompletedCard({title, description, date, status, wo}) {
  return <>

        <div className="rounded-md border-double border border-neutral2 hover:border-secondary mb-2 bg-neutral2 bg-opacity-5">
            <h1 className="text-neutral3 px-3 py-2">
            {"Workorder: "}
              <Link href={`/home/workorders/${wo}`} className="text-primary font-bold hover:underline">
                {wo}
              </Link>
              <span className="text-neutral3 pl-10">{date}</span>
            </h1> 
            <p className="text-neutral3 px-3 pb-2">{description}</p>
        </div>
  </>
}