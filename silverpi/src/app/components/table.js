"use client"
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import dayjs from 'dayjs' // Date calculator

// Basic table component, accepts the following props
/*
    headers - array of objects, containing the headers.
        - Object should contain the following:
            {text: Header name, value: key name in items, sortable: whether the column is sortable (default true), searchable: whether it can be searched (default true)}
    items - array of objects, object keys should match the value in headers
    mainkey - name of key in the items object that is a unique identifier for the row (used for delete/edit)
    title - Table title, put at the top, default null
    link - string that we will append mainKey to to link
*/

// onClick - pass value of mainkey on click
//  - hovering over row changes val to loading cursor

// dloading var - if loading is true, horizontal loading bar displayed
export default function Table({ headers, items, mainkey, link, title, loading }) {
    const [sortBy, setSortBy] = useState('');
    const [sortDesc, setSortDesc] = useState(true);

    const [tableItems, setTableItems] = useState(items);

    // Universal click handler for export to other tables
    const handleRowClick = (item) => {
        if (link) {
            const completeURL = `${link}${item[mainkey]}`;          // build URL
            console.log(`Row click navigation to: ${completeURL}`); // Log intended navigation in place of route handling for now
        }
    };

    const handleSort = (colName) => {
        if (sortBy === colName && sortDesc) {
            setSortDesc(false);
        } else if (sortBy === colName) {
            setSortBy('');
            setSortDesc(true);
        } else {
            setSortBy(colName);
            setSortDesc(true);
        }
    };

    useEffect(() => {
        if (!sortBy && sortDesc) {  // default state
            setTableItems(items); // Original Sort
        } else {
            const newSort = sortByKey(tableItems, sortBy, sortDesc);
            setTableItems(newSort);
        }
    }, [sortBy, sortDesc, items]); // Added items var to dependency list

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="overflow-hidden divide-y divide-neutral2">
                    {title && (
                        <div className='text-txt min-w-full bg-gray-50 py-2 px-2'>
                            <h1>{title}</h1>
                        </div>
                    )}
                    {loading ? (
                        <div className="w-full h-2 bg-gray-200 relative overflow-hidden">
                            <div className="w-full h-full absolute left-0 top-0 animate-pulse bg-blue-500"></div>
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-neutral2 table-auto w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    {headers.map((header, i) => (
                                        <th
                                            key={`header-${i}-${header.value}`}
                                            scope="col"
                                            className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-txt cursor-pointer"
                                            onClick={() => handleSort(header.value)}
                                        >
                                            {header.text}
                                            {sortBy === header.value && (sortDesc ? <ChevronDownIcon className="h-5 w-5 inline" aria-hidden="true" /> : <ChevronUpIcon className="h-5 w-5 inline" aria-hidden="true" />)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {tableItems.length > 0 ? (
                                    tableItems.map((item, i) => (
                                        <tr
                                            key={`row-${i}`}
                                            className="even:bg-gray-50 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleRowClick(item)}
                                        >
                                            {headers.map((header, j) => (
                                                <td
                                                    className="text-txt whitespace-nowrap py-2 pl-4 pr-3 text-sm"
                                                    key={`cell-${j}-${item[header.value]}`}
                                                >
                                                    {link && header.value === mainkey
                                                        ? <Link href={`${link}${item[mainkey]}`}>{item[header.value]}</Link>
                                                        : item[header.value]
                                                    }
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={headers.length} className="text-center py-4">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

// Takes in an array and a key and returns a sorted array
// Supports the following sorts:
/*
    - alphabetical
    - numerical
    - date
*/
function sortByKey(arr, key, desc) {
    const sorting = structuredClone(arr) // Deep clone of array
    // Big sort function
    sorting.sort((a, b) => {
        const aval = a[key]
        const bval = b[key]

        // Check if floats
        const afloat = Number(aval)
        const bfloat = Number(bval)
        if (!isNaN(afloat) && !isNaN(bfloat)) {
            return desc ? bfloat - afloat : afloat - bfloat
        }

        // Check if dates
        const adate = dayjs(aval)
        const bdate = dayjs(bval)
        if (adate.isValid() && bdate.isValid()) {
            return desc ? bdate.unix() - adate.unix() : adate.unix() - bdate.unix()
        }



        if (desc) {
            return aval < bval;
        }
        return aval >= bval;
    })
    return sorting
}
