"use client"
import TextField from '@/components/textfield';
import Select from '@/components/select';
import Table from '@/components/table';
import Autocomplete from '@/components/autocomplete';
import { toast } from 'react-toastify';
import CustomToastContainer from 'src/app/components/customtoastcontainer.js';
import { useState } from 'react';

const headers = [
    { text: 'Customer #', value: 'customer' },
    { text: 'Name', value: 'name' },
    { text: 'Remove', value: 'delete', delete: true },
];

// Note, roleId passed may differ from the role_id in the profile info, if you are viewing someone elses profile
// Only possible if you are an admin.
export default function ClientUserPage({ profile, roleId, roles, customers, allCustomers, updateProfile, insertCustomer, removeCustomer }) {
    // Create all the values that the changable fields have.
    const { first_name, last_name, email, role_id } = profile;
    const [first, setFirst] = useState(first_name);
    const [last, setLast] = useState(last_name)
    const [role, setRole] = useState(role_id);
    const [customerRows, setCustomerRows] = useState(customers || []);
    const [cust, setCust] = useState(null);


    // Called when role changed or save button clicked
    async function handleUpdateProfile() {
        const newProfile = {
            first_name: first,
            last_name: last,
            role_id: role,
        };
        const { data, error } = await updateProfile(newProfile);
        if (error) {
            toast.error('Failed to update profile')
        } else {
            toast.success('Successfully updated profile')
        }
    }

    async function addCustomer(customer) {
        console.log(customer || 'oops');
        if (!customer) {
            return;
        }
        const newCustomer = {
            cust_num: customer.value,
            using: false,
        };
        const { data, error } = await insertCustomer(newCustomer);
        if (error) {
            toast.error('Failed to add customer')
        } else {
            toast.success('Successfully added customer')
            const newRows = [...customerRows, customer];
            setCustomerRows(newRows);
        }
        setCust(null);
    }

    async function deleteCustomer(row) {
        const { data, error } = await removeCustomer(row.customer);
        if (error) {
            toast.error('Failed to remove customer')
        } else {
            toast.success('Successfully removed customer')
            // Filter the table to remove the customer
            const filtered = customerRows.filter((e) => {
                return e.customer !== row.customer;
            });
            setCustomerRows(filtered);
        }
    }


    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Your Profile</h1>
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        onClick={() => handleUpdateProfile()}
                        className="rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md"
                    >
                        Save
                    </button>
                </div>
                {/* If logged in user is an admin, show the following. */}
                {roleId === 1 &&
                    <div className="border-b border-gray-900/10 pb-12">
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
                                        value={cust}
                                        items={allCustomers}
                                        onChange={(e) => addCustomer(e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='mt-4 sm:mx-0 sm:rounded-lg'>
                            <Table
                                id="table"
                                headers={headers}
                                items={customerRows}
                                onDelete={(e) => deleteCustomer(e)}
                            />
                        </div>

                    </div>
                }

            </form>
            <CustomToastContainer />
        </>
    );
}

