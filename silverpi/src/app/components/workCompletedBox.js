"use client"
import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import WorkCompletedCard from './workCompletedCard'
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"


function CompletedCardList(woCompletedList) {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);

    const handleNext = () => {
        setStartIndex((prevStartIndex) => prevStartIndex + 5);
        setEndIndex((prevEndIndex) => prevEndIndex + 5);
    };
    
    const handlePrev = () => {
            setStartIndex((prevStartIndex) => prevStartIndex - 5);
            setEndIndex((prevEndIndex) => prevEndIndex - 5);
    };

    woCompletedList = woCompletedList || []
    // have to take out the actual list since we are being returned an object with a woCompletedList value that points to the list
    // {
    //     woCompletedList: [x, x, x]
    // }

    let slicedList = woCompletedList.woCompletedList.slice(startIndex, endIndex)

    let arr = []
    {slicedList.map((woComp, index) =>(
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
                <h1 className="pb-2 text-3xl text-neutral3">Recent Completed Work</h1>
                <div className="ml-auto">
                    <button onClick={handlePrev} disabled={startIndex === 0} className="rounded-md active:bg-opacity-40 hover:bg-neutral2 hover:bg-opacity-10">
                        <ArrowLeftIcon className="font-bold text-neutral3 hover:text-neutral4 h-6 w-8"></ArrowLeftIcon>
                    </button>  
                    <button onClick={handleNext} disabled={endIndex >= woCompletedList.woCompletedList.length}className="rounded-md active:bg-opacity-40 hover:bg-neutral2 hover:bg-opacity-10">
                        <ArrowRightIcon className="font-bold text-neutral3 hover:text-neutral4 h-6 w-8"></ArrowRightIcon>
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