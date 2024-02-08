"use client"
import React from 'react';
import { toast} from 'react-toastify';
import CustomToastContainer from '../components/customtoastcontainer';

const YourComponent = () => {
  const alert = () => {
    toast.success('msg to screen');
  }

  return (
    <div>
      <button onClick={alert}>
        Show Message
      </button>
      <CustomToastContainer />
    </div>
  );
};

export default YourComponent;
