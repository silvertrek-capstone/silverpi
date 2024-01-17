"use client"
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

// Basic table component, accepts the following props
/*
    headers - array of objects, containing the headers.
        - Object should contain the following:
            {text: Header name, value: key name in items, sortable: whether the column is sortable (default true), searchable: whether it can be searched (default true)}
    items - array of objects, object keys should match the value in headers
    mainkey - name of key in the items object that is a unique identifier for the row (used for delete/edit)
    compact - (boolean) default false.
    title - Table title, put at the top, default null
*/

export default function Table({ headers, items, mainkey, compact }) {
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
        const newSort = sortByKey(tableItems, sortBy, sortDesc)
        // Set new table items
        setTableItems(newSort)
    }, [sortBy, sortDesc])
    

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {headers.map((header, i) => (
                                            <th
                                                key={`header-${i}-${header.value}`}
                                                scope="col"
                                                className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                                            >
                                                <a href='#' onClick={() => {handleSort(header.value)}} className="group inline-flex">
                                                    {header.text}
                                                    {
                                                        (() => {
                                                            if (sortBy === header.value && sortDesc) {
                                                                return (
                                                                    <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                                                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                )
                                                            } else if (sortBy === header.value) {
                                                                return (
                                                                    <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                                                                        <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                )
                                                            } else {
                                                                return (
                                                                <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
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
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {tableItems.map((item, i) => (
                                        <tr
                                            key={`row-${i}`}
                                        >
                                            {headers.map((header, j) => (
                                                <td
                                                    className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500"
                                                    key={`cell-${j}-${item[header.value]}`}

                                                >
                                                    {item[header.value]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// Takes in an array and a key and returns the 
function sortByKey(arr, key, desc) {
    const sorting = structuredClone(arr) // Deep clone of array
    // Big sort function
    sorting.sort((a, b) => {
        const aval = a[key]
        const bval = b[key]
        if (desc) {
            return aval < bval;
        }
        return aval >= bval;
    })
    return sorting
}