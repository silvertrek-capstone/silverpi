"use client"
import React, { useState, useEffect } from 'react';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomToastContainer from '@/components/customtoastcontainer';
import { z } from 'zod';

export default function SignUpForm({invite}) {

  // Do some simple stuff for getting request data
  const inviteId = invite

  // zod object for validation purposes
  const SignUpZod = z.object({
    email: z.string().email(), 
    first: z.string().min(1, {message: "First name: cannot be empty"}), 
    last: z.string().min(1, {message: "Last name cannot be empty"}), 

    password: z.string().min(2, {message: "Password must be at least 10 characters"}).refine(password => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format regex
      return !emailRegex.test(password);
    },{
      message: "Password cannot be in email format",
      path: ['password']
    }),

    repassword: z.string()
  }).refine(data => data.password === data.repassword, {message: "Passwords don't match", path: ['repassword']});

  // seems to be best to not call directly 
  const handleSubmit = (e) => {
    e.preventDefault();// doesnt refresh form 
    onSubmit(e); 
  };

  // validates + sends to server 
  const onSubmit = async (e) => {
    const formData = {
      email: e.target['email'].value,
      password: e.target['password'].value,
      repassword: e.target['re-password'].value,
      first: e.target['first-name'].value,
      last: e.target['last-name'].value,
    };

    // validate form with zod
    try {
      SignUpZod.parse(formData);// validating with zod    

    }
    catch (error) {
      error.errors.forEach(err => {
          toast.error(err.message);
      });
      return; 
    }

    // then send to server
    try{
        const formData_e = new FormData(e.target); 
        const response = await fetch('/auth/sign-up', {
          method: 'POST',
          body: formData_e
        });

        if (!response.ok) {         
          console.log("fine");                              
          // router.push('/home');                               
        } 
        else {
          const error = await response.json();                 
          toast.error(error.error);                            
        }
    } 
    catch (error) {                                           
      toast.error('Sign Up Failed');    
    }
  };

  // autofill causes an issue as well it seems impossibel to capture capslock state on load will investigate
  useEffect(() => {
    const handleCapsLockDetection = () => {
      document.addEventListener('keyup', function(event) {
        const capsLockOn = event.getModifierState && event.getModifierState('CapsLock');
        const capslockWarningElement = document.getElementById("capslock-msg");
        if (capsLockOn) {
          capslockWarningElement.style.display = 'block';
        } 
        else {
          capslockWarningElement.style.display = 'none';
        }
      });
    };

    // call on after load 
    handleCapsLockDetection();
  }, []);// [] is to make func execute after dom loads

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-12 w-auto"
            src="/login2.png"
            alt="Silver Trek Progress Inquries"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                  focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Invite ID
              </label>
              <div className="mt-1">
                <input
                  id="invite-id"
                  name="invite-id"
                  type="text"
                  readOnly={Boolean(inviteId)}
                  defaultValue={inviteId}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                  focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-0">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-txt">
                  Password
                </label>

              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-txt shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-txt">
                  Retype Password
                </label>

              </div>
              <div className="mt-1">
                <input
                  id="re-password"
                  name="re-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-neutral1 shadow-sm ring-1 ring-inset ring-gray-300 
                  focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
                <small id= "capslock-msg" className='hidden'> CapsLock is on</small>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm 
                  font-semibold leading-6 text-white shadow-sm focus-visible:outline 
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  Create Account
                </button>
              </div>
            </form>
  
          </div>
        </div>
        <CustomToastContainer/>
      </>
  )
}
