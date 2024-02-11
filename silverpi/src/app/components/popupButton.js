"use client"

import React, { useState } from 'react';
import Popup from '@/components/popup';
import useConfirm from '@/components/popup'

/* 
    This is an example button that will generate the confirmation page. I was thinking that maybe we can have a number of
    functions, one for each task we would like to complete. We would pass the number of the function that we would like to trigger
    as a prop, though I'm sure there might be a better way. We could possibly have an array of function pointers and just pass the index
    of the function we would like to trigger. 
*/

function ParentComponent({alert, title, content, buttonText}) {
    const [Dialog, confirmDelete] = useConfirm(
        alert,
        title,
        content,
      )

      const handleDelete = async () => {
        const ans = await confirmDelete()

        if(alert){
            return
        }

        if (ans) {
            // We can probably call a function here
            console.log("confirmed");
        }
        else {
            // Can call another function here, but most likely will just exit
            console.log("Cancelled");
        }

      }

      return (
        <>
          <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>{buttonText}</button>
          <Dialog />
        </>
      )
}

export default ParentComponent;