"use client"

import { useState } from 'react'

import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';

const useAlert = (title, content) => {
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
  
    const AlertDialog = () => (
      <Dialog 
        open={promise !== null} 
        fullWidth={true}
        maxWidth="xs">
        
        <DialogTitle className="bg-secondary text-white">
                {title}
        </DialogTitle>
        <DialogContent className="bg-secondary text-white">
            <DialogContentText className="text-white">{content}</DialogContentText>
        </DialogContent>
        <DialogActions className="bg-secondary flex ">
            <button className="text-white border-2 border-white rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-400 ease-in-out px-5 py-2" onClick={handleConfirm}>
                Ok
            </button>
        </DialogActions>
      </Dialog>
    );
    return [AlertDialog, confirm];
}

export default useAlert;