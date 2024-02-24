// Added Use client parameter to make use of useState and useEffect 
"use client"              

import Link from 'next/link';
import { EnvelopeIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';

export default function Login() {

  // Define useState hooks for updating component
  const [email, setEmail] = useState('');                     // Tracking input fields
  const [password, setPassword] = useState('');
  const [capsLockStatus, setCapsStatus] = useState(false);    // caps Lock indicator

  // Handler for key press events
  const keyPressHandle = (event) => {
    if (typeof event.getModifierState === 'function') {       // check for existence of getModifier
      const capsState = event.getModifierState('CapsLock');   // If caps lock is on, set status
      setCapsStatus(capsState);                               // Status set, message displayed later
    }
  };

  useEffect(() => {                                                    // useEffect hook for key press

    window.addEventListener('keyup', keyPressHandle);                  // Event listener added for keypress function


    return () => window;  // return window
  }, []);

    // Handles login credential submissions
    const submissionHandle = async (event) => {
      event.preventDefault();                                   // need to define custom behavior, prevent page refresh
      
      const formObj = new FormData(event.target);              // define formdata object for email-password pairing
      
      const email = formObj.get('email');                      // Acquire email and password fields
      const password = formObj.get('password');

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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="/auth/login" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                Email address
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon className="h-5 w-5 text-secondary" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* Commenting out below, no forgot password functionality */}
                {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm 
                font-semibold leading-6 text-neutral1 shadow-sm"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold leading-6 text-secondary hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}