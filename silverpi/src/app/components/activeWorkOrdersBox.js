"use client"
import React from "react"
import Link from 'next/link'
import ActiveWOCard from './activeWorkOrdersCard'
import { useState } from 'react';
import { set } from "zod"

function WOsCardList(woList) {
    const startIndex = 0
    const endIndex = 2
    woList = woList || []
    // have to take out the actual list since we are being returned an object with a woList value that points to the list
    // {
    //     woList: [x, x, x]
    // }

    let slicedList = woList.woList.slice(startIndex, endIndex)
    
    let arr = []
    {slicedList.map((wo, index) =>(
            arr.push(
                <ActiveWOCard 
                    title={"Example Title"}
                    // status={wo.status}
                    date={`${wo.requestedDate.slice(0, wo.requestedDate.indexOf('T'))}`}
                    description={wo.description}
                    wo={wo.workOrder}
                    key={index}
                />
            )
        )
    )}

    return(
        <> 
            <div className="border rounded-lg bg-neutral2 bg-opacity-5 border-neutral2 px-5 py-2">
                <div className="flex flex-row items-end">
                    <h1 className="pb-2 text-xl my-3 font-semibold">Active Workorders</h1>
                </div>
                <div>
                    {arr}
                </div>
                <div className="flex flex-row justify-end ml-auto">
                    <Link href="/home/workorders" className="font-bold leading-6 text-primary hover:underline">
                            See more
                    </Link>
                </div>
            </div>
        </>
    )
}

export default function ActiveWOBox(woList) {
  woList = woList || []
  // have to take out the actual list since we are being returned an object with a woList value that points to the list
  woList = woList.woList

  return (
    <>
      {woList.length === 0 ? (
        <div className="">
            <div className="rounded-md flex border border-neutral2 bg-neutral2 bg-opacity-5 justify-center">
                <h1 className="text-neutral3 text-xl m-10">No Active Work Orders Currently!</h1>
            </div>
        </div>
      ) : (
        <div className="">
          <WOsCardList woList={woList} />
        </div>
      )}
    </>
  );
}