"use client"
import Tabs from '@/components/tabs'
import Table from '@/components/table'
import TextField from '@/components/textfield'
import { useState } from 'react';

export default function Workorders() {
    const workorders = WorkOrdersData();
    const headers = [
        { text: 'WO Number', value: 'wo_num' },
        { text: 'Date Created', value: 'date_created' },
        { text: 'Description', value: 'description' },
        { text: 'Status', value: 'status' },
    ]
    const tabs = [
        { text: 'All Work Orders', value: '0', count: 3 },
        { text: 'Open', value: '1', count: 3 },
        { text: 'Closed', value: '2', count: 0 }
    ]
    const [tab, setTab] = useState('0');
    const [search, setSearch] = useState('')
    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Work Orders</h1>
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
                label="Search"
                clearable={true}
                onChange={(e) => setSearch(e)}
                debounceTime={500}
            >
            </TextField>
            </div>
            <Table
                headers={headers}
                items={workorders}
                mainkey="wo_num"
                link="/home/workorders/"
            >

            </Table>
        </>
    );
}



function WorkOrdersData(){
    return [
        {
            wo_num: 12,
            description: 'Cement',
            date_created: '12-13-2003',
            status: 'Open',
        },
        {
            wo_num: 32,
            description: 'Bricks',
            date_created: '12-1-2022',
            status: 'Open',
        },
        {
            wo_num: 43,
            description: 'Plywood',
            date_created: '11-30-2000',
            status: 'Open',
        }
    ]
}