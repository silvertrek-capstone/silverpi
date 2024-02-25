"use client"
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';

export default function SignUpForm({invite}) {

// current issues
/*
    last is styling 
    check that properly sending to the server
*/
    // Do some simple stuff for getting request data
    const inviteId = invite

    // zod schema validation
    const SignUpSchema = z.object({
        email: z.string().email(),// might mess with later cause s@gm.s wont work but .so does dont know if matters
        password: z.string().min(10),
        confirmPassword: z.string(),
        first: z.string().min(1),
        last: z.string().min(1)
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e); 
    };

    const onSubmit = async (e) => {

        const formData = {
            email: e.target['email'].value,
            password: e.target['password'].value,
            confirmPassword: e.target['re-password'].value,
            first: e.target['first-name'].value,
            last: e.target['last-name'].value,
        };

        try {


            SignUpSchema.parse(formData);// validating with zod

            // check supabase just like before but only after validating
            const formData_e = new FormData(e.target); 
            const formDataObject = {};
            for (let [key, value] of formData_e.entries()) {
                formDataObject[key] = value;
            }
            // const response = await fetch('/auth/sign-up', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(formDataObject)
            // });
            
            // console.log('Form submitted successfully!' +  JSON.stringify(formDataObject, null, 2));
            toast.success('Form submitted successfully!');
        } catch (error) {
            const errorMessages = {};
            error.errors.forEach(err => {
                errorMessages[err.path[0]] = err.message;
            });
            setErrors(errorMessages);
            // console.log('Form errors:\n', JSON.stringify(errorMessages, null, 2));
            toast.error(JSON.stringify(errorMessages, null, 2) ); // fix later to look prettier ig or seperate msg idk

        }
    }; 


    // capslock detection could be made into a component might be helpful due to autofill issues with "keyup"
    useEffect(() => {
        const handleCapsLockDetection = (warningId) => {
            // Attach event listener to the document
            document.addEventListener('keypress', function(event) {
                const capsLockOn = event.getModifierState('CapsLock');
                const warningElement = document.getElementById(warningId);
                if (capsLockOn) {
                   warningElement.style.display = 'block';
                } else {
                   warningElement.style.display = 'none';
                }
            });
        };

        const warningMsgId = "capslock-msg";
        handleCapsLockDetection( warningMsgId);
    }, []);// to make func execute after dom loads


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
        <ToastContainer/>
        <></>
      </>
  )
}
