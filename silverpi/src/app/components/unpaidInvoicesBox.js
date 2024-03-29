"use client"
import React from "react"
import Link from 'next/link'
import UnpaidInvCard from './unpaidInvoicesCard'
import { useState } from 'react';
import { set } from "zod"

function InvCardList(invList) {
    const startIndex = 2
    const endIndex = 4
    invList = invList || []
    // have to take out the actual list since we are being returned an object with a invList value that points to the list
    // {
    //     invList: [x, x, x]
    // }

    let slicedList = invList.invList.slice(startIndex, endIndex)
    
    // Grabbing correlated WOs

    let arr = []
    {slicedList.map((inv, index) =>(
            arr.push(
                <UnpaidInvCard
                    // status={wo.status}
                    invoice = {inv}
                    key={index}
                />
            )
        )
    )}

    return(
        <> 
            <div className="border rounded-lg bg-neutral2 bg-opacity-5 border-neutral2 px-5 py-2">
                <div className="flex flex-row items-end">
                    <h1 className="pb-2 text-xl my-3 font-semibold">Unpaid Invoices</h1>
                </div>
                <div>
                    {arr}
                </div>
                <div className="flex flex-row justify-end ml-auto">
                    <Link href="/home/invoices" className="font-bold leading-6 text-primary hover:underline">
                            See more
                    </Link>
                </div>
            </div>
        </>
    )
}

export default function ActiveWOBox(invList) {
  invList = invList || []
  // have to take out the actual list since we are being returned an object with a invList value that points to the list
  invList = invList.invList

  return (
    <>
      {invList.length === 0 ? (
        <div className="mb-4">
            <div className="rounded-md flex justify-center border border-neutral2 bg-neutral2 bg-opacity-5 justify-center">
                <h1 className="relative text-neutral3 text-xl py-10">No Unpaid Invoices Currently!</h1>
            </div>

        </div>
      ) : (
        <div className="mb-4">
          <InvCardList invList={invList} />
        </div>
      )}
    </>
  );
}