"use client"
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import dayjs from 'dayjs' // Date calculator

// Basic table component, accepts the following props
/*
    headers - array of objects, containing the headers.
        - Object should contain the following:
            {text: Header name, value: key name in items, sortable: whether the column is sortable (default true), searchable: whether it can be searched (default true)}
            - If a header contains the keys "edit" or "delete", an edit and/or delete icon will be added to the end of the column
    items - array of objects, object keys should match the value in headers
    mainkey - name of key in the items object that is a unique identifier for the row (used for delete/edit)
    title - Table title, put at the top, default null
    link - string that we will append mainKey to to link
    
    IMPORTANT - EVENT HANDLERS CAN ONLY BE USED IN CLIENT COMPONENTS.
    onRowClick - function, if defined, clicking a row will call the function with the row.
    onEdit - if an edit button exists, clicking it will call this with the row.
    onDelete - if a delete button exists, clicking it will call this with the row.
*/

//  - hovering over row changes val to loading cursor

// dloading var - if loading is true, horizontal loading bar displayed
export default function Table({ headers, items, mainkey, link, title, loading, onRowClick, onEdit, onDelete }) {
    const [sortBy, setSortBy] = useState('');
    const [sortDesc, setSortDesc] = useState(true);
    const [tableItems, setTableItems] = useState(items || [])
    // loading status indicators depend on passed in parent value
    const [isLoading, setIsLoading] = useState(loading);


    // Handles sort
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

    // Update table items on change
    useEffect(() => {
        if (items !== tableItems) {
            setTableItems(items)
        }
    }, [items]);

    useEffect(() => {
        if (isLoading !== loading) {
            setIsLoading(loading);
        }
    }, [loading]);

    // Watches sortBy, sortDesc, and items. When changed, applies the sort.
    useEffect(() => {
        if (sortBy) {
            const sortedItems = sortByKey(tableItems, sortBy, sortDesc);
            setTableItems(sortedItems);
        } else {
            setTableItems(items);
        }
    }, [sortBy, sortDesc, items]);

    // Animation time low and ease-in added for dynamic loading effect
    const loadingAnimation = `slideRight 1.5s ease-in-out infinite`;

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="overflow-hidden divide-y divide-neutral2">
                    {title && (
                        <div className='text-txt min-w-full bg-gray-50 py-2 px-2'>
                            <h1>{title}</h1>
                        </div>
                    )}
                    {isLoading ? (
                        <div className="w-full h-2 bg-gray-200 relative overflow-hidden">
                            <div
                                className="absolute h-full bg-blue-500 left-0 top-0 w-full"
                                style={{ animation: loadingAnimation }}
                            ></div>
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
                                            <a href='#' onClick={() => { handleSort(header.value) }} className="group inline-flex">

                                                {header.text}
                                                {
                                                    (() => {
                                                        if (sortBy === header.value && sortDesc) {
                                                            return (
                                                                <span title="Sort Asc" className="ml-2 flex-none rounded bg-neutral2 group-hover:bg-gray-200">
                                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            )
                                                        } else if (sortBy === header.value) {
                                                            return (
                                                                <span title="Clear Sort" className="ml-2 flex-none rounded bg-neutral2 group-hover:bg-gray-200">
                                                                    <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            )
                                                        } else {
                                                            return (
                                                                <span title="Sort Desc" className="invisible ml-2 flex-none rounded group-hover:visible group-focus:visible">
                                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            )
                                                        }
                                                    })()
                                                }
                                            </a>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {tableItems.map((item, i) => (
                                    <tr
                                        key={`row-${i}`}
                                        className={onRowClick ? 'even:bg-gray-50 hover:bg-gray-100 cursor-pointer' : 'even:bg-gray-50'}
                                        onClick={() => onRowClick ? onRowClick(item) : {}}
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
                                                {header.edit && (
                                                    <button 
                                                        onClick={() => onEdit(item)} // Define your handleEdit function to perform the edit action
                                                        className="inline-flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                                                        aria-label="Edit"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                )}
                                                {header.delete && (
                                                    <button 
                                                    onClick={() => onDelete(item)} 
                                                    className="inline-flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                                                    aria-label="Edit"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
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
