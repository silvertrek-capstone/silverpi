"use client"
import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import WorkCompletedCard from './workCompletedCard'
import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline"
import { set } from "zod"


function CompletedCardList(woCompletedList) {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);
    const [page, setPage] = useState(1);

    const handleFirst = () => {
        setStartIndex((prevStartIndex) => 0);
        setEndIndex((prevEndIndex) => 5);
        setPage((prevPage) => 1);
    }

    const handleLast = () => {
        setStartIndex((prevStartIndex) => woCompletedList.woCompletedList.length - 5);
        setEndIndex((prevEndIndex) => woCompletedList.woCompletedList.length);
        setPage((prevPage) => numPages);
    }

    const handleNext = () => {
        setStartIndex((prevStartIndex) => prevStartIndex + 5);
        setEndIndex((prevEndIndex) => prevEndIndex + 5);
        setPage((prevPage) => prevPage + 1);
    };
    
    const handlePrev = () => {
            setStartIndex((prevStartIndex) => prevStartIndex - 5);
            setEndIndex((prevEndIndex) => prevEndIndex - 5);
            setPage((prevPage) => prevPage - 1);
    };

    woCompletedList = woCompletedList || []
    // have to take out the actual list since we are being returned an object with a woCompletedList value that points to the list
    // {
    //     woCompletedList: [x, x, x]
    // }

    let slicedList = woCompletedList.woCompletedList.slice(startIndex, endIndex)
    const numPages = parseInt(woCompletedList.woCompletedList.length/5) +1

    let arr = []
    {slicedList.map((woComp, index) =>(
            arr.push(
                <WorkCompletedCard 
                    title={"Example Title"}
                    // status={woComp.status}
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
            <div className="border border-neutral2 p-5">
                <div className="flex flex-row items-end">
                    <h1 className="pb-2 lg:text-2xl md:text-2xl sm:text-xl text-neutral3">Recent Completed Work</h1>
                    <div className="ml-auto">
                        <button onClick={handleFirst} disabled={startIndex === 0} className="rounded-md active:bg-opacity-40 hover:bg-neutral2 hover:bg-opacity-10">
                            <ChevronDoubleLeftIcon className="font-bold text-neutral3 hover:text-neutral4 h-6 w-8"></ChevronDoubleLeftIcon>
                        </button>  
                        <button onClick={handlePrev} disabled={startIndex === 0} className="rounded-md active:bg-opacity-40 hover:bg-neutral2 hover:bg-opacity-10">
                            <ArrowLeftIcon className="font-bold text-neutral3 hover:text-neutral4 h-6 w-8"></ArrowLeftIcon>
                        </button>  
                        <button onClick={handleNext} disabled={endIndex >= woCompletedList.woCompletedList.length}className="rounded-md active:bg-opacity-40 hover:bg-neutral2 hover:bg-opacity-10">
                            <ArrowRightIcon className="font-bold text-neutral3 hover:text-neutral4 h-6 w-8"></ArrowRightIcon>
                        </button> 
                        <button onClick={handleLast} disabled={endIndex >= woCompletedList.woCompletedList.length} className="rounded-md active:bg-opacity-40 hover:bg-neutral2 hover:bg-opacity-10">
                            <ChevronDoubleRightIcon className="font-bold text-neutral3 hover:text-neutral4 h-6 w-8"></ChevronDoubleRightIcon>
                        </button> 
                    </div>  
                </div>
                <div>
                    {arr}
                </div>
                <div className="flex flex-row justify-center">
                    <h3>{`page ${page} of ${numPages}`}</h3>
                </div>
            </div>
        </>
    )
}

export default function WorkCompletedBox(woCompletedList) {
  woCompletedList = woCompletedList || []
  // have to take out the actual list since we are being returned an object with a woCompletedList value that points to the list
  woCompletedList = woCompletedList.woCompletedList
  

  return (
    <>
      {woCompletedList.length === 0 ? (
        <div className="lg:pr-20 md:pr-8">
            <div className="rounded-md flex border border-neutral2 bg-neutral2 bg-opacity-5 justify-center">
                <h1 className="text-neutral3 text-xl m-10">No recent work completed data found!</h1>
            </div>
        </div>
        
      ) : (
        <div className="lg:pr-20 md:pr-8">
          <CompletedCardList woCompletedList={woCompletedList} />
        </div>
      )}
    </>
  );
}