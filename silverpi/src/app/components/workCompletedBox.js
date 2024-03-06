"use client"
import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import WorkCompletedCard from './workCompletedCard'


function CompletedCardList(woCompletedList) {
    woCompletedList = woCompletedList || []
    // have to take out the actual list since we are being returned an object with a woCompletedList value that points to the list
    woCompletedList = woCompletedList.woCompletedList.slice(0, 5)

    console.log(woCompletedList)
    if(Array.isArray(woCompletedList)) {
        console.log("YEP, IT'S AN ARRAY")
    } else {
        console.log("NOPE, NOT AN ARRAY")
    }
    let arr = []
    {woCompletedList.map((woComp, index) =>(
            arr.push(
                <WorkCompletedCard 
                    title="title"
                    description="description"
                    key={index}
                />
            )
        )
    )}
    console.log("hello")

    return(
        <div>
            {arr}
        </div>
    )
}

export default function WorkCompletedBox(woCompletedList) {
  woCompletedList = woCompletedList || []
  // have to take out the actual list since we are being returned an object with a woCompletedList value that points to the list
  woCompletedList = woCompletedList.woCompletedList

  return <>
        <div className="border-double border-2 border-neutral2 hover:border-secondary">
            <CompletedCardList woCompletedList={woCompletedList} />
        </div>
  </>
}