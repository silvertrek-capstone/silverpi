"use client"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import TextField from '@/components/textfield';
import Select from '@/components/select';
import Table from '@/components/table';
import Autocomplete from '@/components/autocomplete';
import { useState } from 'react';

const headers = [
    { text: 'Customer #', value: 'customer' },
    { text: 'Name', value: 'name' },
];

// Note, roleId passed may differ from the role_id in the profile info, if you are viewing someone elses profile
// Only possible if you are an admin.
export default function ClientUserPage({ profile, roleId, roles, customers, allCustomers, getCustomers, setProfile, }) {
    // Create all the values that the changable fields have.
    const { first_name, last_name, email, role_id } = profile;
    const [first, setFirst] = useState(first_name);
    const [last, setLast] = useState(last_name)
    const [role, setRole] = useState(role_id);
    const [customerRows, setCustomerRows] = useState(customers || []);

    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Your Profile</h1>
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <TextField
                                        value={first}
                                        label='Required'
                                        onChange={(e) => setFirst(e)}
                                        debounceTime={200}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <TextField
                                        value={last}
                                        label='Required'
                                        onChange={(e) => setLast(e)}
                                        debounceTime={200}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <TextField
                                        value={email}
                                        disabled={true}
                                        label='Required'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* If logged in user is an admin, show the following. */}
                {roleId === 1 &&
                    <div className="border-b border-gray-900/10 pb-12 pt-6">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Admin Only</h2>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Role
                                </label>
                                <div className="mt-2">
                                    <Select
                                        value={role}
                                        items={roles}
                                        onChange={(e) => setRole(e)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="table" className="block text-sm font-medium leading-6 text-gray-900">
                                    Add Customer
                                </label>
                                <div className='mt-2'>
                                    <Autocomplete
                                        items={allCustomers}

                                    />
                                </div>
                            </div>
                        </div>

                        <div className='mt-4 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg'>
                            <Table
                                id="table"
                                headers={headers}
                                items={customerRows}
                            />
                        </div>

                    </div>
                }


                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}

