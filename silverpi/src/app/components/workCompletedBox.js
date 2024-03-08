"use client"
import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import WorkCompletedCard from './workCompletedCard'
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"



function CompletedCardList(woCompletedList) {
    woCompletedList = woCompletedList || []
    // have to take out the actual list since we are being returned an object with a woCompletedList value that points to the list
    woCompletedList = woCompletedList.woCompletedList.slice(0, 10)

    let arr = []
    {woCompletedList.map((woComp, index) =>(
            arr.push(
                <WorkCompletedCard 
                    title={"Example Title"}
                    status={woComp.status}
                    date={`${woComp.date.slice(0, woComp.date.indexOf('T'))}`}
                    description={woComp.description}
                    wo={woComp.workOrder}
                    key={index}
                />
            )
        )
    )}

    return(
        <>  
        <div className="flex flex-row items-end">
            <h1 className="text-3xl text-neutral3">Recent Completed Work</h1>
            <div className="ml-auto">
                <button className="rounded-md active:bg-opacity-40 hover:bg-neutral2 hover:bg-opacity-10">
                    <ArrowLeftIcon className="text-neutral3 hover:text-neutral4 h-8 w-8"></ArrowLeftIcon>
                </button>  
                <button className="rounded-md active:bg-opacity-40 hover:bg-neutral2 hover:bg-opacity-10">
                    <ArrowRightIcon className="text-neutral3 hover:text-neutral4 h-8 w-8"></ArrowRightIcon>
                </button>  
            </div>  
        </div>
        <div>
            {arr}
        </div>
        </>
    )
}

export default function WorkCompletedBox(woCompletedList) {
  woCompletedList = woCompletedList || []
  // have to take out the actual list since we are being returned an object with a woCompletedList value that points to the list
  woCompletedList = woCompletedList.woCompletedList

  return <>
        <div className="lg:pr-20 md:pr-8">
            <CompletedCardList woCompletedList={woCompletedList} />
        </div>
  </>
}