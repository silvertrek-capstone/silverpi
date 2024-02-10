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
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>Yes</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
  return [ConfirmationDialog, confirm];
};


/*
    Popup Component: 
        A reusable text field component for input with additional features.

    props: 
        alert: Set this to either true or false. True if it's an alert, false if it's a Confirmation. Alerts will have only one button saying ok, confirmations will have 2 buttons, a confirm or cancel button and will have side effects. 
        title: The title of the card
        content: The actual content of the card
*/

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