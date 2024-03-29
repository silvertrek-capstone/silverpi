"use client"
import React from "react"
import WorkCompletedCard from './workCompletedCard'
import { useState } from 'react';
import { set } from "zod"
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      primary: {
        main: "rgba(0, 33, 110, 0.9)"
      }
    }
  });

function CompletedCardList(woCompletedList) {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);

    const setIndexes = (page) => {
        setStartIndex((prevStartIndex) => (5*page)-5)
        setEndIndex((prevEndIndex) => 5*page)
    }

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
                    mb={index === slicedList.length - 1
                        ? false : true}
                />
            )
        )
    )}

    return(
        <> 
            <div className="border rounded-lg bg-neutral2 bg-opacity-5 border-neutral2 p-5">
                <div className="flex flex-row items-end">
                    <h1 className="pb-2 text-xl text-neutral3 my-3 font-semibold">Recent Completed Work</h1>
                </div>
                <div className="max-h-[40vh] border p-3 border-neutral2 rounded-md overflow-y-scroll">
                    {arr}
                </div>
                <div className="flex flex-row justify-center mt-12">
                    <ThemeProvider theme={theme}>
                        <Pagination count={numPages} shape="rounded" color="primary" 
                            onChange={(e, value) => setIndexes(value)}
                        />
                    </ThemeProvider>
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
        <div className="md:pr-8">
            <div className="rounded-md flex border border-neutral2 bg-neutral2 bg-opacity-5 justify-center">
                <h1 className="text-neutral3 text-xl m-10">No recent work completed data found!</h1>
            </div>
        </div>
        
      ) : (
        <div className="md:pr-8">
          <CompletedCardList woCompletedList={woCompletedList} />
        </div>
      )}
    </>
  );
}