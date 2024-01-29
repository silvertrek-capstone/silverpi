"use client"
import Tabs from '@/components/tabs'
import Table from '@/components/table'
import { useState } from 'react';

export default function Invoices() {
    const invoices = InvoicesData();
    const headers = [
        { text: 'Invoice Number', value: 'inv_num' },
        { text: 'Date Created', value: 'date_created' },
        { text: 'Description', value: 'description' },
        { text: 'Due Date', value: 'due_date' },
        { text: 'Total Due', value: 'total_due' },
        { text: 'Status', value: 'State' },
    ]
    const tabs = [
        { text: 'Open', value: '0', count: 50 },
        { text: 'Closed', value: '1', count: 200 }
    ]
    const [tab, setTab] = useState('0');
    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Invoices</h1>
            <div className="my-5">
                <Tabs
                    value={tab}
                    items={tabs}
                    onChange={(e) => setTab(e)}
                >

                </Tabs>
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
            inv_num: 43,
            description: 'Plywood',
            date_created: '11-30-2000',
            status: 'Paid',
            total_due: '8000.00'
        }
    ]
}