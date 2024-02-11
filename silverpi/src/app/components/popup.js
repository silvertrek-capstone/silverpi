"use client"

import { useState } from 'react'
import { useEffect } from 'react'

import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const useConfirm = (alert, title, content) => {
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
      fullWidth={alert ? (false):(true)}>
      
      {alert ? (
        <>
          <DialogTitle className="bg-secondary text-white text-center">
            <WarningIcon className="pb-1 pr-2 text-accent1"></WarningIcon>
            Alert
            <WarningIcon className="pb-1 pl-2 text-accent1"></WarningIcon>
          </DialogTitle>
          <DialogContent className="bg-secondary text-white text-center">
            <DialogContentText className="text-white">{content}</DialogContentText>
          </DialogContent>
          <DialogActions className="bg-secondary flex justify-center">
            <button className="text-white border-2 border-white rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-400 ease-in-out px-5 py-2" onClick={handleConfirm}>
              Ok
            </button>
          </DialogActions>
        </>
      ) : (
        <>
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
            {/* <Button className="text-white border-white hover:bg-white hover:bg-opacity-20" onClick={handleConfirm}>Yes</Button>
            <Button variant="outlined" className="text-white border-1 border-white hover:bg-white hover:bg-opacity-20" onClick={handleCancel}>Cancel</Button> */}
          </DialogActions>
        </>
        
      )}
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