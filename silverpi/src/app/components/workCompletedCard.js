"use client"
import Link from 'next/link'
import Image from 'next/image'

export default function WorkCompletedCard({title, description}) {
  return <>
        <div className="border-double border-2 border-neutral2 hover:border-secondary">
            <h1 className="text-neutral4 px-3 py-2">{title}</h1>
            <p className="px-3 pb-2">{description}</p>
        </div>
  </>
}