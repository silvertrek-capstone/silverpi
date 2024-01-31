"use client"
import Tabs from '@/components/tabs'
import Table from '@/components/table'
import TextField from '@/components/textfield'
import { useState } from 'react';

export default function Invoices() {
    const invoices = InvoicesData();
    const headers = [
        { text: 'Invoice Number', value: 'inv_num' },
        { text: 'Date Created', value: 'date_created' },
        { text: 'Description', value: 'description' },
        { text: 'Due Date', value: 'due_date' },
        { text: 'Total Due', value: 'total_due' },
        { text: 'Status', value: 'status' },
    ]
    const tabs = [
        { text: 'All Invoices', value: '0', count: 3 },
        { text: 'Unpaid', value: '1', count: 0 },
        { text: 'Overdue', value: '2', count: 0 },
        { text: 'Paid', value: '3', count: 3 },
    ]
    const [tab, setTab] = useState('0');
    const [search, setSearch] = useState('search')
    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Invoices</h1>
            <div className="my-5 border px-4 py-4 rounded-md">
                <Tabs
                    value={tab}
                    items={tabs}
                    onChange={(e) => setTab(e)}
                >

                </Tabs>
            </div>
            <div className="my-4 w-1/5">
                <TextField
                    value={search}
                    label="Search"
                    clearable={true}
                    onChange={(e) => setSearch(e)}
                    debounceTime={500}
                >
                </TextField>
            </div>
            <Table
                headers={headers}
                items={invoices}
                mainkey="inv_num"
                link="/home/invoices/"
            >

            </Table>
        </>
    );
}


function InvoicesData() {
    return [
        {
            inv_num: 12,
            description: 'Cement',
            date_created: '12-13-2003',
            status: 'Paid',
            total_due: '8000.00'
        },
        {
            inv_num: 32,
            description: 'Bricks',
            date_created: '12-1-2022',
            status: 'Paid',
            total_due: '8000.00'
        },
        {
            inv_num: 32,
            description: 'Bricks',
            date_created: '12-1-2022',
            status: 'Paid',
            total_due: '8000.00'
        },
        {
            inv_num: 32,
            description: 'Bricks',
            date_created: '12-1-2022',
            status: 'Paid',
            total_due: '8000.00'
        },
        {
            inv_num: 32,
            description: 'Bricks',
            date_created: '12-1-2022',
            status: 'Paid',
            total_due: '8000.00'
        },
        {
            inv_num: 32,
            description: 'Bricks',
            date_created: '12-1-2022',
            status: 'Paid',
            total_due: '8000.00'
        },
        {
            inv_num: 32,
            description: 'Bricks',
            date_created: '12-1-2022',
            status: 'Paid',
            total_due: '8000.00'
        },
        {
            inv_num: 32,
            description: 'Bricks',
            date_created: '12-1-2022',
            status: 'Paid',
            total_due: '8000.00'
        },
        {
            inv_num: 43,
            description: 'Plywood',
            date_created: '11-30-2000',
            status: 'Paid',
            total_due: '8000.00'
        }
    ]
}