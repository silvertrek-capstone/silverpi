"use client"

import React, { useState } from 'react';
import Popup from '@/components/popup';
import useConfirm from '@/components/popup'

function ParentComponent() {
    const [Dialog, confirmDelete] = useConfirm(
        'Are you sure?',
        'Are you sure you want to delete user "Isaac Kwok"?',
      )
      const handleDelete = async () => {
        const ans = await confirmDelete()
        if (ans) {/* ... */}
        else {/* ... */}
      }

      return (
        <>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>Delete</button>
          <Dialog />
        </>
      )
}

export default ParentComponent;