"use client"

import { useState } from 'react'
import { useEffect } from 'react'

import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';

const useConfirm = (title, content) => {
  const [promise, setPromise] = useState(null);

  const confirm = () => new Promise((resolve, reject) => {
    setPromise({ resolve });
  });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog 
      open={promise !== null} 
      fullWidth={true}
      maxWidth="xs">
    
      <DialogTitle className="bg-secondary text-white">{title}</DialogTitle>
      <DialogContent className="bg-secondary text-white">
        <DialogContentText className="text-white">{content}</DialogContentText>
      </DialogContent>
      <DialogActions className="bg-secondary">
        <button className="text-white rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-400 ease-in-out px-5 py-2" onClick={handleConfirm}>
          Yes
        </button>
        <button className="text-white border-2 border-white rounded-md hover:bg-white hover:bg-opacity-20 mr-2 transition-colors duration-400 ease-in-out px-5 py-2" onClick={handleCancel}>
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
  return [ConfirmationDialog, confirm];
};

// export default function Popup({alert, title, content, trueFunction, falseFunction, isVisible}) {
//   const [Dialog, confirmDelete] = useConfirm(
//     title,
//     content,
//   )

//   useEffect(() => {
//     const runDelete = async () => {
//       if(isVisible) {
//         const ans = await confirmDelete();
//         if (ans) {
//           trueFunction();
//         } else {
//           falseFunction();
//         }
//       }
//     };

//     runDelete();
//   }, [confirmDelete, trueFunction, falseFunction]);

//   return (
//     <>
//       {isVisible && <Dialog/>}
//     </>
//   );

//   const createConfirm = async () => {
//     const ans = await confirmDelete()
//     if (ans) {
//       trueFunction
//     } else {
//       falseFunction
//     }
//   }

  
//   return (
//     <>
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={createConfirm}>Delete</button>
//       <Dialog />
//     </>
//   )
// }

export default useConfirm;