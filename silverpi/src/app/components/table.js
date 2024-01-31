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

export default function Table({ headers, items, mainkey, link, title }) {
    const [sortBy, setSortBy] = useState('');
    const [sortDesc, setSortDesc] = useState(true);

    const [tableItems, setTableItems] = useState(items)

    const handleSort = (colName) => {
        if (sortBy === colName && sortDesc) {
            setSortDesc(false)
        } else if (sortBy === colName) {
            setSortBy('')
            setSortDesc(true)
        } else {
            setSortBy(colName)
            setSortDesc(true)
        }
    }

    useEffect(() => {
        if (!sortBy && sortDesc) { // default state
            setTableItems(items) // Original Sort
        } else {
            const newSort = sortByKey(tableItems, sortBy, sortDesc)
            // Set new table items
            setTableItems(newSort)
        }
    }, [sortBy, sortDesc])


    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="overflow-hidden divide-y divide-neutral2">
                    {
                        title &&
                        <div className='text-txt min-w-full bg-gray-50 py-2 px-2'>
                            <h1>{title}</h1>
                        </div>
                    }
                    <table className="min-w-full divide-y divide-neutral2 table-auto w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {headers.map((header, i) => (
                                    <th
                                        key={`header-${i}-${header.value}`}
                                        scope="col"
                                        className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-txt "
                                    >
                                        <a href='#' onClick={() => { handleSort(header.value) }} className="group inline-flex">
                                            {header.text}
                                            {
                                                (() => {
                                                    if (sortBy === header.value && sortDesc) {
                                                        return (
                                                            <span className="ml-2 flex-none rounded bg-neutral2 group-hover:bg-gray-200">
                                                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        )
                                                    } else if (sortBy === header.value) {
                                                        return (
                                                            <span className="ml-2 flex-none rounded bg-neutral2 group-hover:bg-gray-200">
                                                                <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        )
                                                    } else {
                                                        return (
                                                            <span className="invisible ml-2 flex-none rounded group-hover:visible group-focus:visible">
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
                        <tbody className='overflow-y-scroll'>
                            {tableItems.map((item, i) => (
                                <tr
                                    key={`row-${i}`}
                                >
                                    {headers.map((header, j) => (
                                        <td
                                            className="text-txt whitespace-nowrap py-2 pl-4 pr-3 text-sm"
                                            key={`cell-${j}-${item[header.value]}`}

                                        >
                                            {link && header.value === mainkey
                                                ? <Link href={`${link}${item[mainkey]}`} className="font-semibold leading-6 text-primary ">
                                                    {item[header.value]}
                                                </Link>
                                                : item[header.value]
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
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
            return desc ? bdate - adate : adate - bdate
        }



        if (desc) {
            return aval < bval;
        }
        return aval >= bval;
    })
    return sorting
}