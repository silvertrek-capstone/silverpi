"use client"
import Tabs from '@/components/tabs';
import Table from '@/components/table';
import TextField from '@/components/textfield';
import { useEffect, useState } from 'react';

// INFORMATION NEEDED FOR COMPONENTS
const headers = [
    { text: 'Invoice Number', value: 'invoice' },
    { text: 'Date Created', value: 'invoiceDate' },
    { text: 'Description', value: 'description' },
    { text: 'Due Date', value: 'dueDate' },
    { text: 'Total Due', value: 'totalAmountString' },
    { text: 'Status', value: 'statusStr' },
];
const tabs = [
    { text: 'All Invoices', value: null, count: null },
    { text: 'Unpaid', value: 0, count: null },
    { text: 'Overdue', value: 1, count: null },
    { text: 'Paid', value: 2, count: null }
];


export default function ClientInvoices({invoices, getInvoices}) {
    // Defaults to "all" invoices, can just set invs to all invoices.
    const [invs, setInvs] = useState(invoices); // SetInvs to be used only when getting new data.
    const [tab, setTab] = useState(null);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState(invoices); // Rows after search & status filter. Used by the table
    const [cntTabs, setCntTabs] = useState(tabs);

    // Use effect for calculating the tab counts when the invoices change
    useEffect(() => {
        const newTabs = addCountsToTabs(invs, tabs);
        setCntTabs(newTabs);
    }, [invs]);
    
    // Whenever invs, tab, or search is changed, search it and status filter it to get the table rows
    useEffect(() => {
        const tabbed = applyStatusFilter(invs, tab);
        const searched = applySearch(tabbed, search);
        // Now the data should be good to show to the user
        setRows(searched);
    }, [invs, search, tab])

    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Invoices</h1>
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
                mainkey="invoice"
                link="/home/invoices/"
            >
            </Table>
        </>
    );
}

// Adds the counts to the tabs
function addCountsToTabs(data, items) {
    const tabs = structuredClone(items);
    // Loop over each tab, calculate the number of items where the invstatus is equal to the value
    // If value is null, its the "all" tab, so all items match it
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        const dataForTab = data.filter((e) => {
            return tab.value === null || tab.value === e.status;
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
        return e.status === status; // Only return items that have a work order status that matches the status.
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