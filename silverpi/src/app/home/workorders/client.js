"use client"
import Tabs from '@/components/tabs';
import Table from '@/components/table';
import TextField from '@/components/textfield';
import { useEffect, useState } from 'react';

export default function ClientWorkOrders({workorders, getWorkOrders}) {
    const headers = [
        { text: 'WO Number', value: 'wo_num' },
        { text: 'Date Created', value: 'date_created' },
        { text: 'Description', value: 'description' },
        { text: 'Status', value: 'status' },
    ];
    const tabs = [
        { text: 'All Work Orders', value: null, count: 3 },
        { text: 'Open', value: 0, count: 3 },
        { text: 'Closed', value: 1, count: 0 }
    ];

    const [wos, setWos] = useState(workorders);
    const [tab, setTab] = useState(0);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState(workorders); // Rows after search. Used by the table

    useEffect(() => {
        const rows = applySearch(wos, search);
        setRows(rows);
    }, [search, wos]);

    useEffect(() => {
        async function getData() {
            const status = tab;
            const {data, error}  = await getWorkOrders(status);
            setWos(data);
        }
        getData();
    }, [tab]);
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
                items={rows}
                mainkey="wo_num"
                link="/home/workorders/"
            >
            </Table>
        </>
    );
}

function applySearch(data, search) {
    if (!search) { // If no search, just return the data.
        return data;
    }
    const loweredSearch = search.toLowerCase();
    const arr = [];
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        const vals = Object.values(obj);
        const searchable = vals.join('').toLowerCase();
        // See if string contains the search team
        if (searchable.includes(loweredSearch)) {
            arr.push(obj);
        }
    }
    return arr;
}
