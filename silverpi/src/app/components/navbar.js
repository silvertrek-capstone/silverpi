"use client"
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [currentPage, setCurrentPage] = useState();
  var pathName = usePathname();

  useEffect(() => {
    let pathArray =  pathName.split("/");
    setCurrentPage(pathArray[pathArray.length - 1]);
  }, [pathName]);

  return (
    <Disclosure as="nav" className="bg-white shadow sm:sticky sm:top-0 sm:z-10">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/login.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-blue-400 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link
                    href="/home"
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${currentPage == "home" ? "border-blue-400 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/home/agreements"
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${currentPage == "agreements" ? "border-blue-400 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                  >
                    Agreements
                  </Link>
                  <Link
                    href="/home/workorders"
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${currentPage == "workorders" ? "border-blue-400 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                  >
                    Workorders
                  </Link>
                  <Link
                    href="/home/invoices"
                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${currentPage == "invoices" ? "border-blue-400 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                  >
                    Invoices
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="relative flex rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-400">
                          <span className="flex px-3 py-2 text-xl text-gray-500 hover:text-gray-700">
                            Hello, Company
                            <ChevronUpIcon className={`mt-1 ml-1 h-6 w-6 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                          </span>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/home/admin"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Admin
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (

                              <Link
                                href="/auth/logout"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
              <div className="flex items-center text-xl text-gray-600 sm:hidden">
                Hello, Company
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-blue-400 text-blue-400", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as={Link}
                href="/home"
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${currentPage == "home" ? "border-blue-400 bg-indigo-50 text-blue-400" : "text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/home/agreements"
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${currentPage == "agreements" ? "border-blue-400 bg-indigo-50 text-blue-400" : "text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Agreements
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/home/workorders"
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${currentPage == "workorders" ? "border-blue-400 bg-indigo-50 text-blue-400" : "text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Workorders
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                href="/home/invoices"
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${currentPage == "invoices" ? "border-blue-400 bg-indigo-50 text-blue-400" : "text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
              >
                Invoices
              </Disclosure.Button>
            </div>
            <div className="border-t border-blue-400 pb-3 pt-2">
              <div className="space-y-1">
                <Disclosure.Button
                  as={Link}
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  href="/home/admin"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Admin
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  href="/auth/logout"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
