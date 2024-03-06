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

    return(
        <div>
            {woCompletedList.map((woComp, index) =>(
                    <>
                        <WorkCompletedCard 
                            title = "Hello"
                            description = "description lorem ipsum dolor sit emet"
                            key={index}
                        />
                    </>  
                )
            )}
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