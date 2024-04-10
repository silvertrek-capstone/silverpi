"use client"
import TextField from '@/components/textfield';
import Select from '@/components/select';
import Table from '@/components/table';
import Autocomplete from '@/components/autocomplete';
import { toast } from 'react-toastify';
import CustomToastContainer from 'src/app/components/customtoastcontainer.js';
import { useState } from 'react';

const headers = [
    { text: 'Customer #', value: 'cust_num' },
    { text: 'Remove', value: 'delete', delete: true },
];

// Note, roleId passed may differ from the role_id in the profile info, if you are viewing someone elses profile
// Only possible if you are an admin.
export default function ClientUserPage({ allCustomers, invite, handleSetInvite, handleAddCustomer, handleRemoveCustomer }) {
    // Create all the values that the changable fields have.
    const [email, setEmail] = useState(invite.email);
    const [customerRows, setCustomerRows] = useState(invite.customers || []);
    const [cust, setCust] = useState(null);


    // Called when role changed or save button clicked
    async function handleUpdateInvite() {
        const { data, error } = await handleSetInvite(email);
        if (error) {
            toast.error('Failed to update invite')
        } else {
            toast.success('Successfully updated invite')
        }
    }

    async function addCustomer(customer) {
        if (!customer) {
            return;
        }
        const { data, error } = await handleAddCustomer(customer.value);
        if (error) {
            toast.error('Failed to add customer')
        } else {
            toast.success('Successfully added customer')
            const newRows = [...customerRows, {customer, cust_num: customer.customer}];
            setCustomerRows(newRows);
        }
        setCust(null);
    }

    async function deleteCustomer(row) {
        const { data, error } = await handleRemoveCustomer(row.cust_num);
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


    // Opens a mailto with the invite information.
    function handleSendEmail() {
        let str = "mailto:"
        str += email;
        str += "?subject=Invitation To SilverPI"
        str += "&body=Click the below link to create an account with SilverPI"
        str += "%0d%0ahttp://localhost:3000/signup?invite="
        str += invite.id
        str += "%0d%0aThank you!"
        window.top.location = str;
    }


    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Your Profile</h1>
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <TextField
                                        value={email}
                                        label='Required'
                                        onChange={(e) => setEmail(e)}
                                        debounceTime={200}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        onClick={() => handleSendEmail()}
                        className="rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md"
                    >
                        Send Email
                    </button>
                    <button
                        type="button"
                        onClick={() => handleUpdateInvite()}
                        className="rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md"
                    >
                        Save
                    </button>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

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

            </form>
            <CustomToastContainer />
        </>
    );
}

