// Added Use client parameter to make use of useState and useEffect 
"use client"              

import Link from 'next/link';
import { EnvelopeIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Imported toast for notifications and container file
import { toast } from 'react-toastify';
import CustomToastContainer from 'src/app/components/customtoastcontainer.js'; 

export default function Login() {

  // Define useState hooks for updating component
  const [email, setEmail] = useState('');                     // Tracking input fields
  const [password, setPassword] = useState('');
  const [capsLockStatus, setCapsStatus] = useState(false);    // caps Lock indicator
  const router = useRouter();                                 // next router

  // Handler for key press events
  const keyPressHandle = (event) => {
    if (typeof event.getModifierState === 'function') {       // check for existence of getModifier
      const capsState = event.getModifierState('CapsLock');   // If caps lock is on, set status
      setCapsStatus(capsState);                               // Status set, message displayed later
    }
  };


  useEffect(() => {                                           // useEffect hook for key press

    window.addEventListener('keyup', keyPressHandle);         // Event listener added for keypress function


    return () => window.removeEventListener('keyup', keyPressHandle);  // cleanup after mounting
  }, []);

  // Handles login credential submissions
  const submissionHandle = async (event) => {
    event.preventDefault();                                   // need to define custom behavior, prevent page refresh
    
    const formObj = new FormData(event.target);               // define formdata object for email-password pairing
    
    const email = formObj.get('email');                      // Acquire email and password fields
    const password = formObj.get('password');

    // Send POST request to endpoint using credentials
    try { 
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: formObj,
      });

      if (response.ok) {                                      // response is good
          router.push('/home');                               // redirect to homepage on success
      } 
      else {
        const error = await response.json();                  // Send error response and display toast message
        toast.error(error.error);                             // toast error
      }
    } 
    catch (error) {                                           // Catch
      toast.error('Incorrect login credentials entered');     // Send custom message
    }
  };

  return (
    <>
      <CustomToastContainer /> 
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/login2.png"
            alt="Company Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={submissionHandle}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // update email state variable
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={keyPressHandle}
                  />
                  {capsLockStatus && (                            // Caps Lock indicator here
                    <p className="mt-2 text-sm text-red-600" id="caps-lock-message">
                      Caps Lock is on.
                    </p>
                  )}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
                  }  
