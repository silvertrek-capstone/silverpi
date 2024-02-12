"use client"
import Tabs from '@/components/tabs';
import Table from '@/components/table';
import TextField from '@/components/textfield';
import { useEffect, useState } from 'react';

// INFORMATION NEEDED FOR COMPONENTS
const headers = [
    { text: 'WO Number', value: 'workOrder' },
    { text: 'Date Created', value: 'enteredDateTime' },
    { text: 'Description', value: 'description' },
    { text: 'Status', value: 'status' },
];
const tabs = [
    { text: 'All Work Orders', value: null, count: null },
    { text: 'Open', value: 0, count: null },
    { text: 'Closed', value: 1, count: null }
];


export default function ClientWorkOrders({workorders, getWorkOrders}) {
    // Defaults to "all" workorders, can just set wos to all workorders.
    const [wos, setWos] = useState(workorders); // Setwos to be used only when getting new data.
    const [tab, setTab] = useState(null);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState(workorders); // Rows after search & status filter. Used by the table
    const [cntTabs, setCntTabs] = useState(tabs);

    // Use effect for calculating the tab counts when the workorders change
    useEffect(() => {
        const newTabs = addCountsToTabs(wos, tabs);
        setCntTabs(newTabs);
    }, [wos]);
    
    // Whenever wos, tab, or search is changed, search it and status filter it to get the table rows
    useEffect(() => {
        const tabbed = applyStatusFilter(wos, tab);
        const searched = applySearch(tabbed, search);
        // Now the data should be good to show to the user
        setRows(searched);
    }, [wos, search, tab])

    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Work Orders</h1>
            <div className="my-5 border px-4 py-4 rounded-md">
                <Tabs
                    value={tab}
                    items={cntTabs}
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
                value={search}
            >
            </TextField>
            </div>
            <Table
                headers={headers}
                items={rows}
                mainkey="workOrder"
                link="/home/workorders/"
            >
            </Table>
        </>
    );
}

// Adds the counts to the tabs
function addCountsToTabs(data, items) {
    const tabs = structuredClone(items);
    // Loop over each tab, calculate the number of items where the woStatus is equal to the value
    // If value is null, its the "all" tab, so all items match it
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        const dataForTab = data.filter((e) => {
            return tab.value === null || tab.value === e.wOStatus;
        });
        tabs[i].count = dataForTab.length; // Get number of items
    }
    return tabs;
}

// Ad hoc function for filtering on status.
function applyStatusFilter(data, status) {
    if (status === null) { // If status is null (all), return all data.
        return data;
    }
    // Else, return data filtered by status.
    return data.filter((e) => { // E is the iterated element. (think of it as data[i])
        return e.wOStatus === status; // Only return items that have a work order status that matches the status.
    });
}

// Abstract function, could probably be added to a helper module somewhere.
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